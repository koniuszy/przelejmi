import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  cursor?: InputMaybe<ScenarioWhereUniqueInput>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type ClientCreateInput = {
  Scenario?: InputMaybe<ScenarioCreateNestedManyWithoutClientInput>;
  VATId?: InputMaybe<Scalars['String']>;
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  name: Scalars['String'];
  postCode: Scalars['String'];
};

export type ClientCreateNestedOneWithoutScenarioInput = {
  connect?: InputMaybe<ClientWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ClientCreateOrConnectWithoutScenarioInput>;
  create?: InputMaybe<ClientCreateWithoutScenarioInput>;
};

export type ClientCreateOrConnectWithoutScenarioInput = {
  create: ClientCreateWithoutScenarioInput;
  where: ClientWhereUniqueInput;
};

export type ClientCreateWithoutScenarioInput = {
  VATId?: InputMaybe<Scalars['String']>;
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  name: Scalars['String'];
  postCode: Scalars['String'];
};

export type ClientList = {
  __typename?: 'ClientList';
  list: Array<Client>;
  totalCount: Scalars['Int'];
};

export type ClientOrderByInput = {
  VATId?: InputMaybe<SortOrder>;
  address?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  country?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  postCode?: InputMaybe<SortOrder>;
};

export type ClientUpdateInput = {
  Scenario?: InputMaybe<ScenarioUpdateManyWithoutClientInput>;
  VATId?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  postCode?: InputMaybe<Scalars['String']>;
};

export type ClientUpdateOneRequiredWithoutScenarioInput = {
  connect?: InputMaybe<ClientWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ClientCreateOrConnectWithoutScenarioInput>;
  create?: InputMaybe<ClientCreateWithoutScenarioInput>;
  update?: InputMaybe<ClientUpdateWithoutScenarioInput>;
  upsert?: InputMaybe<ClientUpsertWithoutScenarioInput>;
};

export type ClientUpdateWithoutScenarioInput = {
  VATId?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  postCode?: InputMaybe<Scalars['String']>;
};

export type ClientUpsertWithoutScenarioInput = {
  create: ClientCreateWithoutScenarioInput;
  update: ClientUpdateWithoutScenarioInput;
};

export type ClientWhereInput = {
  AND: Array<ClientWhereInput>;
  NOT: Array<ClientWhereInput>;
  OR: Array<ClientWhereInput>;
  Scenario?: InputMaybe<ScenarioListRelationFilter>;
  VATId?: InputMaybe<StringNullableFilter>;
  address?: InputMaybe<StringFilter>;
  city?: InputMaybe<StringFilter>;
  country?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  postCode?: InputMaybe<StringFilter>;
};

export type ClientWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export enum Currency {
  Eur = 'EUR',
  Nok = 'NOK',
  Pln = 'PLN',
  Usd = 'USD'
}

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in: Array<Scalars['DateTime']>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn: Array<Scalars['DateTime']>;
};

export type EnumCurrencyFilter = {
  equals?: InputMaybe<Currency>;
  in: Array<Currency>;
  not?: InputMaybe<NestedEnumCurrencyFilter>;
  notIn: Array<Currency>;
};

export type EnumPaymentTypeFilter = {
  equals?: InputMaybe<PaymentType>;
  in: Array<PaymentType>;
  not?: InputMaybe<NestedEnumPaymentTypeFilter>;
  notIn: Array<PaymentType>;
};

export type EnumUnitFilter = {
  equals?: InputMaybe<Unit>;
  in: Array<Unit>;
  not?: InputMaybe<NestedEnumUnitFilter>;
  notIn: Array<Unit>;
};

