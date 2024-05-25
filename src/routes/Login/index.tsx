import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';

import { useAuth } from '@/Providers/auth/useAuth';

import { useLogin } from './useLogin';

export const Login = () => {
	const { formik, isLoading } = useLogin();
	const { authUser } = useAuth();
	const location = useLocation();

	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	if (authUser) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return (
		<Grid container height="100dvh">
			<Grid
				item
				display="flex"
				xs={12}
				md={6}
				flexDirection="column"
				justifyContent="center"
				alignItems={{ xs: 'center', md: 'start' }}
				gap={5}
				paddingX={{ xs: '5%', md: '10%' }}
			>
				<img src="logo.png" />

				<Box display="flex" gap={2} flexDirection="column">
					<Typography variant="h6">Bem-vindo(a)</Typography>

					<Typography variant="subtitle1">
						Acesse sua conta para iniciar a sessão
					</Typography>
				</Box>

				<Box
					display="flex"
					component="form"
					onSubmit={formik.handleSubmit}
					style={{
						width: '100%',
						minWidth: '300px',
						maxWidth: '400px',
						gap: 20,
						flexDirection: 'column',
					}}
				>
					<TextField
						fullWidth
						id="email"
						name="email"
						label="Email"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>

					<TextField
						fullWidth
						id="password"
						name="password"
						label="Senha"
						type={showPassword ? 'text' : 'password'}
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
						InputProps={{
							endAdornment: (
								<InputAdornment
									position="end"
									sx={{ cursor: 'pointer' }}
									onClick={toggleShowPassword}
								>
									{showPassword && <VisibilityOff />}
									{!showPassword && <Visibility />}
								</InputAdornment>
							),
						}}
					/>

					<Link to="">
						<Typography color="primary.main">Esqueceu sua senha?</Typography>
					</Link>

					<Button
						size="small"
						variant="contained"
						sx={{ maxWidth: { lg: '50%' } }}
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? (
							<Box display="flex" alignItems="center" gap={1}>
								Acessando <CircularProgress size={20} />
							</Box>
						) : (
							'Acessar Plataforma'
						)}
					</Button>
				</Box>
			</Grid>
			<Grid
				item
				md={6}
				bgcolor="primary.main"
				display={{ xs: 'none', md: 'flex' }}
			/>
		</Grid>
	);
};
