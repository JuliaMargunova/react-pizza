import React, { useContext, useState } from "react";
import qs from 'qs';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { FilterSliceState, setCategoryId, setCurrentPage, setFilters, SortT } from '../redux/slises/filterSlice';
import { list } from '../components/Sort';
import { fetchPizzas } from '../redux/slises/pizzaSlice';
import NotFoundBlock from './NotFound';
import { selectPizza } from '../redux/slises/pizzaSlice';
import { selectFilter } from '../redux/slises/filterSlice';

type Pizza = {
    id: string;
    imageUrl: string;
    name: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

const Home = () => {


    const navigate = useNavigate();
    const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizza);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);


    const onChangeCategory = React.useCallback((i: number) => {
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
            dispatch(
                //@ts-ignore
                fetchPizzas({
                    category,
                    search,
                    currentPage,
                    sort
                }),
            );
        }
        catch (error) {
            console.log('ERROR', error);
        }
        setIsLoading(false);

    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = list.find((item: SortT) => params.sort === item.sort) as SortT;
            const { categoryId, currentPage } = params;
            dispatch(setFilters(
                {
                    searchValue: '',
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    sortType: sort || sort[0],
                }
            ),
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
                        (isLoading) ? [...new Array(4)].map((_, index) => { return <Skeleton key={index} /> }) : items.map((pizza: Pizza) => {
                            return < PizzaBlock key={pizza.id} {...pizza} />
                        }
                        )}
                </div>)
            }
            <Pagination currentPage={currentPage} onChange={(e: number) => dispatch(setCurrentPage(e))} />
        </div>
    </>)

}

export default Home;