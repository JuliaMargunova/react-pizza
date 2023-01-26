
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, SortT } from "./types";

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sortType: {
        name: 'популярности', sort: 'rating'
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<SortT>) {
            state.sortType = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId);
                state.currentPage = Number(action.payload.currentPage);
                state.sortType = action.payload.sortType;
            }
            else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sortType = {
                    name: 'популярности', sort: 'rating'
                };
            }
        }
    },
});


export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;