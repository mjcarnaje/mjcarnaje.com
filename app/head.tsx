import Script from "next/script";
import { DefaultTags } from "../components";

export default async function Head() {
  return (
    <>
      <title>Michael James Carnaje - Software Engineer</title>
      <meta
        name="description"
        content="Michael James Carnaje - Software Engineer"
      />
      <meta name="author" content="Michael James Carnaje" />
      <meta name="keywords" content="Michael James Carnaje" />
      <Script
        src="https://unpkg.com/twemoji@latest/dist/twemoji.min.js"
        crossOrigin="anonymous"
      />
      <DefaultTags />
    </>
  );
}
