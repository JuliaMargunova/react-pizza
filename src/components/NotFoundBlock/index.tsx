import React from "react";
import s from '../NotFoundBlock/NotFoundBlock.module.scss';

const NotFoundBlock :React.FC = () => {
    return (
        <>
            <div className={s.root}>
                <h1 >
                    <span>😕</span>
                    <br />
                    Ничего не найдено :(
                </h1>
                <p>К сожалению данная страница отсутствует в нашем интернет магазине</p>
            </div>
        </>
    )
}
export default NotFoundBlock;