import React from 'react';
import style from './yearsItem.scss';

const YearItem = ({ name }) => (
    <option className={style.calendar_opt}>{ name }</option>
);

export default YearItem;
