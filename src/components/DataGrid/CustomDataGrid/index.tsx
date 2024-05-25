import { useMemo, useState } from 'react';

import { Close } from '@mui/icons-material';
import { Box, Grid, TextField } from '@mui/material';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';

import { MultiFilter } from '../MultiFilter';
import { OrderBy } from '../OrderBy';
import { FilterType } from '../types/FilterType';
import { OrderByType } from '../types/OrderByType';
import { filterList } from '../utils/filterList';
import { quickFilterList } from '../utils/quickFilterList';
import { sortList } from '../utils/sortList';

type Props = DataGridProps & {
	rows?: unknown[];
	columns: GridColDef[];
	showOrderBy?: boolean;
	showQuickFilter?: boolean;
	showMultiFilter?: boolean;
};

export const CustomDataGrid = ({
	rows,
	columns,
	showOrderBy,
	showQuickFilter,
	showMultiFilter,
	...rest
}: Props) => {
	const [searchText, setSearchText] = useState<string>('');
	const [filters, setFilters] = useState<FilterType[]>([]);
	const [orderBy, setOrderBy] = useState<OrderByType>({
		field: '',
		order: 'ASC',
	});
	const [logicalOperator, setLogicalOperator] = useState('AND');

	const clearSearch = () => setSearchText('');

	const filteredData = useMemo(
		() =>
			sortList(
				filterList(
					quickFilterList(rows || [], searchText),
					filters,
					logicalOperator
				),
				orderBy.field,
				orderBy.order,
				orderBy.type
			),
		[
			filters,
			logicalOperator,
			orderBy.field,
			orderBy.order,
			orderBy.type,
			rows,
			searchText,
		]
	);
	return (
		<Box>
			<Grid container mt={2} spacing={1} display="flex" alignItems="center">
				{/* FILTERS */}
				{showQuickFilter && (
					<Grid item xs={12} md={4} lg={3} xl={2}>
						<TextField
							label="Pesquisar ID ou nome ou telefone ou Data de cadastro ou status"
							size="small"
							fullWidth
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							placeholder=""
							InputProps={{
								endAdornment: !!searchText.length && (
									<Close
										fontSize="small"
										cursor="pointer"
										onClick={clearSearch}
									/>
								),
							}}
						/>
					</Grid>
				)}

				{(showOrderBy || showMultiFilter) && (
					<Grid
						item
						xs={12}
						md={8}
						lg={9}
						xl={10}
						display="flex"
						gap={1}
						alignItems="center"
					>
						{showOrderBy && (
							<OrderBy
								order={orderBy}
								onChange={setOrderBy}
								columns={columns}
							/>
						)}
						{showMultiFilter && (
							<MultiFilter
								columns={columns}
								filters={filters}
								setFilters={setFilters}
								logicalOperator={logicalOperator}
								setLogicalOperator={setLogicalOperator}
							/>
						)}
					</Grid>
				)}
			</Grid>

			{/* DATA GRID */}
			<Box sx={{ height: '60dvh' }}>
				<DataGrid
					rows={filteredData}
					columns={columns}
					{...rest}
					sx={{
						'& .MuiDataGrid-columnHeaderTitle': {
							fontWeight: 700,
						},
					}}
				/>
			</Box>
		</Box>
	);
};
