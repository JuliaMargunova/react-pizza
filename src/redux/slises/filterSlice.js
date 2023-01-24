
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sortType = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
            state.sortType = action.payload.sortType;
        }
    },
});

export const selectFilter = state => state.filter

export const selectSortType = state => state.filter.sortType;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;