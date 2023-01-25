import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Pizza = {
    id: string;
    imageUrl: string;
    name: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

type FetchPizzaArgs = {
    category: string;
    search: string;
    currentPage: number;
    sort: string;
};

export enum Status {
    LOADING='loading',
    SUCCES ='success',
    ERROR='error'
}

interface PizzaSliceState {
    items: Pizza[],
    status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzaArgs>('pizza/fetchPizzaStatus', async (params) => {
    const { category, search, currentPage, sort } = params;
    const { data } = await axios.get<Pizza[]>(`https://63b403f1ea89e3e3db53cf0c.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sort}&order=asc${search}`
    );
    return data;
});

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCES;
        });

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;