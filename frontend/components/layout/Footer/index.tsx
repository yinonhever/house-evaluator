import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <p>
        &copy; {new Date().getFullYear()} House Evaluator. All rights reserved.
      </p>
    </footer>
  );
}
