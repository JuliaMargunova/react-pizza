import React, { useState } from 'react';
import Header from './components/Header';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Cart from './Pages/Cart';


import { Route, Routes } from "react-router-dom";

export const SearchContext = React.createContext();

function App() {

  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
