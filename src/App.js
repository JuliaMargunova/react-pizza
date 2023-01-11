import React,{useState} from 'react';
import Header from './components/Header';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Cart from './Pages/Cart';

import { Route, Routes } from "react-router-dom";

function App() {

  const [searchValue, setSearchValue] = useState('');

  return (<div className="wrapper">
    <Header searchValue={searchValue} setSearchValue={setSearchValue} />
    <div className="content">
      <Routes>
        <Route path="/" element={<Home searchValue={searchValue} />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </div>
  );
}

export default App;
