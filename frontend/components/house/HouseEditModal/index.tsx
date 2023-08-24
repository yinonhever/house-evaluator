import { HouseData, HouseFormData } from "@/lib/types";
import styles from "./HouseEditModal.module.scss";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import HouseForm from "../HouseForm";
import { SubmitHandler } from "react-hook-form";
import axios from "@/lib/axios";
import { useState } from "react";
import ErrorMessage from "@/components/UI/ErrorMessage";
import { cx } from "@/lib/functions";

export default function HouseEditModal({
  open,
  onClose,
  house,
  onUpdate
}: {
  open: boolean;
  onClose: () => void;
  house: HouseData;
  onUpdate: (data: HouseData) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const onSubmit: SubmitHandler<HouseFormData> = async formData => {
    console.log("onSubmit", formData);
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.put<HouseData>(
        `/api/houses/${house.id}`,
        formData
      );
      onUpdate(data);
      onClose();
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
      <DialogTitle textAlign="center">Edit house #{house.id}</DialogTitle>
      <DialogContent dividers>
        <div className={cx(styles.content, "form-wrapper")}>
          <HouseForm
            onSubmit={onSubmit}
            initialData={{ ...house }}
            loading={loading}
            buttonText="Update"
          />
          {error && <ErrorMessage error={error} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
