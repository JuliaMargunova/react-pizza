import { configureStore } from '@reduxjs/toolkit';
import filter from '../redux/slises/filterSlice';
import cart from '../redux/slises/cartSlice';

 export const store =  configureStore({
  reducer: {
    filter,
    cart,
  },
})