export type EnumVatFilter = {
  equals?: InputMaybe<Vat>;
  in: Array<Vat>;
  not?: InputMaybe<NestedEnumVatFilter>;
  notIn: Array<Vat>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in: Array<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn: Array<Scalars['Int']>;
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
  cursor?: InputMaybe<ScenarioWhereUniqueInput>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type MerchantCreateInput = {
  Scenario?: InputMaybe<ScenarioCreateNestedManyWithoutMerchantInput>;
  VATId: Scalars['String'];
  address: Scalars['String'];
  bankAccountEur?: InputMaybe<Scalars['String']>;
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
  connect?: InputMaybe<MerchantWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MerchantCreateOrConnectWithoutScenarioInput>;
  create?: InputMaybe<MerchantCreateWithoutScenarioInput>;
};

export type MerchantCreateOrConnectWithoutScenarioInput = {
  create: MerchantCreateWithoutScenarioInput;
  where: MerchantWhereUniqueInput;
};

export type MerchantCreateWithoutScenarioInput = {
  VATId: Scalars['String'];
  address: Scalars['String'];
  bankAccountEur?: InputMaybe<Scalars['String']>;
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
  VATId?: InputMaybe<SortOrder>;
  address?: InputMaybe<SortOrder>;
  bankAccountEur?: InputMaybe<SortOrder>;
  bankAccountPln?: InputMaybe<SortOrder>;
  bankName?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  companyName?: InputMaybe<SortOrder>;
  country?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issuerName?: InputMaybe<SortOrder>;
  postCode?: InputMaybe<SortOrder>;
};

export type MerchantUpdateInput = {
  Scenario?: InputMaybe<ScenarioUpdateManyWithoutMerchantInput>;
  VATId?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  bankAccountEur?: InputMaybe<Scalars['String']>;
  bankAccountPln?: InputMaybe<Scalars['String']>;
  bankName?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  issuerName?: InputMaybe<Scalars['String']>;
  postCode?: InputMaybe<Scalars['String']>;
};

export type MerchantUpdateOneRequiredWithoutScenarioInput = {
  connect?: InputMaybe<MerchantWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MerchantCreateOrConnectWithoutScenarioInput>;
  create?: InputMaybe<MerchantCreateWithoutScenarioInput>;
  update?: InputMaybe<MerchantUpdateWithoutScenarioInput>;
  upsert?: InputMaybe<MerchantUpsertWithoutScenarioInput>;
};

export type MerchantUpdateWithoutScenarioInput = {
  VATId?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  bankAccountEur?: InputMaybe<Scalars['String']>;
  bankAccountPln?: InputMaybe<Scalars['String']>;
  bankName?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  issuerName?: InputMaybe<Scalars['String']>;
  postCode?: InputMaybe<Scalars['String']>;
};

export type MerchantUpsertWithoutScenarioInput = {
  create: MerchantCreateWithoutScenarioInput;
  update: MerchantUpdateWithoutScenarioInput;
};

export type MerchantWhereInput = {
  AND: Array<MerchantWhereInput>;
  NOT: Array<MerchantWhereInput>;
  OR: Array<MerchantWhereInput>;
  Scenario?: InputMaybe<ScenarioListRelationFilter>;
  VATId?: InputMaybe<StringFilter>;
  address?: InputMaybe<StringFilter>;
  bankAccountEur?: InputMaybe<StringNullableFilter>;
  bankAccountPln?: InputMaybe<StringFilter>;
  bankName?: InputMaybe<StringFilter>;
  city?: InputMaybe<StringFilter>;
  companyName?: InputMaybe<StringFilter>;
  country?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  issuerName?: InputMaybe<StringFilter>;
  postCode?: InputMaybe<StringFilter>;
};

export type MerchantWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
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
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in: Array<Scalars['DateTime']>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn: Array<Scalars['DateTime']>;
};

export type NestedEnumCurrencyFilter = {
  equals?: InputMaybe<Currency>;
  in: Array<Currency>;
  not?: InputMaybe<NestedEnumCurrencyFilter>;
  notIn: Array<Currency>;
};

