import React, { FC } from 'react'

import { Button, Center } from '@chakra-ui/react'

import { ClientContentFragment } from 'src/generated/graphql'

import { Assignments } from './AssignmentsSection'

const ClientSelect: FC<{
  assignments: Assignments
  onAssign(data: Partial<Assignments>): void
  client: ClientContentFragment
}> = ({ client, assignments, onAssign }) => {
  const isSelected = assignments.clientId === client.id

  return (
    <React.Fragment key={client.id}>
      <Center justifyContent="flex-start">{client.name}</Center>
      <Center justifyContent="flex-start">{client.VATId}</Center>
      <Button
        colorScheme={isSelected ? 'green' : 'blue'}
        onClick={() => {
          if (isSelected) {
            onAssign({ clientId: null })
            return
          }

          onAssign({ clientId: client.id })
        }}
      >
        {isSelected ? 'Selected' : 'Select'}
      </Button>
    </React.Fragment>
  )
}

export default ClientSelect
