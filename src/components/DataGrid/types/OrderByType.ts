import { GridColType } from '@mui/x-data-grid';

export type OrderByType = {
	field: string;
	type?: GridColType;
	order: 'ASC' | 'DESC';
};