export type NestedEnumPaymentTypeFilter = {
  equals?: InputMaybe<PaymentType>;
  in: Array<PaymentType>;
  not?: InputMaybe<NestedEnumPaymentTypeFilter>;
  notIn: Array<PaymentType>;
};

export type NestedEnumUnitFilter = {
  equals?: InputMaybe<Unit>;
  in: Array<Unit>;
  not?: InputMaybe<NestedEnumUnitFilter>;
  notIn: Array<Unit>;
};

export type NestedEnumVatFilter = {
  equals?: InputMaybe<Vat>;
  in: Array<Vat>;
  not?: InputMaybe<NestedEnumVatFilter>;
  notIn: Array<Vat>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in: Array<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn: Array<Scalars['Int']>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in: Array<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn: Array<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in: Array<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn: Array<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type PaginatedClientList = {
  __typename?: 'PaginatedClientList';
  filters: PaginatedClientListFilters;
  list: Array<Client>;
  totalCount: Scalars['Int'];
};

export type PaginatedClientListFilters = {
  __typename?: 'PaginatedClientListFilters';
  city: Array<Scalars['String']>;
  country: Array<Scalars['String']>;
};

export type PaginatedMerchantListFilters = {
  __typename?: 'PaginatedMerchantListFilters';
  bank: Array<Scalars['String']>;
  city: Array<Scalars['String']>;
  country: Array<Scalars['String']>;
};

export enum PaymentType {
  Cash = 'CASH',
  Transfer = 'TRANSFER'
}

export type Query = {
  __typename?: 'Query';
  client?: Maybe<Client>;
  clientList: ClientList;
  clients: Array<Client>;
  merchant?: Maybe<Merchant>;
  merchants: Array<Merchant>;
  merchantsFilters: PaginatedMerchantListFilters;
  paginatedClientList: PaginatedClientList;
  scenario?: Maybe<Scenario>;
  scenarios: Array<Scenario>;
  totalMerchantsCount: Scalars['Int'];
};


export type QueryClientArgs = {
  where: ClientWhereUniqueInput;
};


export type QueryClientsArgs = {
  cursor?: InputMaybe<ClientWhereUniqueInput>;
  orderBy: Array<ClientOrderByInput>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
  where?: InputMaybe<ClientWhereInput>;
};


export type QueryMerchantArgs = {
  where: MerchantWhereUniqueInput;
};


export type QueryMerchantsArgs = {
  cursor?: InputMaybe<MerchantWhereUniqueInput>;
  orderBy: Array<MerchantOrderByInput>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
  where?: InputMaybe<MerchantWhereInput>;
};


export type QueryPaginatedClientListArgs = {
  orderBy?: InputMaybe<Array<ClientOrderByInput>>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
  where?: InputMaybe<ClientWhereInput>;
};


export type QueryScenarioArgs = {
  where: ScenarioWhereUniqueInput;
};


export type QueryScenariosArgs = {
  cursor?: InputMaybe<ScenarioWhereUniqueInput>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Scenario = {
  __typename?: 'Scenario';
  VAT: Vat;
  client: Client;
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  currency: Currency;
  dueDateDays: Scalars['Int'];
  id: Scalars['Int'];
  imgUrl: Scalars['String'];
  merchant: Merchant;
  merchantId: Scalars['Int'];
  name: Scalars['String'];
  netPerOne: Scalars['Int'];
  notes: Scalars['String'];
  paymentType: PaymentType;
  unitType: Unit;
  updatedAt: Scalars['DateTime'];
};

export type ScenarioCreateInput = {
  VAT: Vat;
  client: ClientCreateNestedOneWithoutScenarioInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency: Currency;
  dueDateDays: Scalars['Int'];
  imgUrl: Scalars['String'];
  merchant: MerchantCreateNestedOneWithoutScenarioInput;
  name: Scalars['String'];
  netPerOne: Scalars['Int'];
  notes: Scalars['String'];
  paymentType: PaymentType;
  unitType: Unit;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScenarioCreateManyClientInput = {
  VAT: Vat;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency: Currency;
  dueDateDays: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  imgUrl: Scalars['String'];
  merchantId: Scalars['Int'];
  name: Scalars['String'];
  netPerOne: Scalars['Int'];
  notes: Scalars['String'];
  paymentType: PaymentType;
  unitType: Unit;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScenarioCreateManyClientInputEnvelope = {
  data: Array<ScenarioCreateManyClientInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ScenarioCreateManyMerchantInput = {
  VAT: Vat;
  clientId: Scalars['Int'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency: Currency;
  dueDateDays: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  imgUrl: Scalars['String'];
  name: Scalars['String'];
  netPerOne: Scalars['Int'];
  notes: Scalars['String'];
  paymentType: PaymentType;
  unitType: Unit;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScenarioCreateManyMerchantInputEnvelope = {
  data: Array<ScenarioCreateManyMerchantInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ScenarioCreateNestedManyWithoutClientInput = {
  connect: Array<ScenarioWhereUniqueInput>;
  connectOrCreate: Array<ScenarioCreateOrConnectWithoutClientInput>;
  create: Array<ScenarioCreateWithoutClientInput>;
  createMany?: InputMaybe<ScenarioCreateManyClientInputEnvelope>;
};

export type ScenarioCreateNestedManyWithoutMerchantInput = {
  connect: Array<ScenarioWhereUniqueInput>;
  connectOrCreate: Array<ScenarioCreateOrConnectWithoutMerchantInput>;
  create: Array<ScenarioCreateWithoutMerchantInput>;
  createMany?: InputMaybe<ScenarioCreateManyMerchantInputEnvelope>;
};

export type ScenarioCreateOrConnectWithoutClientInput = {
  create: ScenarioCreateWithoutClientInput;
  where: ScenarioWhereUniqueInput;
};

export type ScenarioCreateOrConnectWithoutMerchantInput = {
  create: ScenarioCreateWithoutMerchantInput;
  where: ScenarioWhereUniqueInput;
};

export type ScenarioCreateWithoutClientInput = {
  VAT: Vat;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency: Currency;
  dueDateDays: Scalars['Int'];
  imgUrl: Scalars['String'];
  merchant: MerchantCreateNestedOneWithoutScenarioInput;
  name: Scalars['String'];
  netPerOne: Scalars['Int'];
  notes: Scalars['String'];
  paymentType: PaymentType;
  unitType: Unit;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScenarioCreateWithoutMerchantInput = {
  VAT: Vat;
  client: ClientCreateNestedOneWithoutScenarioInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency: Currency;
  dueDateDays: Scalars['Int'];
  imgUrl: Scalars['String'];
  name: Scalars['String'];
  netPerOne: Scalars['Int'];
  notes: Scalars['String'];
  paymentType: PaymentType;
  unitType: Unit;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScenarioListRelationFilter = {
  every?: InputMaybe<ScenarioWhereInput>;
  none?: InputMaybe<ScenarioWhereInput>;
  some?: InputMaybe<ScenarioWhereInput>;
};

export type ScenarioScalarWhereInput = {
  AND: Array<ScenarioScalarWhereInput>;
  NOT: Array<ScenarioScalarWhereInput>;
  OR: Array<ScenarioScalarWhereInput>;
  VAT?: InputMaybe<EnumVatFilter>;
  clientId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  currency?: InputMaybe<EnumCurrencyFilter>;
  dueDateDays?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  imgUrl?: InputMaybe<StringFilter>;
  merchantId?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  netPerOne?: InputMaybe<IntFilter>;
  notes?: InputMaybe<StringFilter>;
  paymentType?: InputMaybe<EnumPaymentTypeFilter>;
  unitType?: InputMaybe<EnumUnitFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ScenarioUpdateInput = {
  VAT?: InputMaybe<Vat>;
  client?: InputMaybe<ClientUpdateOneRequiredWithoutScenarioInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency?: InputMaybe<Currency>;
  dueDateDays?: InputMaybe<Scalars['Int']>;
  imgUrl?: InputMaybe<Scalars['String']>;
  merchant?: InputMaybe<MerchantUpdateOneRequiredWithoutScenarioInput>;
  name?: InputMaybe<Scalars['String']>;
  netPerOne?: InputMaybe<Scalars['Int']>;
  notes?: InputMaybe<Scalars['String']>;
  paymentType?: InputMaybe<PaymentType>;
  unitType?: InputMaybe<Unit>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScenarioUpdateManyMutationInput = {
  VAT?: InputMaybe<Vat>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency?: InputMaybe<Currency>;
  dueDateDays?: InputMaybe<Scalars['Int']>;
  imgUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  netPerOne?: InputMaybe<Scalars['Int']>;
  notes?: InputMaybe<Scalars['String']>;
  paymentType?: InputMaybe<PaymentType>;
  unitType?: InputMaybe<Unit>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
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
  connect: Array<ScenarioWhereUniqueInput>;
  connectOrCreate: Array<ScenarioCreateOrConnectWithoutClientInput>;
  create: Array<ScenarioCreateWithoutClientInput>;
  createMany?: InputMaybe<ScenarioCreateManyClientInputEnvelope>;
  delete: Array<ScenarioWhereUniqueInput>;
  deleteMany: Array<ScenarioScalarWhereInput>;
  disconnect: Array<ScenarioWhereUniqueInput>;
  set: Array<ScenarioWhereUniqueInput>;
  update: Array<ScenarioUpdateWithWhereUniqueWithoutClientInput>;
  updateMany: Array<ScenarioUpdateManyWithWhereWithoutClientInput>;
  upsert: Array<ScenarioUpsertWithWhereUniqueWithoutClientInput>;
};

export type ScenarioUpdateManyWithoutMerchantInput = {
  connect: Array<ScenarioWhereUniqueInput>;
  connectOrCreate: Array<ScenarioCreateOrConnectWithoutMerchantInput>;
  create: Array<ScenarioCreateWithoutMerchantInput>;
  createMany?: InputMaybe<ScenarioCreateManyMerchantInputEnvelope>;
  delete: Array<ScenarioWhereUniqueInput>;
  deleteMany: Array<ScenarioScalarWhereInput>;
  disconnect: Array<ScenarioWhereUniqueInput>;
  set: Array<ScenarioWhereUniqueInput>;
  update: Array<ScenarioUpdateWithWhereUniqueWithoutMerchantInput>;
  updateMany: Array<ScenarioUpdateManyWithWhereWithoutMerchantInput>;
  upsert: Array<ScenarioUpsertWithWhereUniqueWithoutMerchantInput>;
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
  VAT?: InputMaybe<Vat>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency?: InputMaybe<Currency>;
  dueDateDays?: InputMaybe<Scalars['Int']>;
  imgUrl?: InputMaybe<Scalars['String']>;
  merchant?: InputMaybe<MerchantUpdateOneRequiredWithoutScenarioInput>;
  name?: InputMaybe<Scalars['String']>;
  netPerOne?: InputMaybe<Scalars['Int']>;
  notes?: InputMaybe<Scalars['String']>;
  paymentType?: InputMaybe<PaymentType>;
  unitType?: InputMaybe<Unit>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScenarioUpdateWithoutMerchantInput = {
  VAT?: InputMaybe<Vat>;
  client?: InputMaybe<ClientUpdateOneRequiredWithoutScenarioInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency?: InputMaybe<Currency>;
  dueDateDays?: InputMaybe<Scalars['Int']>;
  imgUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  netPerOne?: InputMaybe<Scalars['Int']>;
  notes?: InputMaybe<Scalars['String']>;
  paymentType?: InputMaybe<PaymentType>;
  unitType?: InputMaybe<Unit>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
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
  AND: Array<ScenarioWhereInput>;
  NOT: Array<ScenarioWhereInput>;
  OR: Array<ScenarioWhereInput>;
  VAT?: InputMaybe<EnumVatFilter>;
  client?: InputMaybe<ClientWhereInput>;
  clientId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  currency?: InputMaybe<EnumCurrencyFilter>;
  dueDateDays?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  imgUrl?: InputMaybe<StringFilter>;
  merchant?: InputMaybe<MerchantWhereInput>;
  merchantId?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  netPerOne?: InputMaybe<IntFilter>;
  notes?: InputMaybe<StringFilter>;
  paymentType?: InputMaybe<EnumPaymentTypeFilter>;
  unitType?: InputMaybe<EnumUnitFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ScenarioWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in: Array<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn: Array<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in: Array<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn: Array<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export enum Unit {
  Hour = 'HOUR',
  Item = 'ITEM'
}

export enum Vat {
  DoesNotConcern = 'DOES_NOT_CONCERN',
  Freed = 'FREED',
  Percent_0 = 'PERCENT_0',
  Percent_8 = 'PERCENT_8',
  Percent_23 = 'PERCENT_23'
}

export type MerchantContentFragment = { __typename?: 'Merchant', id: number, companyName: string, address: string, postCode: string, city: string, country: string, VATId: string, bankAccountPln: string, bankAccountEur?: string | null | undefined, bankName: string, email: string, issuerName: string };

export type CreateMerchantMutationVariables = Exact<{
  data: MerchantCreateInput;
}>;


export type CreateMerchantMutation = { __typename?: 'Mutation', createdMerchant: { __typename?: 'Merchant', id: number } };

export type DeleteMerchantMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMerchantMutation = { __typename?: 'Mutation', deletedMerchant?: { __typename?: 'Merchant', id: number } | null | undefined };

export type UpdateMerchantMutationVariables = Exact<{
  data: MerchantUpdateInput;
  id: Scalars['Int'];
}>;


export type UpdateMerchantMutation = { __typename?: 'Mutation', updatedMerchant?: { __typename?: 'Merchant', id: number, companyName: string, address: string, postCode: string, city: string, country: string, VATId: string, bankAccountPln: string, bankAccountEur?: string | null | undefined, bankName: string, email: string, issuerName: string } | null | undefined };

export type MerchantQueryVariables = Exact<{
  where: MerchantWhereUniqueInput;
}>;


export type MerchantQuery = { __typename?: 'Query', merchant?: { __typename?: 'Merchant', id: number, companyName: string, address: string, postCode: string, city: string, country: string, VATId: string, bankAccountPln: string, bankAccountEur?: string | null | undefined, bankName: string, email: string, issuerName: string } | null | undefined };

export type MerchantListQueryVariables = Exact<{
  orderBy?: Maybe<Array<MerchantOrderByInput> | MerchantOrderByInput>;
  where?: Maybe<MerchantWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type MerchantListQuery = { __typename?: 'Query', totalCount: number, merchantList: Array<{ __typename?: 'Merchant', id: number, companyName: string, address: string, postCode: string, city: string, country: string, VATId: string, bankAccountPln: string, bankAccountEur?: string | null | undefined, bankName: string, email: string, issuerName: string }> };

export type PaginatedMerchantListQueryVariables = Exact<{
  orderBy?: Maybe<Array<MerchantOrderByInput> | MerchantOrderByInput>;
  where?: Maybe<MerchantWhereInput>;
  skip: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
}>;


export type PaginatedMerchantListQuery = { __typename?: 'Query', totalCount: number, filters: { __typename?: 'PaginatedMerchantListFilters', country: Array<string>, city: Array<string>, bank: Array<string> }, merchantList: Array<{ __typename?: 'Merchant', id: number, companyName: string, address: string, postCode: string, city: string, country: string, VATId: string, bankAccountPln: string, bankAccountEur?: string | null | undefined, bankName: string, email: string, issuerName: string }> };

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
export const CreateMerchantDocument = gql`
    mutation createMerchant($data: MerchantCreateInput!) {
  createdMerchant: createOneMerchant(data: $data) {
    id
  }
}
    `;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMerchantMutation, CreateMerchantMutationVariables>(CreateMerchantDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMerchantMutation, DeleteMerchantMutationVariables>(DeleteMerchantDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMerchantMutation, UpdateMerchantMutationVariables>(UpdateMerchantDocument, options);
      }
export type UpdateMerchantMutationHookResult = ReturnType<typeof useUpdateMerchantMutation>;
export type UpdateMerchantMutationResult = Apollo.MutationResult<UpdateMerchantMutation>;
export type UpdateMerchantMutationOptions = Apollo.BaseMutationOptions<UpdateMerchantMutation, UpdateMerchantMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MerchantQuery, MerchantQueryVariables>(MerchantDocument, options);
      }
export function useMerchantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MerchantQuery, MerchantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MerchantQuery, MerchantQueryVariables>(MerchantDocument, options);
        }
export type MerchantQueryHookResult = ReturnType<typeof useMerchantQuery>;
export type MerchantLazyQueryHookResult = ReturnType<typeof useMerchantLazyQuery>;
export type MerchantQueryResult = Apollo.QueryResult<MerchantQuery, MerchantQueryVariables>;
export const MerchantListDocument = gql`
    query merchantList($orderBy: [MerchantOrderByInput!] = [], $where: MerchantWhereInput, $skip: Int = 0, $take: Int = 100) {
  merchantList: merchants(
    orderBy: $orderBy
    where: $where
    skip: $skip
    take: $take
  ) {
    ...MerchantContent
  }
  totalCount: totalMerchantsCount
}
    ${MerchantContentFragmentDoc}`;

/**
 * __useMerchantListQuery__
 *
 * To run a query within a React component, call `useMerchantListQuery` and pass it any options that fit your needs.
 * When your component renders, `useMerchantListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMerchantListQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useMerchantListQuery(baseOptions?: Apollo.QueryHookOptions<MerchantListQuery, MerchantListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MerchantListQuery, MerchantListQueryVariables>(MerchantListDocument, options);
      }
export function useMerchantListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MerchantListQuery, MerchantListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MerchantListQuery, MerchantListQueryVariables>(MerchantListDocument, options);
        }
export type MerchantListQueryHookResult = ReturnType<typeof useMerchantListQuery>;
export type MerchantListLazyQueryHookResult = ReturnType<typeof useMerchantListLazyQuery>;
export type MerchantListQueryResult = Apollo.QueryResult<MerchantListQuery, MerchantListQueryVariables>;
export const PaginatedMerchantListDocument = gql`
    query paginatedMerchantList($orderBy: [MerchantOrderByInput!] = [], $where: MerchantWhereInput, $skip: Int!, $take: Int = 20) {
  totalCount: totalMerchantsCount
  filters: merchantsFilters {
    country
    city
    bank
  }
  merchantList: merchants(
    orderBy: $orderBy
    where: $where
    skip: $skip
    take: $take
  ) {
    ...MerchantContent
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginatedMerchantListQuery, PaginatedMerchantListQueryVariables>(PaginatedMerchantListDocument, options);
      }
export function usePaginatedMerchantListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatedMerchantListQuery, PaginatedMerchantListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginatedMerchantListQuery, PaginatedMerchantListQueryVariables>(PaginatedMerchantListDocument, options);
        }
export type PaginatedMerchantListQueryHookResult = ReturnType<typeof usePaginatedMerchantListQuery>;
export type PaginatedMerchantListLazyQueryHookResult = ReturnType<typeof usePaginatedMerchantListLazyQuery>;
export type PaginatedMerchantListQueryResult = Apollo.QueryResult<PaginatedMerchantListQuery, PaginatedMerchantListQueryVariables>;