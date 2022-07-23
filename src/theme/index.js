import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, Raleway, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: { background: theme.palette.background.forecast },
      }),
    },
  },
});

const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#26a27b',
    },
    secondary: {
      main: '#fafafa',
    },
    background: { forecast: '#544d4e', favorites: '#5e3a3f' },
    title: { primary: '#ffffff' },
    navBar: {
      background: theme.palette.grey[700],
      buttonBorder: `${theme.palette.grey[200]}30`,
    },
    navLink: {
      active: theme.palette.grey[200],
      notActive: theme.palette.grey[400],
    },
    item: { background: theme.palette.grey[600] },
  },
});

const lightTheme = createTheme({
  ...theme,
  palette: {
    mode: 'light',
    primary: {
      main: '#fafafa',
    },
    secondary: {
      main: '#26a27b',
    },
    background: { forecast: '#e8dfe0', favorites: '#d48590' },
    title: { primary: '#000000' },
    navBar: {
      background: theme.palette.grey[400],
      buttonBorder: `${theme.palette.grey[700]}30`,
    },
    navLink: {
      active: theme.palette.grey[700],
      notActive: theme.palette.grey[500],
    },
    item: { background: theme.palette.grey[400] },
  },
});

export { darkTheme, lightTheme };
