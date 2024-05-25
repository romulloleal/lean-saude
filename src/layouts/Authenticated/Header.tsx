import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {
	Brightness4,
	Brightness7,
	Menu as MenuIcon,
} from '@mui/icons-material';
import {
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	useTheme,
} from '@mui/material';

import { useAuth } from '@/Providers/auth/useAuth';
import { useColorMode } from '@/Providers/theme/useColorMode';
import { stringToColor } from '@/utils/stringToColor';

const navLinks = [
	{
		path: '/',
		label: 'Clientes',
	},
	{
		path: '/addresses',
		label: 'Endereços',
	},
	{
		path: '/deliveries',
		label: 'Entregas',
	},
];

export const Header = () => {
	const theme = useTheme();
	const { toggleColorMode } = useColorMode();
	const { authUser, signOut } = useAuth();
	const navigate = useNavigate();

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box
			border="1px solid rgba(0,0,0,0.1)"
			height="70px"
			px={2}
			display="flex"
			alignItems="center"
		>
			<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleOpenNavMenu}
					color="inherit"
				>
					<MenuIcon />
				</IconButton>
				<Menu
					id="menu-appbar"
					anchorEl={anchorElNav}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					open={Boolean(anchorElNav)}
					onClose={handleCloseNavMenu}
					sx={{
						display: { xs: 'block', md: 'none' },
					}}
				>
					{navLinks.map((link) => (
						<MenuItem
							key={link.path}
							onClick={() => {
								navigate(link.path);
								handleCloseNavMenu();
							}}
						>
							<Typography textAlign="center">{link.label}</Typography>
						</MenuItem>
					))}
				</Menu>
			</Box>

			<Box
				mr={5}
				display="flex"
				flexGrow={{ xs: 1, md: 0 }}
				fontSize={20}
				fontWeight={700}
			>
				<img src="./logo.png" width={50} />
			</Box>
			<Box
				flexGrow={1}
				display={{
					xs: 'none',
					md: 'flex',
				}}
				gap={5}
				height="100%"
			>
				{navLinks.map((link) => (
					<NavLink
						to={link.path}
						key={link.path}
						style={{ textDecoration: 'none' }}
					>
						{({ isActive }) => (
							<Typography
								borderBottom={isActive ? '2px solid' : 'none'}
								borderColor="primary.main"
								display="flex"
								alignItems="center"
								boxSizing="content-box"
								height="100%"
								fontWeight={500}
								fontSize={14}
								color={isActive ? 'primary.main' : '#6a6a6a'}
							>
								{link.label}
							</Typography>
						)}
					</NavLink>
				))}
			</Box>

			<Box flexGrow={0}>
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar
						alt={authUser?.name}
						style={{ backgroundColor: stringToColor(authUser?.name || '') }}
					>
						{authUser?.name.at(0)}
					</Avatar>
				</IconButton>
				<Menu
					sx={{ mt: '45px' }}
					id="menu-appbar"
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					<MenuItem
						onClick={(e) => {
							e.stopPropagation();
							toggleColorMode();
						}}
					>
						<Typography textAlign="center">
							{theme.palette.mode === 'dark' ? (
								<Brightness7 />
							) : (
								<Brightness4 />
							)}
						</Typography>
					</MenuItem>
					<MenuItem onClick={signOut}>
						<Typography textAlign="center">Sair</Typography>
					</MenuItem>
				</Menu>
			</Box>
		</Box>
	);
};
