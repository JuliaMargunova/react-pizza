import React, { useContext, useState } from "react";
import qs from 'qs';
import axios from "axios";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slises/filterSlice';
import { list } from '../components/Sort';

const Home = () => {
    const navigate = useNavigate();
    const { categoryId, sortType, currentPage } = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { searchValue } = useContext(SearchContext);
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);


    const onChangeCategory = React.useCallback((i) => {
        dispatch(setCategoryId(i));
    }, []);

    
    const fetchPizzas = () => {
        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';


        setIsLoading(true);
        axios.get(`https://63b403f1ea89e3e3db53cf0c.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sortType.sort}&order=asc${search}`
        ).then(res => {
            setItems(res.data);
            setIsLoading(false);
        });
    }

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: sortType.sort,
                categoryId,
                currentPage
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;

    }, [categoryId, sortType.sort, currentPage]);




    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sortType = list.find((item) => params.sort === item.sort);

            dispatch(setFilters({
                ...params,
                sortType
            }),
            );
            isSearch.current = true;
        }

    }, []);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sortType.sort, searchValue, currentPage]);

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