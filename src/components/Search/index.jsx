import React from "react";

import s from '../Search/Search.module.scss';
import clear from '../../assets/img/icons/clear.svg';
import search from '../../assets/img/icons/search.svg';
import { SearchContext } from "../../App";

const Search = () => {
    const { searchValue, setSearchValue } = React.useContext(SearchContext);
    return (
        <div className={s.root}>
            <img className={s.search} src={search} />
            <input onChange={(e) => { setSearchValue(e.target.value) }} className={s.input} placeholder="Поиск пиццы..." value={searchValue} />
            {searchValue && <img onClick={() => setSearchValue('')} className={s.clear} src={clear} />}
        </div>
    )
}

export default Search; 