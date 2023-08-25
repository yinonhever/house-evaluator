import styles from "./Page.module.scss";
import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

/**
 * The component that's used to wrap every page in the application, providing the general layout and CSS structure
 * for the page. This component is defined as a framer-motion element, so every page would be animated during
 * route transition.
 */
export default function Page({
  title,
  children
}: PropsWithChildren<{ title?: string }>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.wrapper}
    >
      {title && <h1 className={styles.heading}>{title}</h1>}
      <main>{children}</main>
    </motion.div>
  );
}
