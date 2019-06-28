import React from 'react';
import style from './carrencyItem.scss';

const CarrencyItem = ({ txt }) => (
    <option className={style.carrencyItem}>{ txt }</option>
);

export default CarrencyItem;
