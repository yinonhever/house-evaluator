import { HouseFormData } from "@/lib/types";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./HouseForm.module.scss";
import LoadingButton from "@mui/lab/LoadingButton";

export default function HouseForm({
  initialData,
  onSubmit,
  loading,
  buttonText
}: {
  initialData?: HouseFormData;
  onSubmit: SubmitHandler<HouseFormData>;
  loading: boolean;
  buttonText: string;
}) {
  const { register, handleSubmit } = useForm<HouseFormData>({
    defaultValues: initialData || {
      address: "",
      currentValue: null,
      loanAmount: null
    }
  });

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label}>Address</label>
        <input
          className={styles.input}
          {...register("address")}
          placeholder="Enter house address"
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Current value</label>
        <input
          type="number"
          className={styles.input}
          {...register("currentValue")}
          placeholder="Enter current value"
          required
          step="any"
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Loan amount</label>
        <input
          type="number"
          className={styles.input}
          {...register("loanAmount")}
          placeholder="Enter current value"
          required
          step="any"
        />
      </div>
      <LoadingButton
        type="submit"
        variant="contained"
        fullWidth
        loading={loading}
      >
        {buttonText}
      </LoadingButton>
    </form>
  );
}
