import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const FullPizza = () => {
    const { id } = useParams();
    const [pizza, setPizzas] = useState();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://63b403f1ea89e3e3db53cf0c.mockapi.io/items/' + id);
                setPizzas(data);

            } catch (error) {
                console.log('error', error);
            }
        }
        fetchPizza();
    }, []);
    if (!pizza) {
        return (<div>Загрузка....</div>)
    }
    return (<div>
        {pizza.name}
    </div>
    )
}

export default FullPizza;