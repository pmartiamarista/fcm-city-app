import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  JSON: { input: any; output: any };
};

export type City = {
  __typename?: 'City';
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  language: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nativeName: Scalars['String']['output'];
};

export type CityFilter = {
  currency?: InputMaybe<Scalars['String']['input']>;
  currency_gt?: InputMaybe<Scalars['String']['input']>;
  currency_gte?: InputMaybe<Scalars['String']['input']>;
  currency_lt?: InputMaybe<Scalars['String']['input']>;
  currency_lte?: InputMaybe<Scalars['String']['input']>;
  currency_neq?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_neq?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  key?: InputMaybe<Scalars['String']['input']>;
  key_gt?: InputMaybe<Scalars['String']['input']>;
  key_gte?: InputMaybe<Scalars['String']['input']>;
  key_lt?: InputMaybe<Scalars['String']['input']>;
  key_lte?: InputMaybe<Scalars['String']['input']>;
  key_neq?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  language_gt?: InputMaybe<Scalars['String']['input']>;
  language_gte?: InputMaybe<Scalars['String']['input']>;
  language_lt?: InputMaybe<Scalars['String']['input']>;
  language_lte?: InputMaybe<Scalars['String']['input']>;
  language_neq?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_neq?: InputMaybe<Scalars['String']['input']>;
  nativeName?: InputMaybe<Scalars['String']['input']>;
  nativeName_gt?: InputMaybe<Scalars['String']['input']>;
  nativeName_gte?: InputMaybe<Scalars['String']['input']>;
  nativeName_lt?: InputMaybe<Scalars['String']['input']>;
  nativeName_lte?: InputMaybe<Scalars['String']['input']>;
  nativeName_neq?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};

export type CityInput = {
  currency: Scalars['String']['input'];
  key: Scalars['String']['input'];
  language: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nativeName: Scalars['String']['input'];
};

export type ListMetadata = {
  __typename?: 'ListMetadata';
  count?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCity?: Maybe<City>;
  createManyCity?: Maybe<Array<Maybe<City>>>;
  createManyPlace?: Maybe<Array<Maybe<Place>>>;
  createPlace?: Maybe<Place>;
  removeCity?: Maybe<City>;
  removePlace?: Maybe<Place>;
  updateCity?: Maybe<City>;
  updatePlace?: Maybe<Place>;
};

export type MutationCreateCityArgs = {
  currency: Scalars['String']['input'];
  key: Scalars['String']['input'];
  language: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nativeName: Scalars['String']['input'];
};

export type MutationCreateManyCityArgs = {
  data?: InputMaybe<Array<InputMaybe<CityInput>>>;
};

export type MutationCreateManyPlaceArgs = {
  data?: InputMaybe<Array<InputMaybe<PlaceInput>>>;
};

export type MutationCreatePlaceArgs = {
  key: Scalars['String']['input'];
  place: Scalars['JSON']['input'];
};

export type MutationRemoveCityArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemovePlaceArgs = {
  id: Scalars['ID']['input'];
};

export type MutationUpdateCityArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  key?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nativeName?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdatePlaceArgs = {
  key?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['JSON']['input']>;
};

export type Place = {
  __typename?: 'Place';
  key: Scalars['String']['output'];
  place: Scalars['JSON']['output'];
};

export type PlaceFilter = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  key?: InputMaybe<Scalars['String']['input']>;
  key_gt?: InputMaybe<Scalars['String']['input']>;
  key_gte?: InputMaybe<Scalars['String']['input']>;
  key_lt?: InputMaybe<Scalars['String']['input']>;
  key_lte?: InputMaybe<Scalars['String']['input']>;
  key_neq?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['JSON']['input']>;
  place_neq?: InputMaybe<Scalars['JSON']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};

export type PlaceInput = {
  key: Scalars['String']['input'];
  place: Scalars['JSON']['input'];
};

export type Query = {
  __typename?: 'Query';
  City?: Maybe<City>;
  Place?: Maybe<Place>;
  _allCitiesMeta?: Maybe<ListMetadata>;
  _allPlacesMeta?: Maybe<ListMetadata>;
  allCities?: Maybe<Array<Maybe<City>>>;
  allPlaces?: Maybe<Array<Maybe<Place>>>;
};

export type QueryCityArgs = {
  id: Scalars['ID']['input'];
};

export type QueryPlaceArgs = {
  id: Scalars['ID']['input'];
};

export type Query_AllCitiesMetaArgs = {
  filter?: InputMaybe<CityFilter>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};

export type Query_AllPlacesMetaArgs = {
  filter?: InputMaybe<PlaceFilter>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryAllCitiesArgs = {
  filter?: InputMaybe<CityFilter>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};

export type QueryAllPlacesArgs = {
  filter?: InputMaybe<PlaceFilter>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};

export type GetCitiesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCitiesQuery = {
  __typename?: 'Query';
  allCities?: Array<{
    __typename?: 'City';
    id: string;
    key: string;
    name: string;
    nativeName: string;
  } | null> | null;
};

export type GetCityQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCityQuery = {
  __typename?: 'Query';
  City?: {
    __typename?: 'City';
    id: string;
    key: string;
    name: string;
    nativeName: string;
    currency: string;
    language: string;
  } | null;
};

export const GetCitiesDocument = gql`
  query GetCities {
    allCities {
      id
      key
      name
      nativeName
    }
  }
`;
export const GetCityDocument = gql`
  query getCity($id: ID!) {
    City(id: $id) {
      id
      key
      name
      nativeName
      currency
      language
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetCities(
      variables?: GetCitiesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetCitiesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCitiesQuery>({
            document: GetCitiesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetCities',
        'query',
        variables,
      );
    },
    getCity(
      variables: GetCityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetCityQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCityQuery>({
            document: GetCityDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'getCity',
        'query',
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
