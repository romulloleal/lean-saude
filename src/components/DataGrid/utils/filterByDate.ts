export const filterByDate = <K extends string, T extends Record<K, string>>(
	field: T,
	operator: string,
	column: K,
	value: string
) => {
	const dateValue = new Date(value).getTime();

	const dateField = new Date(field[column]).getTime();

	if (operator === 'is') {
		return dateField === dateValue;
	}

	if (operator === 'isNot') {
		return dateField !== dateValue;
	}

	if (operator === 'after') {
		return dateField > dateValue;
	}

	if (operator === 'onOrAfter') {
		return dateField >= dateValue;
	}

	if (operator === 'before') {
		return dateField < dateValue;
	}

	if (operator === 'onOrBefore') {
		return dateField <= dateValue;
	}
};
