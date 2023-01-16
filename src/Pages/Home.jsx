import React, { useContext, useState } from "react";

import axios from "axios";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from "../Pagination";
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slises/filterSlice';




const Home = () => {
    const { categoryId, sortType, currentPage } = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { searchValue } = useContext(SearchContext);
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    React.useEffect(() => {
        setIsLoading(true);
        axios.get(`https://63b403f1ea89e3e3db53cf0c.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sortType.sort}&order=asc${search}`
        ).then(res => {
            setItems(res.data);
            setIsLoading(false);
        })
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    const onChangeCategory = (i) => {
        dispatch(setCategoryId(i));
    }

    return (<>
        <div className="container">
            <div className="content__top">
                <Categories activeIndex={categoryId} setActiveIndexClick={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    (isLoading) ? [...new Array(4)].map((_, index) => { return <Skeleton key={index} /> }) : items.map(pizza => {
                        return <PizzaBlock key={pizza.id} {...pizza} />
                    }
                    )}
            </div>
            <Pagination currentPage={currentPage} onChange={(e) => dispatch(setCurrentPage(e))} />
        </div>
    </>)

}

export default Home;