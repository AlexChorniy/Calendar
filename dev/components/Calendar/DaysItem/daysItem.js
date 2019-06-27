import React from 'react';
import style from './daysItem.scss';

const DayItem = ({ name }) => (
    <option className={style.calendar_opt}>{ name }</option>
);

export default DayItem;
