import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/lib/Layout";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "nextjs-progressbar";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
      <ProgressBar color="#000c66" height={4} />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </Layout>
  );
}
