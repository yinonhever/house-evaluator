import { PropsWithChildren, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { fixTimeoutTransition } from "./functions";

/**
 * The application's layout that wraps the displayed page.
 */
export default function Layout({ children }: PropsWithChildren) {
  useEffect(() => {
    fixTimeoutTransition(500);
  }, []);

  return (
    <div className="layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
