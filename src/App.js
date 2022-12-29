import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

const categoriesList = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

const pizzas = [
  {
    id: 0,
    imageUrl: "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
    name: "Чизбургер-пицца",
    types: [0, 1],
    sizes: [26, 40],
    prize: 250,
    category: 0,
    rating: 4
  },
  {
    id: 1,
    imageUrl: "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
    name: "Сырная",
    types: [0, 1],
    sizes: [26, 30, 40],
    prize: 25,
    category: 0,
    rating: 4
  },
  {
    id: 2,
    imageUrl: "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
    name: "Мексиканская",
    types: [0],
    sizes: [30, 40],
    prize: 500,
    category: 0,
    rating: 4
  }
];

const pizzasList = pizzas.map(pizza=>{
  return <PizzaBlock title={pizza.name} imageUrl={pizza.imageUrl} sizes={pizza.sizes} types={pizza.types}  />
})

function App() {
  return (<div className="wrapper">
    <Header />
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories categoriesList={categoriesList} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
         {pizzasList}
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
