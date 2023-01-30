import React, { useState } from 'react';
import Header from './components/Header';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
//import Cart from './Pages/Cart';
import FullPizza from './Pages/FullPizza';


import { Route, Routes } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
const Cart = React.lazy(()=>import(/* webpackChunkName: "Cart" */ './Pages/Cart'));
                                   
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/cart" element={
        <React.Suspense fallback={<div>Идет загрузка...</div>}>
          <Cart />
          </React.Suspense>} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
