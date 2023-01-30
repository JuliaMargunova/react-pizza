import React from "react";

import ReactPaginate from 'react-paginate';
import s from './pagination.module.scss';

type PaginationProps = {
    currentPage: number;
    onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ onChange, currentPage }) => {
    return <ReactPaginate className={s.root}
        breakLabel="..."
        nextLabel=" >"
        previousLabel="< "
        onPageChange={event => onChange(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
    />
}

export default Pagination;