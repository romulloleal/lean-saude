import { TextField } from '@mui/material';
import { GridColType } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface Props {
	type?: GridColType;
	value: unknown;
	callback: (value: string) => void;
	disabled: boolean;
}

export const FilterInputValues = ({
	disabled,
	type,
	value,
	callback,
}: Props) => {
	if (type === 'date' || type === 'dateTime') {
		return (
			<DatePicker
				disabled={disabled}
				sx={{ minWidth: '150px' }}
				value={dayjs(value as string)}
				slotProps={{
					textField: {
						variant: 'standard',
						placeholder: 'Filtrar valor',
					},
				}}
				label="Valor"
				format="DD/MM/YYYY"
				onChange={(e) => callback(dayjs(e).format())}
			/>
		);
	}

	return (
		<TextField
			disabled={disabled}
			label="Valor"
			type={type === 'number' ? 'number' : 'text'}
			value={value}
			fullWidth
			sx={{ minWidth: '150px' }}
			variant="standard"
			onChange={(e) => callback(e.target.value)}
		/>
	);
};
