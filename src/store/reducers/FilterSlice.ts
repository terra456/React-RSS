import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  searchStr: string | undefined;
  currentPage: number;
}

const initialState: FilterState = {
  searchStr: undefined,
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.searchStr = action.payload;
      state.currentPage = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    clearSearch(state) {
      state.searchStr = undefined;
      state.currentPage = 1;
    },
  },
});

export default filterSlice.reducer;
