
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state,action){
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage=Number(action.payload.currentPage);
            state.sortType = action.payload.sortType;
        }
    },
});

export const {setCategoryId, setSort, setCurrentPage, setFilters} = filterSlice.actions;
export default filterSlice.reducer;