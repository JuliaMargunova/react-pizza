import React, { useState } from 'react';
import Header from './components/Header';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Cart from './Pages/Cart';
import FullPizza from './Pages/FullPizza';


import { Route, Routes } from "react-router-dom";
import MainLayoot from './Pages/layouts/MainLayout';

export const SearchContext = React.createContext();

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayoot />}>
        <Route path="/" element={<Home />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
