import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
  name: string;
  sortProperty: "rating" | "price" | "title";
};

interface FilterTypeSliceState {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sortType: Sort;
}

const initialState: FilterTypeSliceState = {
  searchValue: "",
  currentPage: 1,

  categoryId: 0,
  sortType: {
    name: "Сортировка",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, actions: PayloadAction<number>) => {
      state.categoryId = actions.payload;
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sortType = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.currentPage = Number(action.payload.currentPage);
      state.sortType = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterSort = (state: RootState) => state.filter.categoryId;
export const selectFilterSortType = (state: RootState) => state.filter.sortType;

// Action creators are generated for each case reducer function
export const {
  setCategory,
  setSort,
  setFilters,
  setCurrentPage,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
