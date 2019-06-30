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
    <div className="card">
        <div className={`card-body ${style.exchangeView}`}>
            <h2 className="card-title text-info">{txt}</h2>
            <p className="card-subtitle mb-2 text-muted">{`${rate} grn for 1 ${cc}`}</p>
            <p className="card-subtitle mb-2 text-muted">{cc}</p>
            <p className="card-subtitle mb-2 text-muted">{exchDate}</p>
        </div>
    </div>
);

export default Exchange;
