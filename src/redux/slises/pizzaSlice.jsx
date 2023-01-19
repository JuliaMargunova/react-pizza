import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizza', async (params) => {
    const {category, search, currentPage, sortType} = params;
    debugger
    const { data } = await axios.get(`https://63b403f1ea89e3e3db53cf0c.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sortType.sort}&order=asc${search}`
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
        },
    },
    extraReducers:{
        [fetchPizzas.pending]:(state,action)=>{
            console.log('идет загрузка');
        },
        [fetchPizzas.fulfilled]:(state,action)=>{
            console.log('ошибка');
        },
        [fetchPizzas.rejected]:(state,action)=>{
            console.log(state,'все ок');
        }
    },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;