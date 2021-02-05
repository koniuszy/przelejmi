import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Client = {
  __typename?: 'Client';
  Scenario: Array<Scenario>;
  VATId?: Maybe<Scalars['String']>;
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  postCode: Scalars['String'];
};


export type ClientScenarioArgs = {
  cursor?: Maybe<ScenarioWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type ClientCreateInput = {
  Scenario?: Maybe<ScenarioCreateNestedManyWithoutClientInput>;
  VATId?: Maybe<Scalars['String']>;
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  name: Scalars['String'];
  postCode: Scalars['String'];
};

export type ClientCreateNestedOneWithoutScenarioInput = {
  connect?: Maybe<ClientWhereUniqueInput>;
  connectOrCreate?: Maybe<ClientCreateOrConnectWithoutScenarioInput>;
  create?: Maybe<ClientCreateWithoutScenarioInput>;
};

export type ClientCreateOrConnectWithoutScenarioInput = {
  create: ClientCreateWithoutScenarioInput;
  where: ClientWhereUniqueInput;
};

export type ClientCreateWithoutScenarioInput = {
  VATId?: Maybe<Scalars['String']>;
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  name: Scalars['String'];
  postCode: Scalars['String'];
};

export type ClientOrderByInput = {
  VATId?: Maybe<SortOrder>;
  address?: Maybe<SortOrder>;
  city?: Maybe<SortOrder>;
  country?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  postCode?: Maybe<SortOrder>;
};

export type ClientUpdateInput = {
  Scenario?: Maybe<ScenarioUpdateManyWithoutClientInput>;
  VATId?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
};

export type ClientUpdateOneRequiredWithoutScenarioInput = {
  connect?: Maybe<ClientWhereUniqueInput>;
  connectOrCreate?: Maybe<ClientCreateOrConnectWithoutScenarioInput>;
  create?: Maybe<ClientCreateWithoutScenarioInput>;
  update?: Maybe<ClientUpdateWithoutScenarioInput>;
  upsert?: Maybe<ClientUpsertWithoutScenarioInput>;
};

export type ClientUpdateWithoutScenarioInput = {
  VATId?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
};

export type ClientUpsertWithoutScenarioInput = {
  create: ClientCreateWithoutScenarioInput;
  update: ClientUpdateWithoutScenarioInput;
};

export type ClientWhereInput = {
  AND?: Maybe<Array<ClientWhereInput>>;
  NOT?: Maybe<Array<ClientWhereInput>>;
  OR?: Maybe<Array<ClientWhereInput>>;
  Scenario?: Maybe<ScenarioListRelationFilter>;
  VATId?: Maybe<StringNullableFilter>;
  address?: Maybe<StringFilter>;
  city?: Maybe<StringFilter>;
  country?: Maybe<StringFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  postCode?: Maybe<StringFilter>;
};

export type ClientWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};


export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type Merchant = {
  __typename?: 'Merchant';
  Scenario: Array<Scenario>;
  VATId: Scalars['String'];
  address: Scalars['String'];
  bankAccountEur?: Maybe<Scalars['String']>;
  bankAccountPln: Scalars['String'];
  bankName: Scalars['String'];
  city: Scalars['String'];
  companyName: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  issuerName: Scalars['String'];
  postCode: Scalars['String'];
};


