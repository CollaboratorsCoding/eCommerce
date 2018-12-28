export const isServer = !(
	typeof window !== 'undefined' &&
	window.document &&
	window.document.createElement
);

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
