import Head from "next/head";
import Page from "@/components/layout/Page";

export default function Home() {
  return (
    <>
      <Head>
        <title>New House – House Evaluator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Page title="New House">
        <div>The homepage</div>
      </Page>
    </>
  );
}
