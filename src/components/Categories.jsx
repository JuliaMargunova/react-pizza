import React, { useState } from "react";

function Categories({ categoriesList }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const categories = categoriesList.map((c, i) => {
        return <li key={i} onClick={() => { setActiveIndex(i) }} className={(i === activeIndex) ? "active" : ""} >{c}</li>
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