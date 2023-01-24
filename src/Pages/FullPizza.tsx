import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza : React.FC = () => {
    const { id } = useParams();
    const [pizza, setPizzas] = useState<{
        name: string,
        imageUrl:string,
        price: number
    }>();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://63b403f1ea89e3e3db53cf0c.mockapi.io/items/' + id);
                setPizzas(data);

            } catch (error) {
               alert("Ошибка получения пиццы...")
                navigate('/');
            }
        }
        fetchPizza();
    }, []);

    if (!pizza) {
        return (<div>Загрузка....</div>)
    }
    
    return (<div className="container">
        <h1>{pizza.name}</h1>
        <img src={pizza.imageUrl} />
        <h1>{pizza.price} руб</h1>
    </div>
    )
}

export default FullPizza;