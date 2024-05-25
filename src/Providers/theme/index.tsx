import { createContext, useMemo, useState } from 'react';

import { ThemeProvider as MuiThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, useMediaQuery } from '@mui/material';
import { ptBR } from '@mui/material/locale';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import 'dayjs/locale/pt-br';

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const [mode, setMode] = useState<'light' | 'dark'>(() => {
		const colorMode = localStorage.getItem('colorMode') as 'light' | 'dark';
		if (colorMode) {
			return colorMode;
		}
		return prefersDarkMode ? 'dark' : 'light';
	});
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode(mode === 'light' ? 'dark' : 'light');
				localStorage.setItem('colorMode', mode === 'light' ? 'dark' : 'light');
			},
		}),
		[mode]
	);

	const theme = useMemo(
		() =>
			createTheme(
				{
					palette: {
						mode,
						primary: {
							main: '#9747FF',
						},
					},
					breakpoints: {
						values: {
							xs: 0,
							sm: 600,
							md: 900,
							lg: 1200,
							xl: 1536,
							tablet: 720,
						},
					},
				},
				ptBR
			),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<MuiThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
					<CssBaseline />
					{children}
				</LocalizationProvider>
			</MuiThemeProvider>
		</ColorModeContext.Provider>
	);
};
