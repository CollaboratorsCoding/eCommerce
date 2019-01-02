export const isServer = !(
	typeof window !== 'undefined' &&
	window.document &&
	window.document.createElement
);

export const setQuery = (query, value, history) => {
	const searchParams = new URLSearchParams(history.location.search);
	if (searchParams.has(query)) {
		searchParams.set(query, value);
	} else {
		searchParams.append(query, value);
	}

	history.push({
		search: `?${searchParams.toString()}`,
	});
};

export const weekDayFormat = n => {
	switch (n) {
		case 0:
			return 'Sunday';

		case 1:
			return 'Monday';

		case 2:
			return 'Tuesday';

		case 3:
			return 'Wednesday';

		case 4:
			return 'Thursday';

		case 5:
			return 'Friday';

		case 6:
			return 'Saturday';

		default:
			return null;
	}
};
export default null;