export type MerchantScenarioArgs = {
  cursor?: Maybe<ScenarioWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type MerchantCreateInput = {
  Scenario?: Maybe<ScenarioCreateNestedManyWithoutMerchantInput>;
  VATId: Scalars['String'];
  address: Scalars['String'];
  bankAccountEur?: Maybe<Scalars['String']>;
  bankAccountPln: Scalars['String'];
  bankName: Scalars['String'];
  city: Scalars['String'];
  companyName: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  issuerName: Scalars['String'];
  postCode: Scalars['String'];
};

export type MerchantCreateNestedOneWithoutScenarioInput = {
  connect?: Maybe<MerchantWhereUniqueInput>;
  connectOrCreate?: Maybe<MerchantCreateOrConnectWithoutScenarioInput>;
  create?: Maybe<MerchantCreateWithoutScenarioInput>;
};

export type MerchantCreateOrConnectWithoutScenarioInput = {
  create: MerchantCreateWithoutScenarioInput;
  where: MerchantWhereUniqueInput;
};

export type MerchantCreateWithoutScenarioInput = {
  VATId: Scalars['String'];
  address: Scalars['String'];
  bankAccountEur?: Maybe<Scalars['String']>;
  bankAccountPln: Scalars['String'];
  bankName: Scalars['String'];
  city: Scalars['String'];
  companyName: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  issuerName: Scalars['String'];
  postCode: Scalars['String'];
};

export type MerchantOrderByInput = {
  VATId?: Maybe<SortOrder>;
  address?: Maybe<SortOrder>;
  bankAccountEur?: Maybe<SortOrder>;
  bankAccountPln?: Maybe<SortOrder>;
  bankName?: Maybe<SortOrder>;
  city?: Maybe<SortOrder>;
  companyName?: Maybe<SortOrder>;
  country?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  issuerName?: Maybe<SortOrder>;
  postCode?: Maybe<SortOrder>;
};

export type MerchantUpdateInput = {
  Scenario?: Maybe<ScenarioUpdateManyWithoutMerchantInput>;
  VATId?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  bankAccountEur?: Maybe<Scalars['String']>;
  bankAccountPln?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  issuerName?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
};

export type MerchantUpdateOneRequiredWithoutScenarioInput = {
  connect?: Maybe<MerchantWhereUniqueInput>;
  connectOrCreate?: Maybe<MerchantCreateOrConnectWithoutScenarioInput>;
  create?: Maybe<MerchantCreateWithoutScenarioInput>;
  update?: Maybe<MerchantUpdateWithoutScenarioInput>;
  upsert?: Maybe<MerchantUpsertWithoutScenarioInput>;
};

export type MerchantUpdateWithoutScenarioInput = {
  VATId?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  bankAccountEur?: Maybe<Scalars['String']>;
  bankAccountPln?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  issuerName?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
};

export type MerchantUpsertWithoutScenarioInput = {
  create: MerchantCreateWithoutScenarioInput;
  update: MerchantUpdateWithoutScenarioInput;
};

export type MerchantWhereInput = {
  AND?: Maybe<Array<MerchantWhereInput>>;
  NOT?: Maybe<Array<MerchantWhereInput>>;
  OR?: Maybe<Array<MerchantWhereInput>>;
  Scenario?: Maybe<ScenarioListRelationFilter>;
  VATId?: Maybe<StringFilter>;
  address?: Maybe<StringFilter>;
  bankAccountEur?: Maybe<StringNullableFilter>;
  bankAccountPln?: Maybe<StringFilter>;
  bankName?: Maybe<StringFilter>;
  city?: Maybe<StringFilter>;
  companyName?: Maybe<StringFilter>;
  country?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  id?: Maybe<IntFilter>;
  issuerName?: Maybe<StringFilter>;
  postCode?: Maybe<StringFilter>;
};

export type MerchantWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneClient: Client;
  createOneMerchant: Merchant;
  createOneScenario: Scenario;
  deleteOneClient?: Maybe<Client>;
  deleteOneMerchant?: Maybe<Merchant>;
  updateOneClient?: Maybe<Client>;
  updateOneMerchant?: Maybe<Merchant>;
  updateOneScenario?: Maybe<Scenario>;
};


export type MutationCreateOneClientArgs = {
  data: ClientCreateInput;
};


export type MutationCreateOneMerchantArgs = {
  data: MerchantCreateInput;
};


export type MutationCreateOneScenarioArgs = {
  data: ScenarioCreateInput;
};


export type MutationDeleteOneClientArgs = {
  where: ClientWhereUniqueInput;
};


export type MutationDeleteOneMerchantArgs = {
  where: MerchantWhereUniqueInput;
};


export type MutationUpdateOneClientArgs = {
  data: ClientUpdateInput;
  where: ClientWhereUniqueInput;
};


export type MutationUpdateOneMerchantArgs = {
  data: MerchantUpdateInput;
  where: MerchantWhereUniqueInput;
};


