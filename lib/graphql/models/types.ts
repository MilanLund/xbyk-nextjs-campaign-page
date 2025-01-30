export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  Long: { input: any; output: any; }
  MultiplierPath: { input: any; output: any; }
  TimeSpan: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type DancingGoatBanner = {
  __typename?: 'DancingGoatBanner';
  _system: _System;
  bannerBackgroundImage: _DancingGoatImageCollection;
  bannerHeaderText?: Maybe<Scalars['String']['output']>;
  bannerText?: Maybe<Scalars['String']['output']>;
};


export type DancingGoatBannerBannerBackgroundImageArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<_DancingGoatImageSorter>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<_DancingGoatImageFilter>;
};

export type DancingGoatCampaignPage = {
  __typename?: 'DancingGoatCampaignPage';
  _system: _System;
  banner: _DancingGoatBannerCollection;
};


export type DancingGoatCampaignPageBannerArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<_DancingGoatBannerSorter>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<_DancingGoatBannerFilter>;
};

export type DancingGoatImage = {
  __typename?: 'DancingGoatImage';
  _system: _System;
  imageFile?: Maybe<_ContentItemAsset>;
  imageShortDescription?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  dancingGoatCampaignPage?: Maybe<DancingGoatCampaignPage>;
  dancingGoatCampaignPageCollection: _DancingGoatCampaignPageCollection;
};


export type QueryDancingGoatCampaignPageArgs = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  languageName?: InputMaybe<Scalars['String']['input']>;
  languageVariantId?: InputMaybe<Scalars['UUID']['input']>;
  useLanguageFallbacks?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryDancingGoatCampaignPageCollectionArgs = {
  languageName?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<_DancingGoatCampaignPageSorter>;
  take?: InputMaybe<Scalars['Int']['input']>;
  useLanguageFallbacks?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<_DancingGoatCampaignPageFilter>;
};

export type _Asset = {
  __typename?: '_Asset';
  fileName?: Maybe<Scalars['String']['output']>;
  fileSize: Scalars['Long']['output'];
  fileType?: Maybe<Scalars['String']['output']>;
  height: Scalars['Int']['output'];
  path?: Maybe<Scalars['String']['output']>;
  width: Scalars['Int']['output'];
};

export type _BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type _ContentItemAsset = {
  __typename?: '_ContentItemAsset';
  fileSize: Scalars['Long']['output'];
  fileType?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type _DancingGoatBannerCollection = {
  __typename?: '_DancingGoatBannerCollection';
  items: Array<DancingGoatBanner>;
  /** Specified pagination skip. */
  skip: Scalars['Int']['output'];
  /** Specified pagination take. */
  take: Scalars['Int']['output'];
  /** The number of stored items regardless of the specified pagination. */
  totalCount: Scalars['Int']['output'];
};

export type _DancingGoatBannerFilter = {
  _system?: InputMaybe<_SystemFieldsFilter>;
  bannerHeaderText?: InputMaybe<_TextFilter>;
  bannerText?: InputMaybe<_TextFilter>;
};

export type _DancingGoatBannerSorter = {
  _system?: InputMaybe<_SystemFieldsSorter>;
  bannerHeaderText?: InputMaybe<_Sorter>;
  bannerText?: InputMaybe<_Sorter>;
};

export type _DancingGoatCampaignPageCollection = {
  __typename?: '_DancingGoatCampaignPageCollection';
  items: Array<DancingGoatCampaignPage>;
  /** Specified pagination skip. */
  skip: Scalars['Int']['output'];
  /** Specified pagination take. */
  take: Scalars['Int']['output'];
  /** The number of stored items regardless of the specified pagination. */
  totalCount: Scalars['Int']['output'];
};

export type _DancingGoatCampaignPageFilter = {
  _system?: InputMaybe<_SystemFieldsFilter>;
};

export type _DancingGoatCampaignPageSorter = {
  _system?: InputMaybe<_SystemFieldsSorter>;
};

export type _DancingGoatImageCollection = {
  __typename?: '_DancingGoatImageCollection';
  items: Array<DancingGoatImage>;
  /** Specified pagination skip. */
  skip: Scalars['Int']['output'];
  /** Specified pagination take. */
  take: Scalars['Int']['output'];
  /** The number of stored items regardless of the specified pagination. */
  totalCount: Scalars['Int']['output'];
};

export type _DancingGoatImageFilter = {
  _system?: InputMaybe<_SystemFieldsFilter>;
  imageShortDescription?: InputMaybe<_TextFilter>;
};

export type _DancingGoatImageSorter = {
  _system?: InputMaybe<_SystemFieldsSorter>;
  imageShortDescription?: InputMaybe<_Sorter>;
};

export type _DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

export type _DatetimeFilter = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

export type _DecimalFilter = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
};

