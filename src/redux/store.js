import { configureStore } from '@reduxjs/toolkit';
import filter from '../redux/slises/filterSlice';

export default configureStore({
  reducer: {
    filter,
  },
})