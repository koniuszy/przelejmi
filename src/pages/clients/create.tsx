import React, { FC } from 'react'

import Head from 'next/head'

import CreateClientForm from 'src/clients/CreateClientForm'

const CreateClientPage: FC = () => (
  <>
    <Head>
      <title>Create client | przelejmi</title>
    </Head>

    <CreateClientForm />
  </>
)

export default CreateClientPage
