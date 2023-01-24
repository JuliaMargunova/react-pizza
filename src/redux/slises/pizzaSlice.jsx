import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: 'loading'
};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
    const { category, search, currentPage, sort } = params;
    const { data } = await axios.get(`https://63b403f1ea89e3e3db53cf0c.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sort}&order=asc${search}`
    );
    return data;
    //.then(res => {
    //     //setItems(res.data);
    //     dispatch(setItems(res.data));
    //     setIsLoading(false);
    // });
    //setIsLoading(true);
})
const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
            state.items = [];
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error';
            state.items = [];
        }
    },
});

export const selectPizza = state => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;