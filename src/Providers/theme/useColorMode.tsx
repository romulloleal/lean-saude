import { useContext } from 'react';

import { ColorModeContext } from '.';

export function useColorMode() {
	return useContext(ColorModeContext);
}
