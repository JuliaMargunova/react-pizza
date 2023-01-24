import React, { useState } from "react";

type CategoriesProps = {
    activeIndex:number;
setActiveIndexClick: any;
}

const Categories: React.FC<CategoriesProps> = ({ activeIndex, setActiveIndexClick }) => {
    const categoriesList = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

    const categories = categoriesList.map((c, i) => {
        return <li key={i} onClick={() => { setActiveIndexClick(i) }} className={(i === activeIndex) ? "active" : ""} >{c}</li>
    })

    return (
        <div className="categories">
            <ul>
                {categories}
            </ul>
        </div>
    )
}

export default Categories;