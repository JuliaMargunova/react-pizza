import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchPizzaArgs, Pizza } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzaArgs>('pizza/fetchPizzaStatus', async (params) => {
    const { category, search, currentPage, sort } = params;
    const { data } = await axios.get<Pizza[]>(`https://63b403f1ea89e3e3db53cf0c.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sort}&order=asc${search}`
    );
    return data;
});