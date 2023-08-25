import Alert from "@mui/material/Alert";
import { AxiosError } from "axios";

/**
 * Reusable component used to display error messages in various parts of the application when they
 * get into an error state.
 */
export default function ErrorMessage({ error }: { error: Error | string }) {
  const errorMsg =
    typeof error === "string"
      ? error
      : error instanceof AxiosError
      ? error.response?.data?.msg
      : error.message;

  return (
    <Alert severity="error" sx={{ width: "100%", mb: 0 }}>
      {errorMsg || "An error occured"}
    </Alert>
  );
}
