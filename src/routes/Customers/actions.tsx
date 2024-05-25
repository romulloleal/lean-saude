import { useState } from 'react';

import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Popover, Switch, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IUser } from '@/interfaces/IUser';
import { api } from '@/service/api';

interface Props {
	userId: string;
	status: string;
}

export const Actions = ({ status, userId }: Props) => {
	const queryClient = useQueryClient();
	const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);

	const isActive = status === 'Ativo';

	const handleOpen = (event: React.MouseEvent<HTMLSpanElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const { mutate } = useMutation({
		mutationFn: async () => {
			await api.patch(`/users/${userId}`, {
				status: isActive ? 'Inativo' : 'Ativo',
			});

			await queryClient.setQueryData(['users'], (previous: IUser[]) => {
				return previous.map((prev) => {
					if (prev.id === userId) {
						return { ...prev, status: isActive ? 'Inativo' : 'Ativo' };
					}
					return prev;
				});
			});
		},
	});

	const open = Boolean(anchorEl);
	return (
		<>
			<IconButton onClick={handleOpen}>
				<MoreVert />
			</IconButton>

			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Box padding={2} display="flex" alignItems="center" gap={2}>
					Status
					<Switch checked={isActive} onClick={() => mutate()} />
					<Typography fontSize={14}>{status}</Typography>
				</Box>
			</Popover>
		</>
	);
};
