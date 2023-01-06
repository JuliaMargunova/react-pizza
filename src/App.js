import React from 'react';
import Header from './components/Header';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Cart from './Pages/Cart';

import { Route, Routes } from "react-router-dom";

function App() {

  return (<div className="wrapper">
    <Header />
    <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  </div>
  );
}

export default App;
