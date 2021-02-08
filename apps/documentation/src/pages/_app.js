import React, { useEffect } from "react";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import components from "../components/components";
import "fontsource-roboto/300.css";
import "fontsource-roboto/400.css";
import "fontsource-roboto/500.css";
import "fontsource-roboto/700.css";
import "codemirror/lib/codemirror.css";
//import "../stylesheets/codemirror-overrides.css";
import "codemirror/theme/material.css";
import "codemirror/addon/scroll/simplescrollbars.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Default title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MDXProvider components={components}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </MDXProvider>
    </>
  );
}

export default MyApp;
