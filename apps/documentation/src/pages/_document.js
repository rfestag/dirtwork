import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

const prod = process.env.NODE_ENV === "production";

const csp = [
  `base-uri 'none';`,
  `form-action 'self';`,
  `default-src 'self';`,
  `script-src 'self' ${prod ? "" : "'unsafe-eval'"};`, // NextJS requires 'unsafe-eval' in dev (faster source maps)
  `style-src 'self' 'unsafe-inline' data:;`, // NextJS requires 'unsafe-inline'
  `img-src 'self' https://image.shutterstock.com data: blob:;`,
  `font-src 'self';`,
  `frame-src 'none';`,
  `media-src 'none';`,
  `object-src 'none';`,
].join("");

const referrer = "strict-origin";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => {
      return originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });
    };
    const initialProps = await Document.getInitialProps(ctx);
    return {
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
      ...initialProps,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
          <meta name="referrer" content={referrer} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
