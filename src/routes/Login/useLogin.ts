import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '@/Providers/auth/useAuth';

export const useLogin = () => {
	const { setAuthData } = useAuth();
	const SignInSchema = Yup.object({
		email: Yup.string().email('Email inválido.').required('Informe seu email.'),
		password: Yup.string().required('Informe sua senha'),
	});

	const initialValues = {
		email: '',
		password: '',
	};

	const { mutateAsync, isPending: isLoading } = useMutation({
		mutationFn: async (loginData: { email: string; password: string }) => {
			// fake request call
			await new Promise(function (resolve) {
				setTimeout(resolve, 1000);
			});

			const userData = mockSignIn(loginData);

			setAuthData(userData);
		},
		onError: async (error) => {
			if (error.message === 'emailNotFound') {
				formik.setFieldError(
					'email',
					'Email não encontrado. Confira e tente novamente.'
				);
			}
			if (error.message === 'wrongPassword') {
				formik.setFieldError(
					'password',
					'Senha incorreta. Por favor, verifique e tente novamente.'
				);
			}
		},
	});

	const formik = useFormik({
		initialValues,
		onSubmit: async (values) => {
			await mutateAsync(values);
		},
		validationSchema: SignInSchema,
	});

	return { formik, isLoading };
};

const mockSignIn = ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const loginData = {
		name: 'Admin',
		email: 'admin@admin.com',
		password: '123456',
	};

	if (email !== loginData.email) {
		throw new Error('emailNotFound');
	}

	if (password !== loginData.password) {
		throw new Error('wrongPassword');
	}

	return { name: loginData.name, email };
};
