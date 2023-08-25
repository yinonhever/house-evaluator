import Head from "next/head";
import Page from "@/components/layout/Page";
import { useState } from "react";
import { HouseData, HouseFormData } from "@/lib/types";
import { SubmitHandler } from "react-hook-form";
import axios from "@/lib/axios";
import HouseForm from "@/components/house/HouseForm";
import ErrorMessage from "@/components/UI/ErrorMessage";
import ConfirmationModal from "@/components/house/ConfirmationModal";

/**
 * The website's homepage includes a form for creating a new house. Once the form is submitted and
 * a new house is created successfully, a modal opens up displaying the newly created house's ID, and a
 * link that redirects to the new house's detail page.
 */
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [completed, setCompleted] = useState(false);
  const [createdHouse, setCreatedHouse] = useState<HouseData>();

  /**
   * The function that's called after the form is submitted and validated. It sends request to the backend
   * to create a new house with the data from the form. If the creation is successful, it updates the state
   * to open the modal and display the new house's ID. Otherwise it displays and error message below the form.
   */
  const onSubmit: SubmitHandler<HouseFormData> = async formData => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post<HouseData>("/api/houses", formData);
      setCreatedHouse(data);
      setCompleted(true);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>New House – House Evaluator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Page title="New House">
        <div className="form-wrapper">
          <HouseForm
            onSubmit={onSubmit}
            loading={loading}
            buttonText="Create"
          />
          {error && <ErrorMessage error={error} />}
        </div>
        <ConfirmationModal open={completed} house={createdHouse} />
      </Page>
    </>
  );
}
