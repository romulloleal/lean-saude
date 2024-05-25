import { BrowserRouter, Route, Routes as GroupRoutes } from 'react-router-dom';

import { Authenticated } from '@/layouts/Authenticated';

import { Error404Page } from './404';
import { Customers } from './Customers';
import { Login } from './Login';

export const Routes = () => {
	return (
		<BrowserRouter>
			<GroupRoutes>
				<Route path="/" element={<Authenticated />}>
					<Route path="/" element={<Customers />} />
					<Route path="/addresses" element={<>Endereços</>} />
					<Route path="/deliveries" element={<>Entregas</>} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<Error404Page />} />
			</GroupRoutes>
		</BrowserRouter>
	);
};
