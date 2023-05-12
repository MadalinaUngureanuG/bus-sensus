import Head from "next/head";

export default function Meta({ title = "Bus Sensus" }: { title: string }) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Head>
  );
}
