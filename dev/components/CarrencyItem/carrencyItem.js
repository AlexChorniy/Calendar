import React from 'react';
import style from './carrencyItem.scss';

const CarrencyItem = ({ txt }) => (
    <option className={style.calendar_opt}>{ txt }</option>
);

export default CarrencyItem;
