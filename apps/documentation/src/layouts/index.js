import React from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";

const DefaultLayout = ({ frontMatter, children }) => {
  const { title } = frontMatter;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container>{children}</Container>
    </>
  );
};
export default DefaultLayout;
