import React, { FC } from 'react'

import { GetStaticProps } from 'next'

import Head from 'next/head'

import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'

import { OptimizedImg } from 'src/types'

import CreateScenarioForm from 'src/components/Pages/scenarios/CreateScenarioForm'

type SSGProps = {
  tradeImg: OptimizedImg
}

const CreateScenarioPage: FC<SSGProps> = ({ tradeImg }) => (
  <>
    <Head>
      <title>Create scenario | przelejmi</title>
    </Head>

    <main>
      <CreateScenarioForm optimizedImg={tradeImg} />
    </main>
  </>
)

export const getStaticProps: GetStaticProps<SSGProps> = async () => {
  const src = '/trade.jpeg'
  const width = 4000
  const height = 1279
  const img = await getImage(src)
  const base64 = await getBase64(img)

  return {
    props: {
      tradeImg: {
        src,
        base64,
        ratio: height / width,
      },
    },
  }
}

export default CreateScenarioPage
