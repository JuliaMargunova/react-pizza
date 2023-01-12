import React, { useContext, useState } from "react";

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from "../Pagination";
import { SearchContext } from '../App';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slises/filterSlice';


const Home = () => {
    const idCategory = useSelector(state => state.filter.categoryId);
    const dispatch = useDispatch();
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [sortType, setSortType] = useState({ name: 'популярности', sort: 'rating' });
    // const [idCategory, setCategory] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const { searchValue } = useContext(SearchContext);

    const category = idCategory > 0 ? `&category=${idCategory}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    React.useEffect(() => {
        setIsLoading(true);
        fetch(`https://63b403f1ea89e3e3db53cf0c.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sortType.sort}&order=asc${search}`
        )
            .then(res => res.json())
            .then(
                res => {
                    setItems(res);
                    setIsLoading(false);
                }
            )
        window.scrollTo(0, 0);
    }, [idCategory, sortType, searchValue, currentPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 3) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        //setItemOffset(newOffset);
    };

    const onChangeCategory = (i) => {
        dispatch(setCategoryId(i));
        console.log(i);
       
    }
    console.log('idCategory =' + idCategory);

    return (<>
        <div className="container">
            <div className="content__top">
                <Categories activeIndex={idCategory} setActiveIndexClick={onChangeCategory} />
                <Sort sortType={sortType} onClickSortType={(type) => setSortType(type)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    (isLoading) ? [...new Array(4)].map((_, index) => { return <Skeleton key={index} /> }) : items.map(pizza => {
                        return <PizzaBlock key={pizza.id} {...pizza} />
                    }
                    )}
            </div>
            <Pagination onChange={(e) => setCurrentPage(e)} />
        </div>
    </>)

}

export default Home;