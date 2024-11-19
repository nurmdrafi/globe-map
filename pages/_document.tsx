/* eslint-disable @next/next/no-css-tags */
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Globe Map</title>
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
