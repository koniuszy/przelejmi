import React, { FC } from 'react'

import { GetStaticProps } from 'next'

import Head from 'next/head'

import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'

import { OptimizedImg } from 'src/types'

import ClientForm from 'src/components/Pages/clients/ClientForm'

type SSGProps = {
  calmInTrolleyImg: OptimizedImg
}

const CreateClient: FC<SSGProps> = ({ calmInTrolleyImg }) => (
  <>
    <Head>
      <title>Create client | przelejmi</title>
    </Head>

    <ClientForm calmInTrolleyImg={calmInTrolleyImg} />
  </>
)

export const getStaticProps: GetStaticProps<SSGProps> = async () => {
  const src = '/calmInTrolley.jpg'
  const width = 1920
  const height = 2880
  const img = await getImage(src)
  const base64 = await getBase64(img)

  return {
    props: {
      calmInTrolleyImg: {
        src,
        base64,
        ratio: height / width,
      },
    },
  }
}
export default CreateClient
