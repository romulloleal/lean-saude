import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { App } from './App.tsx';
import { AuthProvider } from './Providers/auth/AuthProvider.tsx';
import { ThemeProvider } from './Providers/theme/index.tsx';

import './global.css';

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</AuthProvider>
		</QueryClientProvider>
	</React.StrictMode>
);