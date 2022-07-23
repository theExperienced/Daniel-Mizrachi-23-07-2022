import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/system';

import { darkTheme, lightTheme } from '../theme';

const Theme = ({ children }) => {
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;
