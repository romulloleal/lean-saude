import { GridColType } from '@mui/x-data-grid';

const stringOperators = [
	{
		label: 'contém',
		value: 'contains',
	},
	{
		label: 'é igual a',
		value: 'equals',
	},
	{
		label: 'começa com',
		value: 'startsWith',
	},
	{
		label: 'termina com',
		value: 'endsWith',
	},
];

const dateOperators = [
	{
		label: 'é',
		value: 'is',
	},
	{
		label: 'não é',
		value: 'isNot',
	},
	{
		label: 'após',
		value: 'after',
	},
	{
		label: 'em ou após',
		value: 'onOrAfter',
	},
	{
		label: 'antes de',
		value: 'before',
	},
	{
		label: 'em ou antes de',
		value: 'onOrBefore',
	},
];

const numberOperators = [
	{
		label: '=',
		value: '=',
	},
	{
		label: '!=',
		value: '!=',
	},
	{
		label: '>',
		value: '>',
	},
	{
		label: '>=',
		value: '>=',
	},
	{
		label: '<',
		value: '<',
	},
	{
		label: '<=',
		value: '<=',
	},
];

export const filterOperators = (type?: GridColType) => {
	if (type === 'date' || type === 'dateTime') {
		return dateOperators;
	}
	if (type == 'number') {
		return numberOperators;
	}

	return stringOperators;
};
