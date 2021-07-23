import React, { FC } from 'react'

import Head from 'next/head'

import CreateMerchantForm from 'src/merchants/CreateMerchantForm'

const CreateMerchantPage: FC = () => (
  <>
    <Head>
      <title>Create merchant | przelejmi</title>
    </Head>

    <main>
      <CreateMerchantForm />
    </main>
  </>
)

export default CreateMerchantPage
