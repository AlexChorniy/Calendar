const news = (store = [], { type, payload }) => {
	switch (type) {
		case 'ADD_NEWS':
			console.log(payload);
			return payload;
		default:
		return store;
	}
};

export default news;
