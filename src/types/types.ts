export type ErrorMessage = {
  error: boolean;
  message: string;
};

export interface ErrorStates {
  inn: ErrorMessage;
  documentNumber: ErrorMessage;
  dates: ErrorMessage;
}

export interface BurgerMenuInterface {
  isOpen: boolean;
}

export type ProtectedRouteProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  children: React.ReactNode;
};

export type UserData = {
  companyLimit: number;
  usedCompanyCount: number;
};

export type UserState = {
  isAuthorized: boolean;
  isLoggingIn: boolean;
  isLoading: boolean;
  isFirstLoad: boolean;
  userInfo: UserData;
  loginServerError: string;
};

export type IDsList = {
  ids: string[];
};

export type IDItem = {
  encodedId: string;
  influence: number;
  similarCount: number;
};

export type FormattedData = {
  date: string;
  documentsCount: number;
  riskCount: number;
};

export type ItemData = {
  date: string;
  value: number;
};

export type HistogramData = {
  data: ItemData[];
  histogramType: string;
};

export type OverviewData = {
  date: string;
  documentsCount: number;
  riskCount: number;
};

export type DataState = {
  overviewData: OverviewData[];
  overviewIsLoading: boolean;
  idsAreLoading: boolean;
  articlesAreLoading: boolean;
  ids: string[];
  articles: any[];
};

export type DateInterval = {
  startDate: string;
  endDate: string;
};

export type RiskFactors = {
  and: any[];
  or: any[];
  not: any[];
};

export type Themes = {
  and: any[];
  or: any[];
  not: any[];
};

export interface TargetSearchEntity {
  type: string;
  sparkId: null | number | string;
  entityId: null | number | string;
  inn: string;
  maxFullness: boolean;
  inBusinessNews: boolean;
}

export interface TargetSearchEntitiesContext {
  targetSearchEntities: TargetSearchEntity[];
  onlyMainRole: boolean;
  tonality: string;
  onlyWithRiskFactors: boolean;
  riskFactors: RiskFactors;
  themes: Themes;
}

export type ThemesFilter = {
  and: any[];
  or: any[];
  not: any[];
};

export type AttributeFilters = {
  excludeTechNews: boolean;
  excludeAnnouncements: boolean;
  excludeDigests: boolean;
};

export type SearchArea = {
  includedSources: any[];
  excludedSources: any[];
  includedSourceGroups: any[];
  excludedSourceGroups: any[];
};

export interface SearchContext {
  targetSearchEntitiesContext: TargetSearchEntitiesContext;
  themesFilter: ThemesFilter;
}

export type SearchData = {
  issueDateInterval: DateInterval;
  searchContext: SearchContext;
  searchArea: SearchArea;
  attributeFilters: AttributeFilters;
  similarMode: string;
  limit: number;
  sortType: string;
  sortDirectionType: string;
  intervalType: string;
  histogramTypes: string[];
};

export type ArticleProps = {
  data: {
    attributes: {
      wordCount: number;
      isDigest: boolean;
      isTechNews: boolean;
      isAnnouncement: boolean;
    };
    date: string;
    source: string;
    text: string;
    title: string;
    url: string;
  };
};