export type _DoubleFilter = {
  gt?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
};

export type _GuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type _ISystem = {
  contentType: Scalars['String']['output'];
  firstPublished?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  languageName: Scalars['String']['output'];
  languageVariantId: Scalars['UUID']['output'];
  lastPublished?: Maybe<Scalars['DateTime']['output']>;
};

export type _IntegerFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type _LongintegerFilter = {
  eq?: InputMaybe<Scalars['Long']['input']>;
  gt?: InputMaybe<Scalars['Long']['input']>;
  gte?: InputMaybe<Scalars['Long']['input']>;
  lt?: InputMaybe<Scalars['Long']['input']>;
  lte?: InputMaybe<Scalars['Long']['input']>;
  neq?: InputMaybe<Scalars['Long']['input']>;
};

export type _LongtextFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<Scalars['String']['input']>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type _RichtexthtmlFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<Scalars['String']['input']>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum _Sorter {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type _System = _ISystem & {
  __typename?: '_System';
  contentType: Scalars['String']['output'];
  firstPublished?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  languageName: Scalars['String']['output'];
  languageVariantId: Scalars['UUID']['output'];
  lastPublished?: Maybe<Scalars['DateTime']['output']>;
};

export type _SystemFieldsFilter = {
  firstPublished?: InputMaybe<_DatetimeFilter>;
  id?: InputMaybe<_GuidFilter>;
  languageVariantId?: InputMaybe<_GuidFilter>;
  lastPublished?: InputMaybe<_DatetimeFilter>;
};

export type _SystemFieldsSorter = {
  firstPublished?: InputMaybe<_Sorter>;
  lastPublished?: InputMaybe<_Sorter>;
};

export type _Tag = {
  __typename?: '_Tag';
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type _TaxonomyFilter = {
  containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type _TextFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<Scalars['String']['input']>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type _TimespanFilter = {
  eq?: InputMaybe<Scalars['TimeSpan']['input']>;
  gt?: InputMaybe<Scalars['TimeSpan']['input']>;
  gte?: InputMaybe<Scalars['TimeSpan']['input']>;
  lt?: InputMaybe<Scalars['TimeSpan']['input']>;
  lte?: InputMaybe<Scalars['TimeSpan']['input']>;
  neq?: InputMaybe<Scalars['TimeSpan']['input']>;
};

export type _WebPage = {
  __typename?: '_WebPage';
  url?: Maybe<Scalars['String']['output']>;
};

export type _WebPageSystem = _ISystem & {
  __typename?: '_WebPageSystem';
  contentType: Scalars['String']['output'];
  firstPublished?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  languageName: Scalars['String']['output'];
  languageVariantId: Scalars['UUID']['output'];
  lastPublished?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type CampaignPageQueryVariables = Exact<{ [key: string]: never; }>;


export type CampaignPageQuery = { __typename?: 'Query', dancingGoatCampaignPage?: { __typename?: 'DancingGoatCampaignPage', banner: { __typename?: '_DancingGoatBannerCollection', items: Array<{ __typename?: 'DancingGoatBanner', bannerHeaderText?: string | null, bannerText?: string | null, bannerBackgroundImage: { __typename?: '_DancingGoatImageCollection', skip: number, take: number, totalCount: number, items: Array<{ __typename?: 'DancingGoatImage', imageShortDescription?: string | null, imageFile?: { __typename?: '_ContentItemAsset', fileSize: any, fileType?: string | null, height?: number | null, name?: string | null, path?: string | null, width?: number | null } | null, _system: { __typename?: '_System', contentType: string, firstPublished?: any | null, id: any, languageName: string, languageVariantId: any, lastPublished?: any | null } }> }, _system: { __typename?: '_System', id: any, lastPublished?: any | null, contentType: string, firstPublished?: any | null, languageName: string, languageVariantId: any } }> } } | null };
