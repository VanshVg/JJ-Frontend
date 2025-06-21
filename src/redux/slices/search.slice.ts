import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, SearchInterface } from "../types";

const initialState: SearchInterface = {
  query: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery(
      state: SearchInterface,
      action: PayloadAction<SearchInterface>
    ) {
      const { query } = action.payload;
      state.query = query;
    },
  },
});

export const { reducer: searchReducer } = searchSlice;

export const getSearchQuery = (state: RootState) => state.search;

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice;
