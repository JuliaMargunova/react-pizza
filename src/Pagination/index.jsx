import React from "react";

import ReactPaginate from 'react-paginate';
import s from './pagination.module.scss';

const Pagination = ({ onChange }) => {
    return <ReactPaginate className={s.root}
        breakLabel="..."
        nextLabel=" >"
        previousLabel="< "
        onPageChange={event => onChange(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        renderOnZeroPageCount={null}
    />
}

export default Pagination;