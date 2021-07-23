import React, { FC } from 'react'

import Head from 'next/head'

import CreateScenarioForm from 'src/scenarios/CreateScenarioForm'

const CreateScenarioPage: FC = () => (
  <>
    <Head>
      <title>Create scenario | przelejmi</title>
    </Head>

    <main>
      <CreateScenarioForm />
    </main>
  </>
)

export default CreateScenarioPage
