import { GridColType } from '@mui/x-data-grid';

export type FilterType = {
	id: number;
	column: string;
	operator: string;
	type?: GridColType;
	value: unknown;
};
