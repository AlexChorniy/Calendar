import axios from 'axios';

const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory';

const getExchange = search => (
	axios(`${URL}/exchange?date=${search}&json`)
);

export default getExchange;
