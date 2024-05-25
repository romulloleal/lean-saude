import { Box, Chip, styled, Typography } from '@mui/material';
import {
	GridColDef,
	GridRenderCellParams,
	GridValueFormatter,
} from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';

import { CustomDataGrid } from '@/components/DataGrid/CustomDataGrid';
import { IUser } from '@/interfaces/IUser';
import { api } from '@/service/api';

import { Actions } from './actions';

const columns = [
	{ field: 'id', headerName: 'ID', type: 'number' },
	{ field: 'nome', headerName: 'Nome', flex: 1, minWidth: 150 },
	{ field: 'telefone', headerName: 'Telefone', flex: 1, minWidth: 150 },
	{
		field: 'data_de_cadastro',
		headerName: 'Data de Cadastro',
		flex: 1,
		minWidth: 150,
		type: 'date',
		valueFormatter: (row: GridValueFormatter) => {
			const date = new Date(row as unknown as string);
			return Intl.DateTimeFormat('pt-BR').format(date);
		},
	},
	{
		field: 'status',
		headerName: 'Status',
		renderCell: (row: GridRenderCellParams) => {
			const active = row.value === 'Ativo';
			return (
				<Chip
					size="small"
					label={row.value}
					sx={{
						color: active ? 'success.dark' : 'error.dark',
						bgcolor: active ? '#81e4a2' : '#eb9797',
					}}
				/>
			);
		},
	},
	{
		field: 'actions',
		headerName: '',
		renderCell: ({ row }: GridRenderCellParams<IUser>) => {
			return <Actions status={row.status} userId={row.id} />;
		},
		type: 'actions',
	},
] as GridColDef[];

const StyledDataGrid = styled(CustomDataGrid)(({ theme }) => ({
	border: 'none',
	'& .inactive-user': {
		backgroundColor:
			theme.palette.mode === 'light'
				? 'rgba(0,0,0,0.05)'
				: 'rgba(255,255,255,0.05)',
	},
}));

export const Customers = () => {
	const { data: users, isFetching } = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const { data } = await api.get<IUser[]>('/users');

			return data;
		},
	});

	return (
		<Box>
			<Typography fontSize={24}>Usuários</Typography>
			<StyledDataGrid
				showQuickFilter
				showOrderBy
				showMultiFilter
				sx={{ mt: 3 }}
				loading={isFetching}
				rows={users || []}
				columns={columns}
				initialState={{
					pagination: { paginationModel: { pageSize: 10 } },
				}}
				pageSizeOptions={[10, 25, 50]}
				disableRowSelectionOnClick
				disableColumnSorting
				disableColumnMenu
				disableColumnSelector
				disableMultipleRowSelection
				getRowClassName={({ row }) => {
					const active = row.status === 'Ativo';
					return !active ? 'inactive-user' : '';
				}}
			/>
		</Box>
	);
};
