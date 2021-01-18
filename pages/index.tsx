import React from 'react'

import { Button } from '@chakra-ui/react'
import Head from 'next/head'

import downloadPdf from 'lib/downloadPdf'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Button onClick={() => downloadPdf({ language: 'pl' })} colorScheme="teal" size="lg">
          Download
        </Button>
      </main>
    </div>
  )
}
