import React, { FC } from 'react'

import { GetStaticProps } from 'next'

import Head from 'next/head'

import { getBase64 } from '@plaiceholder/base64'
import { getImage } from '@plaiceholder/next'

import { OptimizedImg } from 'src/types'

import CreateMerchantForm from 'src/components/Pages/merchants/MerchantForm'

type SSGProps = {
  womanWithFoldersImg: OptimizedImg
}

const CreateMerchantPage: FC<SSGProps> = ({ womanWithFoldersImg }) => (
  <>
    <Head>
      <title>Create merchant | przelejmi</title>
    </Head>

    <main>
      <CreateMerchantForm womanWithFoldersImg={womanWithFoldersImg} />
    </main>
  </>
)

export const getStaticProps: GetStaticProps<SSGProps> = async () => {
  const src = '/womanWithFolders.jpg'
  const width = 1920
  const height = 2880
  const img = await getImage(src)
  const base64 = await getBase64(img)

  return {
    props: {
      womanWithFoldersImg: {
        src,
        base64,
        ratio: height / width,
      },
    },
  }
}

export default CreateMerchantPage
