import React, { useContext, useState } from "react";
import qs from 'qs';
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
import { fetchPizzas } from '../redux/slises/pizzaSlice';
import NotFoundBlock from './NotFound';



const Home = () => {
    const navigate = useNavigate();
    const { categoryId, sortType, currentPage, searchValue } = useSelector(state => state.filter);
    const { items, status } = useSelector(state => state.pizza);
    const dispatch = useDispatch();
    //const disp = useDispatch();
    //const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    //const { searchValue } = useContext(SearchContext);

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);


    const onChangeCategory = React.useCallback((i) => {
        dispatch(setCategoryId(i));
    }, []);



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


    const getPizzas = () => {
        setIsLoading(true);
        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        const sort = sortType.sort;
        try {
            dispatch(fetchPizzas({ category, search, currentPage, sort }));
        }
        catch (error) {
            console.log('ERROR', error);
        }
        setIsLoading(false);

    }

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
            getPizzas();
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
            {
                (status === "error") ? <NotFoundBlock /> : (<div className="content__items">
                    {
                        (isLoading) ? [...new Array(4)].map((_, index) => { return <Skeleton key={index} /> }) : items.map(pizza => {
                            return < PizzaBlock key={pizza.id} {...pizza} />
                        }
                        )}
                </div>)
            }

            <Pagination currentPage={currentPage} onChange={(e) => dispatch(setCurrentPage(e))} />
        </div>
    </>)

}

export default Home;