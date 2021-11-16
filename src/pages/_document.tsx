/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { ColorModeScript } from '@chakra-ui/react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <ColorModeScript initialColorMode="dark" />

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
