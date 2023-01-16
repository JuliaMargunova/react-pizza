import { configureStore } from '@reduxjs/toolkit';
import filter from '../redux/slises/filterSlice';

 export const store =  configureStore({
  reducer: {
    filter,
  },
})
