import { useEffect, useState } from 'react';

import {
	Add,
	Close,
	DeleteOutline,
	KeyboardArrowDown,
	KeyboardArrowUp,
} from '@mui/icons-material';
import {
	Badge,
	Box,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Popover,
	Select,
	Typography,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { FilterType } from '../types/FilterType';
import { FilterInputValues } from './FilterInputValues';
import { filterOperators } from './filterOperators';

interface Props {
	columns: GridColDef[];
	filters: FilterType[];
	setFilters: (filter: FilterType[]) => void;
	logicalOperator: string;
	setLogicalOperator: (value: string) => void;
}

export const MultiFilter = ({
	columns,
	filters,
	setFilters,
	logicalOperator,
	setLogicalOperator,
}: Props) => {
	const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);

	useEffect(() => {
		addFilter();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOpen = (event: React.MouseEvent<HTMLSpanElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const addFilter = () => {
		const filter: FilterType = {
			id: new Date().getTime(),
			column: '',
			operator: '',
			value: '',
		};
		setFilters([...filters, filter]);
	};

	const removeFilter = (id: number) => {
		if (filters.length === 1) {
			removeAll();
		} else {
			setFilters(filters.filter((filter) => filter.id !== id));
		}
	};

	const removeAll = () => {
		setFilters([
			{
				id: new Date().getTime(),
				column: '',
				operator: '',
				value: '',
			},
		]);
	};

	const changeFilterColumn = (id: number, value: string) => {
		const selectedFilter = filters.find((filter) => filter.id === id);
		const type = columns.find((column) => column.field === value)?.type;
		const operator = filterOperators(type)[0].value;

		if (selectedFilter) {
			const newFilters = filters.map((filter) => {
				if (filter.id === id) {
					return { ...filter, column: value, type, value: '', operator };
				}
				return filter;
			});

			setFilters(newFilters);
		}
	};

	const changeFilter = (id: number, key: string, value: unknown) => {
		const selectedFilter = filters.find((filter) => filter.id === id);

		if (selectedFilter) {
			const newFilters = filters.map((filter) => {
				if (filter.id === id) {
					return { ...filter, [key]: value };
				}
				return filter;
			});

			setFilters(newFilters);
		}
	};

	const open = Boolean(anchorEl);
	return (
		<>
			<Badge
				color="primary"
				sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
				onClick={handleOpen}
				badgeContent={filters.filter((filter) => filter.value).length}
			>
				<Typography fontSize={14} color="primary" fontWeight={500}>
					Filtros
				</Typography>
				{!open && <KeyboardArrowDown color="primary" />}
				{open && <KeyboardArrowUp color="primary" />}
			</Badge>

			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Box
					padding={2}
					display="flex"
					flexDirection="column"
					gap={2}
					sx={{ overflowX: 'auto' }}
				>
					<ColumnFilters
						filters={filters}
						columns={columns}
						removeFilter={removeFilter}
						changeFilter={changeFilter}
						changeFilterColumn={changeFilterColumn}
						logicalOperator={logicalOperator}
						setLogicalOperator={setLogicalOperator}
					/>

					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						minWidth="100%"
					>
						<Typography
							fontSize={14}
							gap={1}
							color="primary"
							display="flex"
							alignItems="center"
							sx={{ cursor: 'pointer' }}
							onClick={addFilter}
						>
							<Add /> Adicionar filtro
						</Typography>

						<Typography
							fontSize={14}
							gap={1}
							color="error"
							display="flex"
							alignItems="center"
							sx={{ cursor: 'pointer' }}
							onClick={removeAll}
						>
							<DeleteOutline /> Remover todos
						</Typography>
					</Box>
				</Box>
			</Popover>
		</>
	);
};

const ColumnFilters = ({
	filters,
	columns,
	removeFilter,
	changeFilter,
	changeFilterColumn,
	logicalOperator,
	setLogicalOperator,
}: {
	filters: FilterType[];
	columns: GridColDef[];
	removeFilter: (id: number) => void;
	changeFilter: (id: number, key: string, value: unknown) => void;
	changeFilterColumn: (id: number, value: string) => void;
	logicalOperator: string;
	setLogicalOperator: (value: string) => void;
}) => {
	return filters.map((filter, index) => (
		<Grid
			key={index}
			container
			display="flex"
			alignItems="center"
			wrap="nowrap"
		>
			<Grid item>
				<IconButton onClick={() => removeFilter(filter.id)}>
					<Close fontSize="small" />
				</IconButton>
			</Grid>
			<Grid item minWidth={filters.length > 1 ? 70 : 0}>
				{index > 0 && (
					<FormControl size="small">
						<Select
							disabled={index > 1}
							value={logicalOperator}
							onChange={(e) => setLogicalOperator(e.target.value)}
						>
							<MenuItem value="AND">e</MenuItem>
							<MenuItem value="OR">ou</MenuItem>
						</Select>
					</FormControl>
				)}
			</Grid>
			<Grid item>
				<FormControl sx={{ width: '150px' }} variant="standard">
					<InputLabel id="column-select">Coluna</InputLabel>
					<Select
						value={filter.column}
						labelId="column-select"
						onChange={(e) => changeFilterColumn(filter.id, e.target.value)}
					>
						{columns
							.filter((column) => column.headerName?.length)
							.map((column) => (
								<MenuItem key={column.field} value={column.field}>
									{column.headerName}
								</MenuItem>
							))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item>
				<FormControl sx={{ width: '150px' }} variant="standard">
					<InputLabel id="operator-select">Operação</InputLabel>
					<Select
						value={filter.operator}
						labelId="operator-select"
						onChange={(e) =>
							changeFilter(filter.id, 'operator', e.target.value)
						}
					>
						{filterOperators(filter.type).map((operator, index) => (
							<MenuItem key={index} value={operator.value}>
								{operator.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item>
				<FormControl sx={{ width: '150px' }} variant="standard">
					<FilterInputValues
						type={filter.type}
						value={filter.value}
						callback={(value) => changeFilter(filter.id, 'value', value)}
						disabled={!filter.column.length}
					/>
				</FormControl>
			</Grid>
		</Grid>
	));
};
