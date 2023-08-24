import Alert from "@mui/material/Alert";
import { AxiosError } from "axios";

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
