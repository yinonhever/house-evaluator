import { HouseData } from "@/lib/types";
import styles from "./ConfirmationModal.module.scss";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function ConfirmationModal({
  open,
  house
}: {
  open: boolean;
  house?: HouseData;
}) {
  return (
    <Dialog open={open} scroll="paper" fullWidth>
      <DialogTitle textAlign="center">Successully created house</DialogTitle>
      <DialogContent dividers>
        <div className={styles.content}>
          <p className={styles.text}>
            <span>New house ID:</span> <strong>{house?.id}</strong>
          </p>
          <Link href={`/houses/${house?.id}`}>
            <Button variant="contained">View details</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
