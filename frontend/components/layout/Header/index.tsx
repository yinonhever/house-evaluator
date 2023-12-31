import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Header.module.scss";
import Link from "next/link";

/**
 * The website's header section, including the logo and navigation.
 */
export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/">House Evaluator</Link>
        </Typography>
        <div className={styles.navigation}>
          <Button color="inherit">
            <Link href="/">New house</Link>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
