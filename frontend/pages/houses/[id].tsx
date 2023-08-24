import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios from "@/lib/axios";
import { HouseData } from "@/lib/types";
import Page from "@/components/layout/Page";
import HouseDetails from "@/components/house/HouseDetails";
import Head from "next/head";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import HouseEditModal from "@/components/house/HouseEditModal";

export default function HousePage({
  house
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [houseData, setHouseData] = useState({ ...house });
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <Head>
        <title>House Details – House Evaluator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Page title={`House Details – #${house.id}`}>
        <div className="button-row">
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setShowEditModal(true)}
          >
            Edit house
          </Button>
        </div>
        <HouseDetails house={houseData} />
        <HouseEditModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          house={house}
          onUpdate={setHouseData}
        />
      </Page>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  house: HouseData;
}> = async ({ params }) => {
  try {
    const houseId = params?.id as string;
    const { data: house } = await axios.get<HouseData>(
      `/api/houses/${houseId}`
    );
    return { props: { house } };
  } catch (error) {
    return { notFound: true };
  }
};
