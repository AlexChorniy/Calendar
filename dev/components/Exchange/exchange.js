import React from 'react';
import style from './exchange.scss';

const Exchange = (
{
    txt,
    rate,
    cc,
    exchDate,
},
) => (
    <div className={style.exchangeView}>
        <h2>{txt}</h2>
        <p>{rate}</p>
        <p>{cc}</p>
        <p>{exchDate}</p>
    </div>
);

export default Exchange;
