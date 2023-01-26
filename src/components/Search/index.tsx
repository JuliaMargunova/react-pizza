import React from "react";

import s from '../Search/Search.module.scss';
import clear from '../../assets/img/icons/clear.svg';
import search from '../../assets/img/icons/search.svg';
import debounce from "lodash.debounce";
//import { setSearchValue } from '../../redux/slises/filterSlice';


import { useDispatch } from 'react-redux';
import { setSearchValue } from "../../redux/filter/slice";

const Search: React.FC = () => {
    const [value, setValue] = React.useState('');
    const dispatch = useDispatch();

    const inputRef = React.useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();

    }

    const onChangeSearchValue = React.useCallback(
        debounce((str: string) => dispatch(setSearchValue(str)), 250), []);

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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