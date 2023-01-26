export type SortT = {
    name: string;
    sort: 'rating' | 'price' | 'name';
}

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sortType: SortT;
}
