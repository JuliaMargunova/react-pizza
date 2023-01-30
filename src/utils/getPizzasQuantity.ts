import { CartItem } from "../redux/cart/types";


export const getPizzasQuantity = (items: CartItem[]) => {
        return items.reduce((sum, pizza) => {
            return pizza.count + sum;
        }, 0);
    
}
