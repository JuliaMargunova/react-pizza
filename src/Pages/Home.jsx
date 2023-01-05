import React from "react";

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';


const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);


    const categoriesList = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

    React.useEffect(() => {
        fetch("https://63b403f1ea89e3e3db53cf0c.mockapi.io/items")
            .then(res => res.json())
            .then(
                res => {
                    setItems(res);
                    setIsLoading(false);
                }
            )
    }, []);
    return (<>
        <div className="content__top">
            <Categories categoriesList={categoriesList} />
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
    </>)

}

export default Home;