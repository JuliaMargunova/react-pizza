export type Pizza = {
    id: string;
    imageUrl: string;
    name: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

export type FetchPizzaArgs = {
    category: string;
    search: string;
    currentPage: number;
    sort: string;
};

export enum Status {
    LOADING='loading',
    SUCCES ='success',
    ERROR='error'
}

export interface PizzaSliceState {
    items: Pizza[],
    status: Status;
}