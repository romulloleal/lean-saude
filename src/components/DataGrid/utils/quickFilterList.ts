export const quickFilterList = <T>(list: T[], search: string): T[] => {
	const searchNormalized = search
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');

	return list.filter((row) =>
		JSON.stringify(Object.values(row as Record<string, unknown>))
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.includes(searchNormalized)
	);
};
