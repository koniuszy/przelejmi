import React, { FC } from 'react'

import { NextPage } from 'next'

import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { SimpleGrid, Image, Button, Skeleton, Heading, Center } from '@chakra-ui/react'

import styled from '@emotion/styled'

import { useScenarioListQuery } from 'src/generated/hasura'

const HiddenImageContent = styled.div`
  opacity: 0;
  transition: ease opacity 150ms;
  position: absolute;
`
const ImageBox = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;

  :hover,
  :focus {
    img {
      opacity: 0.2;
    }
    div {
      opacity: 1;
    }
  }
`

const ScenarioList: FC = () => {
  const router = useRouter()
  const { data } = useScenarioListQuery({ fetchPolicy: 'cache-and-network' })

  if (!data?.scenarios)
    return (
      <SimpleGrid columns={3} gap={10}>
        {new Array(6).fill(null).map((i, index) => (
          <Skeleton w="100%" maxW={400} h={200} key={index} />
        ))}
      </SimpleGrid>
    )

  if (data.scenarios.length === 0) {
    return (
      <Center mt={10} display="flex" flexDirection="column">
        <Heading as="h2">No scenarios yet 🤫</Heading>
        <NextLink href="scenarios/create">
          <Button mt={5} colorScheme="teal">
            Create
          </Button>
        </NextLink>
      </Center>
    )
  }

  return (
    <SimpleGrid as="ul" columns={3} gap={10}>
      {data.scenarios.map((i, index) => (
        <ImageBox key={index}>
          <Image
            transition="ease opacity 150ms"
            cursor="pointer"
            w={400}
            h={200}
            objectFit="cover"
            fallbackSrc="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt={i.name}
            src={i.imgUrl}
          />
          <HiddenImageContent>
            <Button colorScheme="teal" onClick={() => router.push(`/scenarios/invoice/${i.id}`)}>
              Invoice
            </Button>
          </HiddenImageContent>
        </ImageBox>
      ))}
    </SimpleGrid>
  )
}

const App: NextPage = () => (
  <>
    <Head>
      <title>Merchants | przelejmi</title>
    </Head>

    <ScenarioList />
  </>
)

export default App
