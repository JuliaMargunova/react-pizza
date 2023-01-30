import { getPizzasQuantity } from './../../utils/getPizzasQuantity';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";

const {items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    items,
    cartPizzasQuantity: 0
};
 

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem) { findItem.count++; }
            else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = calcTotalPrice(state.items) as number;
            state.cartPizzasQuantity = getPizzasQuantity(state.items) as number;
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items) as number;
            state.cartPizzasQuantity = getPizzasQuantity(state.items) as number;
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
            state.cartPizzasQuantity = 0;
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) { findItem.count--; }
            state.totalPrice = calcTotalPrice(state.items) as number;
            state.cartPizzasQuantity = getPizzasQuantity(state.items) as number;
        },
        plusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) { findItem.count++; }
            state.totalPrice = calcTotalPrice(state.items) as number;
            state.cartPizzasQuantity = getPizzasQuantity(state.items) as number;
        }
    }
});

export const { addItem, removeItem, clearItems, minusItem, plusItem } = cartSlice.actions;
export default cartSlice.reducer;

