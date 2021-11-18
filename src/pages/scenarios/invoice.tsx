import { FC } from 'react'

import { NextPage } from 'next'

import Head from 'next/head'

const CreateInvoice: FC = () => {
  return null
}

const CreateInvoicePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create invoice | przelejmi</title>
      </Head>

      <main>
        <CreateInvoice />
      </main>
    </div>
  )
}

export default CreateInvoicePage
