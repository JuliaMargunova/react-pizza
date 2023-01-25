import { configureStore } from '@reduxjs/toolkit';
import filter from './slises/filterSlice';
import cart from './slises/cartSlice';
import pizza from './slises/pizzaSlice';

 export const store =  configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;