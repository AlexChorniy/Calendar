import React from 'react';
import style from './monthItem.scss';

const MonthItem = ({ name }) => (
    <option className={style.calendar_opt}>{ name }</option>
);

export default MonthItem;
