import { BreakpointOverrides as DefaultBreakpoints } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface BreakpointOverrides extends DefaultBreakpoints {
		tablet: true;
	}
}
