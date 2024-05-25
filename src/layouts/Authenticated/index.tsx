import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Box, Container } from '@mui/material';

import { useAuth } from '@/Providers/auth/useAuth';

import { Header } from './Header';

export const Authenticated = () => {
	const { authUser } = useAuth();
	const location = useLocation();

	if (!authUser) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return (
		<>
			<Header />
			<Box mt={3}>
				<Container maxWidth={false}>
					<Outlet />
				</Container>
			</Box>
		</>
	);
};
