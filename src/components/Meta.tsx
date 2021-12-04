import Head from "next/head";

type IProps = {
  title?: string;
  keywords?: string;
  description?: string;
};

const Meta: React.FC<IProps> = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "@mjcarnaje",
  keywords:
    "mjcarnaje, mj carnaje, michael james, michael, james, Michael James Carnaje, michaeljamescarnaje1@gmail.com",
  description: "mjcarnaje portfolio",
};

export default Meta;
