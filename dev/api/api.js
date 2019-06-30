import axios from 'axios';

const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory';
// ${URL}
const getExchange = search => (
	axios(`/exchange?date=${search}&json`)
);

export default getExchange;