export type MutationUpdateOneScenarioArgs = {
  data: ScenarioUpdateInput;
  where: ScenarioWhereUniqueInput;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type NestedIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type PaginatedClients = {
  __typename?: 'PaginatedClients';
  list?: Maybe<Array<Maybe<Client>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PaginatedMerchants = {
  __typename?: 'PaginatedMerchants';
  list?: Maybe<Array<Maybe<Merchant>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  client?: Maybe<Client>;
  clients: Array<Client>;
  merchant?: Maybe<Merchant>;
  merchants: Array<Merchant>;
  paginatedClients?: Maybe<PaginatedClients>;
  paginatedMerchants?: Maybe<PaginatedMerchants>;
  scenario?: Maybe<Scenario>;
  scenarios: Array<Scenario>;
};


export type QueryClientArgs = {
  where: ClientWhereUniqueInput;
};


export type QueryClientsArgs = {
  cursor?: Maybe<ClientWhereUniqueInput>;
  orderBy?: Maybe<Array<ClientOrderByInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<ClientWhereInput>;
};


export type QueryMerchantArgs = {
  where: MerchantWhereUniqueInput;
};


export type QueryMerchantsArgs = {
  cursor?: Maybe<MerchantWhereUniqueInput>;
  orderBy?: Maybe<Array<MerchantOrderByInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<MerchantWhereInput>;
};


export type QueryPaginatedClientsArgs = {
  orderBy?: Maybe<Array<Maybe<ClientOrderByInput>>>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
  where?: Maybe<ClientWhereInput>;
};


export type QueryPaginatedMerchantsArgs = {
  orderBy?: Maybe<Array<Maybe<MerchantOrderByInput>>>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
  where?: Maybe<MerchantWhereInput>;
};


export type QueryScenarioArgs = {
  where: ScenarioWhereUniqueInput;
};


export type QueryScenariosArgs = {
  cursor?: Maybe<ScenarioWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Scenario = {
  __typename?: 'Scenario';
  VATId: Scalars['Int'];
  amount: Scalars['Int'];
  client: Client;
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  merchant: Merchant;
  merchantId: Scalars['Int'];
  name: Scalars['String'];
  netPerOne: Scalars['Int'];
  notes: Scalars['String'];
  paymentType: Scalars['String'];
  unit: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ScenarioCreateInput = {
  VATId: Scalars['Int'];
  amount: Scalars['Int'];
  client: ClientCreateNestedOneWithoutScenarioInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  dayPayments: Scalars['Int'];
  merchant: MerchantCreateNestedOneWithoutScenarioInput;
  name: Scalars['String'];
  netPerOne: Scalars['Int'];
  notes: Scalars['String'];
  paymentType: Scalars['String'];
  unit: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ScenarioCreateNestedManyWithoutClientInput = {
  connect?: Maybe<Array<ScenarioWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ScenarioCreateOrConnectWithoutclientInput>>;
  create?: Maybe<Array<ScenarioCreateWithoutClientInput>>;
};

export type ScenarioCreateNestedManyWithoutMerchantInput = {
  connect?: Maybe<Array<ScenarioWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ScenarioCreateOrConnectWithoutmerchantInput>>;
  create?: Maybe<Array<ScenarioCreateWithoutMerchantInput>>;
};

export type ScenarioCreateOrConnectWithoutclientInput = {
  create: ScenarioCreateWithoutClientInput;
  where: ScenarioWhereUniqueInput;
};

export type ScenarioCreateOrConnectWithoutmerchantInput = {
  create: ScenarioCreateWithoutMerchantInput;
  where: ScenarioWhereUniqueInput;
};

export type ScenarioCreateWithoutClientInput = {
  VATId: Scalars['Int'];
  amount: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  dayPayments: Scalars['Int'];
  merchant: MerchantCreateNestedOneWithoutScenarioInput;
  name: Scalars['String'];
  netPerOne: Scalars['Int'];
  notes: Scalars['String'];
  paymentType: Scalars['String'];
  unit: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ScenarioCreateWithoutMerchantInput = {
  VATId: Scalars['Int'];
  amount: Scalars['Int'];
  client: ClientCreateNestedOneWithoutScenarioInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  dayPayments: Scalars['Int'];
  name: Scalars['String'];
  netPerOne: Scalars['Int'];
  notes: Scalars['String'];
  paymentType: Scalars['String'];
  unit: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ScenarioListRelationFilter = {
  every?: Maybe<ScenarioWhereInput>;
  none?: Maybe<ScenarioWhereInput>;
  some?: Maybe<ScenarioWhereInput>;
};

export type ScenarioScalarWhereInput = {
  AND?: Maybe<Array<ScenarioScalarWhereInput>>;
  NOT?: Maybe<Array<ScenarioScalarWhereInput>>;
  OR?: Maybe<Array<ScenarioScalarWhereInput>>;
  VATId?: Maybe<IntFilter>;
  amount?: Maybe<IntFilter>;
  clientId?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  dayPayments?: Maybe<IntFilter>;
  id?: Maybe<IntFilter>;
  merchantId?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  netPerOne?: Maybe<IntFilter>;
  notes?: Maybe<StringFilter>;
  paymentType?: Maybe<StringFilter>;
  unit?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type ScenarioUpdateInput = {
  VATId?: Maybe<Scalars['Int']>;
  amount?: Maybe<Scalars['Int']>;
  client?: Maybe<ClientUpdateOneRequiredWithoutScenarioInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dayPayments?: Maybe<Scalars['Int']>;
  merchant?: Maybe<MerchantUpdateOneRequiredWithoutScenarioInput>;
  name?: Maybe<Scalars['String']>;
  netPerOne?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ScenarioUpdateManyMutationInput = {
  VATId?: Maybe<Scalars['Int']>;
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dayPayments?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  netPerOne?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ScenarioUpdateManyWithWhereWithoutClientInput = {
  data: ScenarioUpdateManyMutationInput;
  where: ScenarioScalarWhereInput;
};

export type ScenarioUpdateManyWithWhereWithoutMerchantInput = {
  data: ScenarioUpdateManyMutationInput;
  where: ScenarioScalarWhereInput;
};

export type ScenarioUpdateManyWithoutClientInput = {
  connect?: Maybe<Array<ScenarioWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ScenarioCreateOrConnectWithoutclientInput>>;
  create?: Maybe<Array<ScenarioCreateWithoutClientInput>>;
  delete?: Maybe<Array<ScenarioWhereUniqueInput>>;
  deleteMany?: Maybe<Array<ScenarioScalarWhereInput>>;
  disconnect?: Maybe<Array<ScenarioWhereUniqueInput>>;
  set?: Maybe<Array<ScenarioWhereUniqueInput>>;
  update?: Maybe<Array<ScenarioUpdateWithWhereUniqueWithoutClientInput>>;
  updateMany?: Maybe<Array<ScenarioUpdateManyWithWhereWithoutClientInput>>;
  upsert?: Maybe<Array<ScenarioUpsertWithWhereUniqueWithoutClientInput>>;
};

export type ScenarioUpdateManyWithoutMerchantInput = {
  connect?: Maybe<Array<ScenarioWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ScenarioCreateOrConnectWithoutmerchantInput>>;
  create?: Maybe<Array<ScenarioCreateWithoutMerchantInput>>;
  delete?: Maybe<Array<ScenarioWhereUniqueInput>>;
  deleteMany?: Maybe<Array<ScenarioScalarWhereInput>>;
  disconnect?: Maybe<Array<ScenarioWhereUniqueInput>>;
  set?: Maybe<Array<ScenarioWhereUniqueInput>>;
  update?: Maybe<Array<ScenarioUpdateWithWhereUniqueWithoutMerchantInput>>;
  updateMany?: Maybe<Array<ScenarioUpdateManyWithWhereWithoutMerchantInput>>;
  upsert?: Maybe<Array<ScenarioUpsertWithWhereUniqueWithoutMerchantInput>>;
};

export type ScenarioUpdateWithWhereUniqueWithoutClientInput = {
  data: ScenarioUpdateWithoutClientInput;
  where: ScenarioWhereUniqueInput;
};

export type ScenarioUpdateWithWhereUniqueWithoutMerchantInput = {
  data: ScenarioUpdateWithoutMerchantInput;
  where: ScenarioWhereUniqueInput;
};

export type ScenarioUpdateWithoutClientInput = {
  VATId?: Maybe<Scalars['Int']>;
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dayPayments?: Maybe<Scalars['Int']>;
  merchant?: Maybe<MerchantUpdateOneRequiredWithoutScenarioInput>;
  name?: Maybe<Scalars['String']>;
  netPerOne?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ScenarioUpdateWithoutMerchantInput = {
  VATId?: Maybe<Scalars['Int']>;
  amount?: Maybe<Scalars['Int']>;
  client?: Maybe<ClientUpdateOneRequiredWithoutScenarioInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dayPayments?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  netPerOne?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ScenarioUpsertWithWhereUniqueWithoutClientInput = {
  create: ScenarioCreateWithoutClientInput;
  update: ScenarioUpdateWithoutClientInput;
  where: ScenarioWhereUniqueInput;
};

export type ScenarioUpsertWithWhereUniqueWithoutMerchantInput = {
  create: ScenarioCreateWithoutMerchantInput;
  update: ScenarioUpdateWithoutMerchantInput;
  where: ScenarioWhereUniqueInput;
};

export type ScenarioWhereInput = {
  AND?: Maybe<Array<ScenarioWhereInput>>;
  NOT?: Maybe<Array<ScenarioWhereInput>>;
  OR?: Maybe<Array<ScenarioWhereInput>>;
  VATId?: Maybe<IntFilter>;
  amount?: Maybe<IntFilter>;
  client?: Maybe<ClientWhereInput>;
  clientId?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  dayPayments?: Maybe<IntFilter>;
  id?: Maybe<IntFilter>;
  merchant?: Maybe<MerchantWhereInput>;
  merchantId?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  netPerOne?: Maybe<IntFilter>;
  notes?: Maybe<StringFilter>;
  paymentType?: Maybe<StringFilter>;
  unit?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type ScenarioWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringNullableFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type ClientContentFragment = (
  { __typename?: 'Client' }
  & Pick<Client, 'id' | 'name' | 'address' | 'postCode' | 'city' | 'country' | 'VATId'>
);

export type MerchantContentFragment = (
  { __typename?: 'Merchant' }
  & Pick<Merchant, 'id' | 'companyName' | 'address' | 'postCode' | 'city' | 'country' | 'VATId' | 'bankAccountPln' | 'bankAccountEur' | 'bankName' | 'email' | 'issuerName'>
);

export type CreateClientMutationVariables = Exact<{
  data: ClientCreateInput;
}>;


export type CreateClientMutation = (
  { __typename?: 'Mutation' }
  & { createdClient: (
    { __typename?: 'Client' }
    & ClientContentFragment
  ) }
);

export type DeleteClientMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteClientMutation = (
  { __typename?: 'Mutation' }
  & { deletedClient?: Maybe<(
    { __typename?: 'Client' }
    & Pick<Client, 'id'>
  )> }
);

export type UpdateClientMutationVariables = Exact<{
  data: ClientUpdateInput;
  id: Scalars['Int'];
}>;


export type UpdateClientMutation = (
  { __typename?: 'Mutation' }
  & { updatedClient?: Maybe<(
    { __typename?: 'Client' }
    & ClientContentFragment
  )> }
);

export type CreateMerchantMutationVariables = Exact<{
  data: MerchantCreateInput;
}>;


export type CreateMerchantMutation = (
  { __typename?: 'Mutation' }
  & { createdMerchant: (
    { __typename?: 'Merchant' }
    & MerchantContentFragment
  ) }
);

export type DeleteMerchantMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMerchantMutation = (
  { __typename?: 'Mutation' }
  & { deletedMerchant?: Maybe<(
    { __typename?: 'Merchant' }
    & Pick<Merchant, 'id'>
  )> }
);

export type UpdateMerchantMutationVariables = Exact<{
  data: MerchantUpdateInput;
  id: Scalars['Int'];
}>;


export type UpdateMerchantMutation = (
  { __typename?: 'Mutation' }
  & { updatedMerchant?: Maybe<(
    { __typename?: 'Merchant' }
    & MerchantContentFragment
  )> }
);

export type ClientQueryVariables = Exact<{
  where: ClientWhereUniqueInput;
}>;


export type ClientQuery = (
  { __typename?: 'Query' }
  & { client?: Maybe<(
    { __typename?: 'Client' }
    & ClientContentFragment
  )> }
);

export type PaginatedClientListQueryVariables = Exact<{
  orderBy?: Maybe<Array<ClientOrderByInput> | ClientOrderByInput>;
  where?: Maybe<ClientWhereInput>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type PaginatedClientListQuery = (
  { __typename?: 'Query' }
  & { paginatedClientList?: Maybe<(
    { __typename?: 'PaginatedClients' }
    & Pick<PaginatedClients, 'totalCount'>
    & { list?: Maybe<Array<Maybe<(
      { __typename?: 'Client' }
      & ClientContentFragment
    )>>> }
  )> }
);

export type MerchantQueryVariables = Exact<{
  where: MerchantWhereUniqueInput;
}>;


export type MerchantQuery = (
  { __typename?: 'Query' }
  & { merchant?: Maybe<(
    { __typename?: 'Merchant' }
    & MerchantContentFragment
  )> }
);

export type PaginatedMerchantListQueryVariables = Exact<{
  orderBy?: Maybe<Array<MerchantOrderByInput> | MerchantOrderByInput>;
  where?: Maybe<MerchantWhereInput>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type PaginatedMerchantListQuery = (
  { __typename?: 'Query' }
  & { paginatedMerchantList?: Maybe<(
    { __typename?: 'PaginatedMerchants' }
    & Pick<PaginatedMerchants, 'totalCount'>
    & { list?: Maybe<Array<Maybe<(
      { __typename?: 'Merchant' }
      & MerchantContentFragment
    )>>> }
  )> }
);

export const ClientContentFragmentDoc = gql`
    fragment ClientContent on Client {
  id
  name
  address
  postCode
  city
  country
  VATId
}
    `;
export const MerchantContentFragmentDoc = gql`
    fragment MerchantContent on Merchant {
  id
  companyName
  address
  postCode
  city
  country
  VATId
  bankAccountPln
  bankAccountEur
  bankName
  email
  issuerName
}
    `;
export const CreateClientDocument = gql`
    mutation createClient($data: ClientCreateInput!) {
  createdClient: createOneClient(data: $data) {
    ...ClientContent
  }
}
    ${ClientContentFragmentDoc}`;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, baseOptions);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const DeleteClientDocument = gql`
    mutation deleteClient($id: Int!) {
  deletedClient: deleteOneClient(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteClientMutationFn = Apollo.MutationFunction<DeleteClientMutation, DeleteClientMutationVariables>;

/**
 * __useDeleteClientMutation__
 *
 * To run a mutation, you first call `useDeleteClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClientMutation, { data, loading, error }] = useDeleteClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClientMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClientMutation, DeleteClientMutationVariables>) {
        return Apollo.useMutation<DeleteClientMutation, DeleteClientMutationVariables>(DeleteClientDocument, baseOptions);
      }
export type DeleteClientMutationHookResult = ReturnType<typeof useDeleteClientMutation>;
export type DeleteClientMutationResult = Apollo.MutationResult<DeleteClientMutation>;
export type DeleteClientMutationOptions = Apollo.BaseMutationOptions<DeleteClientMutation, DeleteClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation updateClient($data: ClientUpdateInput!, $id: Int!) {
  updatedClient: updateOneClient(data: $data, where: {id: $id}) {
    ...ClientContent
  }
}
    ${ClientContentFragmentDoc}`;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, baseOptions);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const CreateMerchantDocument = gql`
    mutation createMerchant($data: MerchantCreateInput!) {
  createdMerchant: createOneMerchant(data: $data) {
    ...MerchantContent
  }
}
    ${MerchantContentFragmentDoc}`;
export type CreateMerchantMutationFn = Apollo.MutationFunction<CreateMerchantMutation, CreateMerchantMutationVariables>;

/**
 * __useCreateMerchantMutation__
 *
 * To run a mutation, you first call `useCreateMerchantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMerchantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMerchantMutation, { data, loading, error }] = useCreateMerchantMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMerchantMutation(baseOptions?: Apollo.MutationHookOptions<CreateMerchantMutation, CreateMerchantMutationVariables>) {
        return Apollo.useMutation<CreateMerchantMutation, CreateMerchantMutationVariables>(CreateMerchantDocument, baseOptions);
      }
export type CreateMerchantMutationHookResult = ReturnType<typeof useCreateMerchantMutation>;
export type CreateMerchantMutationResult = Apollo.MutationResult<CreateMerchantMutation>;
export type CreateMerchantMutationOptions = Apollo.BaseMutationOptions<CreateMerchantMutation, CreateMerchantMutationVariables>;
export const DeleteMerchantDocument = gql`
    mutation deleteMerchant($id: Int!) {
  deletedMerchant: deleteOneMerchant(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteMerchantMutationFn = Apollo.MutationFunction<DeleteMerchantMutation, DeleteMerchantMutationVariables>;

/**
 * __useDeleteMerchantMutation__
 *
 * To run a mutation, you first call `useDeleteMerchantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMerchantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMerchantMutation, { data, loading, error }] = useDeleteMerchantMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMerchantMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMerchantMutation, DeleteMerchantMutationVariables>) {
        return Apollo.useMutation<DeleteMerchantMutation, DeleteMerchantMutationVariables>(DeleteMerchantDocument, baseOptions);
      }
export type DeleteMerchantMutationHookResult = ReturnType<typeof useDeleteMerchantMutation>;
export type DeleteMerchantMutationResult = Apollo.MutationResult<DeleteMerchantMutation>;
export type DeleteMerchantMutationOptions = Apollo.BaseMutationOptions<DeleteMerchantMutation, DeleteMerchantMutationVariables>;
export const UpdateMerchantDocument = gql`
    mutation updateMerchant($data: MerchantUpdateInput!, $id: Int!) {
  updatedMerchant: updateOneMerchant(data: $data, where: {id: $id}) {
    ...MerchantContent
  }
}
    ${MerchantContentFragmentDoc}`;
export type UpdateMerchantMutationFn = Apollo.MutationFunction<UpdateMerchantMutation, UpdateMerchantMutationVariables>;

/**
 * __useUpdateMerchantMutation__
 *
 * To run a mutation, you first call `useUpdateMerchantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMerchantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMerchantMutation, { data, loading, error }] = useUpdateMerchantMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateMerchantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMerchantMutation, UpdateMerchantMutationVariables>) {
        return Apollo.useMutation<UpdateMerchantMutation, UpdateMerchantMutationVariables>(UpdateMerchantDocument, baseOptions);
      }
export type UpdateMerchantMutationHookResult = ReturnType<typeof useUpdateMerchantMutation>;
export type UpdateMerchantMutationResult = Apollo.MutationResult<UpdateMerchantMutation>;
export type UpdateMerchantMutationOptions = Apollo.BaseMutationOptions<UpdateMerchantMutation, UpdateMerchantMutationVariables>;
export const ClientDocument = gql`
    query client($where: ClientWhereUniqueInput!) {
  client(where: $where) {
    ...ClientContent
  }
}
    ${ClientContentFragmentDoc}`;

/**
 * __useClientQuery__
 *
 * To run a query within a React component, call `useClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useClientQuery(baseOptions: Apollo.QueryHookOptions<ClientQuery, ClientQueryVariables>) {
        return Apollo.useQuery<ClientQuery, ClientQueryVariables>(ClientDocument, baseOptions);
      }
export function useClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientQuery, ClientQueryVariables>) {
          return Apollo.useLazyQuery<ClientQuery, ClientQueryVariables>(ClientDocument, baseOptions);
        }
export type ClientQueryHookResult = ReturnType<typeof useClientQuery>;
export type ClientLazyQueryHookResult = ReturnType<typeof useClientLazyQuery>;
export type ClientQueryResult = Apollo.QueryResult<ClientQuery, ClientQueryVariables>;
export const PaginatedClientListDocument = gql`
    query paginatedClientList($orderBy: [ClientOrderByInput!], $where: ClientWhereInput, $skip: Int!, $take: Int!) {
  paginatedClientList: paginatedClients(
    orderBy: $orderBy
    where: $where
    take: $take
    skip: $skip
  ) {
    totalCount
    list {
      ...ClientContent
    }
  }
}
    ${ClientContentFragmentDoc}`;

/**
 * __usePaginatedClientListQuery__
 *
 * To run a query within a React component, call `usePaginatedClientListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedClientListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedClientListQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePaginatedClientListQuery(baseOptions: Apollo.QueryHookOptions<PaginatedClientListQuery, PaginatedClientListQueryVariables>) {
        return Apollo.useQuery<PaginatedClientListQuery, PaginatedClientListQueryVariables>(PaginatedClientListDocument, baseOptions);
      }
export function usePaginatedClientListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatedClientListQuery, PaginatedClientListQueryVariables>) {
          return Apollo.useLazyQuery<PaginatedClientListQuery, PaginatedClientListQueryVariables>(PaginatedClientListDocument, baseOptions);
        }
export type PaginatedClientListQueryHookResult = ReturnType<typeof usePaginatedClientListQuery>;
export type PaginatedClientListLazyQueryHookResult = ReturnType<typeof usePaginatedClientListLazyQuery>;
export type PaginatedClientListQueryResult = Apollo.QueryResult<PaginatedClientListQuery, PaginatedClientListQueryVariables>;
export const MerchantDocument = gql`
    query merchant($where: MerchantWhereUniqueInput!) {
  merchant(where: $where) {
    ...MerchantContent
  }
}
    ${MerchantContentFragmentDoc}`;

/**
 * __useMerchantQuery__
 *
 * To run a query within a React component, call `useMerchantQuery` and pass it any options that fit your needs.
 * When your component renders, `useMerchantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMerchantQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useMerchantQuery(baseOptions: Apollo.QueryHookOptions<MerchantQuery, MerchantQueryVariables>) {
        return Apollo.useQuery<MerchantQuery, MerchantQueryVariables>(MerchantDocument, baseOptions);
      }
export function useMerchantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MerchantQuery, MerchantQueryVariables>) {
          return Apollo.useLazyQuery<MerchantQuery, MerchantQueryVariables>(MerchantDocument, baseOptions);
        }
export type MerchantQueryHookResult = ReturnType<typeof useMerchantQuery>;
export type MerchantLazyQueryHookResult = ReturnType<typeof useMerchantLazyQuery>;
export type MerchantQueryResult = Apollo.QueryResult<MerchantQuery, MerchantQueryVariables>;
export const PaginatedMerchantListDocument = gql`
    query paginatedMerchantList($orderBy: [MerchantOrderByInput!], $where: MerchantWhereInput, $skip: Int!, $take: Int!) {
  paginatedMerchantList: paginatedMerchants(
    orderBy: $orderBy
    where: $where
    skip: $skip
    take: $take
  ) {
    totalCount
    list {
      ...MerchantContent
    }
  }
}
    ${MerchantContentFragmentDoc}`;

/**
 * __usePaginatedMerchantListQuery__
 *
 * To run a query within a React component, call `usePaginatedMerchantListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedMerchantListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedMerchantListQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePaginatedMerchantListQuery(baseOptions: Apollo.QueryHookOptions<PaginatedMerchantListQuery, PaginatedMerchantListQueryVariables>) {
        return Apollo.useQuery<PaginatedMerchantListQuery, PaginatedMerchantListQueryVariables>(PaginatedMerchantListDocument, baseOptions);
      }
export function usePaginatedMerchantListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatedMerchantListQuery, PaginatedMerchantListQueryVariables>) {
          return Apollo.useLazyQuery<PaginatedMerchantListQuery, PaginatedMerchantListQueryVariables>(PaginatedMerchantListDocument, baseOptions);
        }
export type PaginatedMerchantListQueryHookResult = ReturnType<typeof usePaginatedMerchantListQuery>;
export type PaginatedMerchantListLazyQueryHookResult = ReturnType<typeof usePaginatedMerchantListLazyQuery>;
export type PaginatedMerchantListQueryResult = Apollo.QueryResult<PaginatedMerchantListQuery, PaginatedMerchantListQueryVariables>;