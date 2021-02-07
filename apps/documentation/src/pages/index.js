import React from "react";
import Head from "next/head";
//import { MyComponent } from "@Test/my-component"

export default function Home() {
  return (
    <>
      <Head>
        <title>Dirtwork Generated Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Test</h1>
        <p>Welcome to Next App</p>
        {/*<MyComponent />*/}
      </main>
    </>
  );
}
