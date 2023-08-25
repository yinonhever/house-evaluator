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

/**
 * A pop-up modal used to edit a house's details and save them. It uses the HouseForm component to manage the form,
 * with the existing house details as the initial form's data. Once the form is submitted and validated, this component
 * sends request to the backend to update the house, and then sends the updated data to the parent component (the House
 * Detail page).
 */
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

  /**
   * The function that's called after the form is submitted and validated. It sends request to the backend
   * to update the house with the data from the form. If the update is successful, it closes the modal and sends
   * the updated data to the parent component. Otherwise it displays an error message inside the modal.
   */
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
