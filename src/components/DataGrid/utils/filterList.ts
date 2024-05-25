import { FilterType } from '../types/FilterType';
import { filterByDate } from './filterByDate';
import { filterByNumber } from './filterByNumber';
import { filterByString } from './filterByString';

export const filterList = <K extends string, T extends Record<K, unknown>>(
	list: T[],
	filters: FilterType[],
	loicalOperator: string
): T[] => {
	if (!filters.length) return list;

	const ok = list.filter((row) => {
		const results = filters.map((filter) => {
			if (!filter.value) return true;

			if (filter.type === 'date' || filter.type === 'dateTime') {
				return filterByDate(
					row as Record<K, string>,
					filter.operator,
					filter.column,
					filter.value as string
				);
			}
			if (filter.type === 'number') {
				return filterByNumber(
					row as Record<K, string>,
					filter.operator,
					filter.column,
					filter.value as string
				);
			}

			if (filter) {
				return filterByString(
					row as Record<K, string>,
					filter.operator,
					filter.column,
					filter.value as string
				);
			}
			return false;
		});
		return loicalOperator === 'AND'
			? results.every((is) => is)
			: results.some((is) => is);
	});
	return ok;
};
