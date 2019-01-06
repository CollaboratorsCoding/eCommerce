export default allQuery => {
	const filtered = {};
	Object.keys(allQuery).forEach(key => {
		if (Object.prototype.hasOwnProperty.call(allQuery, key)) {
			const value = allQuery[key];

			switch (key) {
				case 'price':
					{
						const [min, max] = value.split('-');
						filtered.price = {
							min: min || 0,
							max,
						};
					}
					break;
				default:
					break;
			}
		}
	});

	return filtered;
};
