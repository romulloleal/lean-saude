import { GridColType } from '@mui/x-data-grid';

export const sortList = <K extends string, T extends Record<K, unknown>>(
	list: T[],
	field: K,
	order: 'ASC' | 'DESC',
	type?: GridColType
) => {
	return list.sort((a, b) => {
		if (type === 'date' || type === 'dateTime') {
			return new Date(a[field] as string) > new Date(b[field] as string)
				? order === 'ASC'
					? 1
					: -1
				: order === 'ASC'
				? -1
				: 1;
		}
		if (!isNaN(a[field] as number)) {
			const numberA = Number(a[field]);
			const numberB = Number(b[field]);
			return order === 'ASC' ? numberA - numberB : numberB - numberA;
		}

		if (field) {
			return (a[field] as string) > (b[field] as string)
				? order === 'ASC'
					? 1
					: -1
				: order === 'ASC'
				? -1
				: 1;
		}

		return 0;
	});
};
