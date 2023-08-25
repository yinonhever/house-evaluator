import Router from "next/router";

/**
 * A utility function used to conveniently combine different class names on a single element, and
 * conditionally filter the included class names.
 */
export const cx = (...classNames: (string | false | null | undefined)[]) =>
  classNames.filter(className => !!className).join(" ");

/**
 * A utility function used for convert the percentage format from the database, where it's saved as a number between 0 and 1,
 * into a friendly percentage format (for example: 0.5566 -> 55.66%).
 */
export const formatToPct = (n: number) => {
  return +(n * 100).toFixed(2) + "%";
};

/**
 * This function is used to prevent the scoped CSS from being removed from the DOM before the route animation is completed.
 */
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
