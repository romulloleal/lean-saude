export const filterByNumber = <K extends string, T extends Record<K, string>>(
	field: T,
	operator: string,
	column: K,
	value: string
) => {
	const fieldNumber = Number(field[column]);
	const valueNumber = Number(value);

	if (operator === '=') {
		return fieldNumber === valueNumber;
	}

	if (operator === '!=') {
		return fieldNumber !== valueNumber;
	}

	if (operator === '>') {
		return fieldNumber > valueNumber;
	}

	if (operator === '>=') {
		return fieldNumber >= valueNumber;
	}

	if (operator === '<') {
		return fieldNumber < valueNumber;
	}

	if (operator === '<=') {
		return fieldNumber <= valueNumber;
	}
};
