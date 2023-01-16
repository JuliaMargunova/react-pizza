import React from "react";

import s from '../Search/Search.module.scss';
import clear from '../../assets/img/icons/clear.svg';
import search from '../../assets/img/icons/search.svg';
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";


const Search = () => {
    const [value, setValue]= React.useState('');
    const {setSearchValue } = React.useContext(SearchContext);
    const inputRef = React.useRef();

    const testDebounce = React.useCallback(debounce(() => console.log('hello'), 1000), []);


    const onClickClear = () => {
        setSearchValue(''); 
        setValue('');
        inputRef.current.focus();
    }

    const onChangeSearchValue = (str) => {
        setSearchValue(str);
        testDebounce();
    }

    const onChangeInput = event =>{
        setValue(event.target.value);
        onChangeSearchValue(event.target.value);

    }

    return (
        <div className={s.root}>
            <img className={s.search} src={search} />
            <input ref={inputRef} onChange={onChangeInput} className={s.input} placeholder="Поиск пиццы..." value={value} />
            {value && <img onClick={() => onClickClear()} className={s.clear} src={clear} />}
        </div>
    )
}

export default Search; 