import React from "react";
import Head from "next/head";
import Code from "../components/Code";

let code = `
const square = (x) => x*x
square(3);
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Dirtwork Generated Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Code className="jsx" live={true}>
          {code}
        </Code>
      </main>
    </>
  );
}
