import React, { useState } from "react";

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';


const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [sortType, setSortType] = useState( { name: 'популярности', sort: 'rating' });
    const [idCategory, setCategory] = useState(0);


    React.useEffect(() => {
        setIsLoading(true);
        fetch(`https://63b403f1ea89e3e3db53cf0c.mockapi.io/items?${
            idCategory > 0 ? `category=${idCategory}` : ''
        }&sortBy=${sortType.sort}&order=asc`
             )
            .then(res => res.json())
            .then(
                res => {
                    setItems(res);
                    setIsLoading(false);
                }
            )
        window.scrollTo(0, 0);
    }, [idCategory, sortType]);


    return (<>
        <div className="container">
            <div className="content__top">
                <Categories activeIndex={idCategory} setActiveIndexClick={(i) => setCategory(i)} />
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
        </div>
    </>)

}

export default Home;