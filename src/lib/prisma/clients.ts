import { PaginatedClientListQueryVariables } from 'src/generated/graphql'
import { NexusGenFieldTypes } from 'src/generated/nexus-typegen'

import prisma from './prismaClient'

export async function getPaginatedClientListData(
  variables: PaginatedClientListQueryVariables
): Promise<NexusGenFieldTypes['PaginatedClientList']> {
  const [totalCount, list, countryList, cityList] = await Promise.all([
    prisma.client.count({ where: variables.where }),
    prisma.client.findMany(variables),
    prisma.client.findMany({
      distinct: 'country',
      select: { country: true },
    }),
    prisma.client.findMany({
      distinct: 'city',
      select: { city: true },
    }),
  ])
  return {
    totalCount,
    list,
    filters: {
      country: countryList.map(({ country }) => country),
      city: cityList.map(({ city }) => city),
    },
  }
}
