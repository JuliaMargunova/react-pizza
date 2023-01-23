import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
    cartPizzasQuantity: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addItem(state, action) {
        //     state.items.push(action.payload);
        //     state.totalPrice = state.items.reduce((sum, obj) => {
        //         return obj.price + sum;
        //     }, 0);
        // },
        addItem(state, action) {
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
        removeItem(state, action) {
            state.items.filter(item => item.id !== action.payload);
        },
        clearItems(state, action) {
            state.items = [];
        },
    }
});

export const selectCart = state => state.cart;

export const selectCartItemId = (id) => state => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, getCartPizzasQuantity } = cartSlice.actions;
export default cartSlice.reducer;