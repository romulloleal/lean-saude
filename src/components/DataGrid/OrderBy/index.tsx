import { useState } from 'react';

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
	Box,
	FormControl,
	FormControlLabel,
	MenuItem,
	Popover,
	Radio,
	RadioGroup,
	Select,
	Typography,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { OrderByType } from '../types/OrderByType';

interface Props {
	order: OrderByType;
	onChange: (order: OrderByType) => void;
	columns: GridColDef[];
}

export const OrderBy = ({ order, onChange, columns }: Props) => {
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

	const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const changeField = (field: string) => {
		const type = columns.find((column) => column.field === field)?.type;
		onChange({ ...order, field, type });
		handleClose();
	};

	const changeOrder = (newOrder: 'ASC' | 'DESC') => {
		onChange({ ...order, order: newOrder });
	};
	return (
		<>
			<Box display="flex" alignItems="center">
				<Box
					display="flex"
					alignItems="center"
					width="fit-content"
					sx={{ cursor: 'pointer' }}
					onClick={handleOpen}
				>
					<Typography fontSize={14} color="primary" fontWeight={500}>
						Ordenar por{' '}
						{columns.find((column) => column.field === order.field)?.headerName}
					</Typography>
					{!open && <KeyboardArrowDown color="primary" />}
					{open && <KeyboardArrowUp color="primary" />}
				</Box>

				{order.field && (
					<Select
						size="small"
						value={order.order}
						onChange={(e) => changeOrder(e.target.value as 'ASC' | 'DESC')}
					>
						<MenuItem value="ASC">Crescente</MenuItem>
						<MenuItem value="DESC">Decrescente</MenuItem>
					</Select>
				)}
			</Box>

			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<FormControl sx={{ paddingX: 2 }}>
					<RadioGroup
						value={order.field}
						onChange={(e) => changeField(e.target.value)}
					>
						{columns
							.filter(
								(column) =>
									column.headerName?.length || column.type !== 'actions'
							)
							.map((column) => (
								<FormControlLabel
									key={column.field}
									value={column.field}
									control={<Radio />}
									label={column.headerName}
								/>
							))}
					</RadioGroup>
				</FormControl>
			</Popover>
		</>
	);
};
