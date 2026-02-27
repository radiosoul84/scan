import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../helpers/config";
import { SearchData } from "../types/types";
import { getAccessToken } from "../helpers/utils";
import {
  IDsList,
  IDItem,
  FormattedData,
  HistogramData,
  ItemData,
  DataState,
} from "../types/types";

const initialState: DataState = {
  overviewData: [],
  overviewIsLoading: false,
  idsAreLoading: false,
  articlesAreLoading: false,
  ids: [],
  articles: [],
};

export const fetchOverviewData = createAsyncThunk(
  "data/fetchOverviewData",
  async (data: SearchData, { rejectWithValue }) => {
    try {
      const accessToken = getAccessToken();
      if (accessToken === null) {
        return rejectWithValue("Нет токена");
      }
      const response = await fetch(
        `${BASE_URL}/api/v1/objectsearch/histograms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const serverError = await response.json();
        return rejectWithValue(serverError.message);
      }

      const result = await response.json();
      const formattedData: FormattedData[] = [];
      result.data.forEach((histogramData: HistogramData) => {
        histogramData.data.forEach((item: ItemData) => {
          const existingEntry = formattedData.find(
            (entry) => entry.date === item.date
          );
          if (existingEntry) {
            if (histogramData.histogramType === "totalDocuments") {
              existingEntry.documentsCount = item.value;
            } else if (histogramData.histogramType === "riskFactors") {
              existingEntry.riskCount = item.value;
            }
          } else {
            formattedData.push({
              date: item.date,
              documentsCount:
                histogramData.histogramType === "totalDocuments"
                  ? item.value
                  : 0,
              riskCount:
                histogramData.histogramType === "riskFactors" ? item.value : 0,
            });
          }
        });
      });
      return formattedData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDocumentsIds = createAsyncThunk(
  "data/fetchDocumentsIds",
  async (data: SearchData, { rejectWithValue }) => {
    try {
      const accessToken = getAccessToken();
      if (accessToken === null) {
        return rejectWithValue("Нет токена");
      }
      const response = await fetch(`${BASE_URL}/api/v1/objectsearch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const serverError = await response.json();
        return rejectWithValue(serverError.message);
      }

      const result = await response.json();
      const iDsList = result.items.map((item: IDItem) => item.encodedId);
      return iDsList;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchArticles = createAsyncThunk(
  "data/fetchArticles",
  async (data: IDsList, { rejectWithValue }) => {
    try {
      const accessToken = getAccessToken();
      if (accessToken === null) {
        return rejectWithValue("Нет токена");
      }
      const response = await fetch(`${BASE_URL}/api/v1/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const serverError = await response.json();
        return rejectWithValue(serverError.message);
      }

      const result = await response.json();
      const articles = result.map((item: any) => item.ok);
      const formattedArticles = articles.map((article: any) => {
        return {
          attributes: {
            isDigest: article.attributes.isDigest,
            isTechNews: article.attributes.isTechNews,
            isAnnouncement: article.attributes.isAnnouncement,
            wordCount: article.attributes.wordCount,
          },
          title: article.title.text,
          text: article.content.markup,
          date: article.issueDate,
          source: article.source.name,
          url: article.url,
        };
      });
      return formattedArticles;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    resetData: (state) => {
      state.ids = [];
      state.articles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverviewData.fulfilled, (state, action) => {
        state.overviewData = action.payload;
        state.overviewIsLoading = false;
      })
      .addCase(fetchOverviewData.rejected, (state) => {
        state.overviewIsLoading = false;
      })
      .addCase(fetchOverviewData.pending, (state) => {
        state.overviewIsLoading = true;
      })
      .addCase(fetchDocumentsIds.fulfilled, (state, action) => {
        state.ids = action.payload;
        state.idsAreLoading = false;
      })
      .addCase(fetchDocumentsIds.rejected, (state) => {
        state.idsAreLoading = false;
      })
      .addCase(fetchDocumentsIds.pending, (state) => {
        state.idsAreLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = [...state.articles, ...action.payload];
        state.articlesAreLoading = false;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.articlesAreLoading = false;
      })
      .addCase(fetchArticles.pending, (state) => {
        state.articlesAreLoading = true;
      });
  },
});

export const { resetData } = dataSlice.actions;
export default dataSlice.reducer;
