import Head from "next/head";
import Dashboard from "@/components/dashboard";

export default function Home() {

  return (
    <>
      <Head>
        <title>Prodigitips</title>
        <meta name="description" content="We are a one stop solution for your marketing needs!" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main className="flex h-full w-full flex-col">
        <Dashboard />
      </main>
    </>
  );
}
