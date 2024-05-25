export const filterByString = <K extends string, T extends Record<K, string>>(
	field: T,
	operator: string,
	column: K,
	value: string
) => {
	const fieldNormalized = field[column]
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');

	const valueNormalized = value
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');

	if (operator === 'contains') {
		return fieldNormalized.includes(valueNormalized);
	}

	if (operator === 'equals') {
		return fieldNormalized === valueNormalized;
	}

	if (operator === 'startsWith') {
		return fieldNormalized.startsWith(valueNormalized);
	}

	if (operator === 'endsWith') {
		return fieldNormalized.endsWith(valueNormalized);
	}
};
