import { createTheme } from '@mantine/core';

export const theme = createTheme({
  /** Put your mantine theme override here */
  primaryColor: 'orange',
  primaryShade: { light: 5, dark: 5 },
  fontFamily: 'Roboto, sans-serif',
  focusRing: 'auto',
  defaultRadius: 'sm',
});
