import { configureStore } from '@reduxjs/toolkit';
import filter from '../redux/slises/filterSlice';
import cart from '../redux/slises/cartSlice';
import pizza from '../redux/slises/pizzaSlice';

 export const store =  configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
})
