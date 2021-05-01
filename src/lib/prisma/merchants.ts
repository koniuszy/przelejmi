import { PaginatedMerchantListQueryVariables } from 'src/generated/graphql'
import { NexusGenFieldTypes } from 'src/generated/nexus-typegen'

import prisma from './prismaClient'

export async function getPaginatedMerchantListData(
  variables: PaginatedMerchantListQueryVariables
): Promise<NexusGenFieldTypes['PaginatedMerchantList']> {
  const [totalCount, list, countryList, cityList, bankList] = await Promise.all([
    prisma.merchant.count({ where: variables.where }),
    prisma.merchant.findMany(variables),
    prisma.merchant.findMany({
      distinct: 'country',
      select: { country: true },
    }),
    prisma.merchant.findMany({
      distinct: 'city',
      select: { city: true },
    }),
    prisma.merchant.findMany({ distinct: 'bankName', select: { bankName: true } }),
  ])

  return {
    totalCount,
    list,
    filters: {
      country: countryList.map(({ country }) => country),
      city: cityList.map(({ city }) => city),
      bank: bankList.map(({ bankName }) => bankName),
    },
  }
}
