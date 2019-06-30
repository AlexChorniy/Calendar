import React from 'react';
import style from '../App/app.scss';

const ButtonSubmit = ({ handleSubmit }) => (
    <button onClick={handleSubmit} type="button" className={`btn btn-secondary btn-sm ${style.calendar_but}`} value="Submit">Submit</button>
);

export default ButtonSubmit;
