import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export type CartItem = {
    id: string;
    name: string;
    price: number;
    type: string;
    size: number;
    imageUrl: string;
    count: number;
}

interface CartSliceState {
    totalPrice: number;
    cartPizzasQuantity: number;
    items: CartItem[];
}

const initialState: CartSliceState = {
    totalPrice: 0,
    items: [],
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
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
            state.cartPizzasQuantity = state.items.reduce((sum, pizza) => {
                return pizza.count + sum;
            }, 0);
        },
        removeItem(state, action: PayloadAction<string>) {
            debugger
            state.items.filter(item => item.id !== action.payload);
        },
        clearItems(state) {
            state.items = [];
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) { findItem.count--; }
        },
        plusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) { findItem.count++; }
        }
    }
});

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemId = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem, plusItem } = cartSlice.actions;
export default cartSlice.reducer;