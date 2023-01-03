import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

const categoriesList = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("https://63b403f1ea89e3e3db53cf0c.mockapi.io/items").then(res => res.json()).then(res => setItems(res))
  }, []);

  const pizzasList = items.map(pizza => {
    return <PizzaBlock title={pizza.name} imageUrl={pizza.imageUrl} sizes={pizza.sizes} types={pizza.types} />
  })

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
