import Router from "next/router";
import axios from "./axios";

export const fecther = async <T>(url: string) => {
  const { data } = await axios.get<T>(url);
  return data;
};

export const cx = (...classNames: (string | false | null | undefined)[]) =>
  classNames.filter(className => !!className).join(" ");

export const formatToPct = (n: number) => {
  return +(n * 100).toFixed(2) + "%";
};

export const fixTimeoutTransition = (timeout: number) => {
  Router.events.on("beforeHistoryChange", () => {
    // Create a clone of every <style> and <link> that currently affects the page. It doesn't matter
    // if Next.js is going to remove them or not since we are going to remove the copies ourselves
    // later on when the transition finishes.
    const nodes = document.querySelectorAll(
      "link[rel=stylesheet], style:not([media=x])"
    );
    const copies = [...nodes].map(el => el.cloneNode(true) as HTMLElement);

    for (const copy of copies) {
      // Remove Next.js' data attributes so the copies are not removed from the DOM in the route
      // change process.
      copy.removeAttribute("data-n-p");
      copy.removeAttribute("data-n-href");

      // Add duplicated nodes to the DOM.
      document.head.appendChild(copy);
    }

    const handler = () => {
      // Emulate a `.once` method using `.on` and `.off`
      Router.events.off("routeChangeComplete", handler);

      window.setTimeout(() => {
        for (const copy of copies) {
          // Remove previous page's styles after the transition has finalized.
          document.head.removeChild(copy);
        }
      }, timeout);
    };

    Router.events.on("routeChangeComplete", handler);
  });
};
