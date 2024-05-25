import { createContext, useState } from 'react';

interface IAuthUser {
	name: string;
	email: string;
}

interface AuthContextType {
	authUser: IAuthUser | null;
	signOut: () => Promise<void>;
	setAuthData: (userData: IAuthUser) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [authUser, setAuthUser] = useState<IAuthUser | null>(() => {
		const user = localStorage.getItem('user_data');

		if (user) {
			return JSON.parse(user);
		}

		return null;
	});

	const setAuthData = (userData: IAuthUser) => {
		localStorage.setItem('user_data', JSON.stringify(userData));
		setAuthUser(userData);
	};

	const signOut = async () => {
		setAuthUser(null);
		localStorage.removeItem('user_data');
	};

	return (
		<AuthContext.Provider
			value={{
				authUser,
				signOut,
				setAuthData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
