import Head from "next/head";

export default function Meta({ title }: {title: string}) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Head>
  );
}

Meta.defaultProps = {
  title: "Bus Sensus",
};
