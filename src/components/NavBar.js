import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery, useTheme } from '@mui/material';

import { toggleUnit } from '../redux/slices/forecastSlice';
import { toggleMode } from '../redux/slices/themeSlice';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CustomLink from './CustomLink';

import { useStyles } from '../styles';

const NavBar = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const isF = useSelector((state) => state.forecast.isF);

  const theme = useTheme();
  const queryMatch = useMediaQuery(theme.breakpoints.up('sm'));
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleToggleUnit = () => {
    dispatch(toggleUnit());
  };

  const handleToggleTheme = () => {
    dispatch(toggleMode());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{
          px: { xs: 0, sm: 11 },
        }}
        className={classes.appBar}
      >
        <Toolbar sx={{ p: 0, px: { xs: 3, sm: 0 }, height: '100%' }}>
          <Grid container alignItems='center' rowGap={1} columnGap={2}>
            <Grid
              item
              xs={!queryMatch && 12}
              order={{ xs: 2, sm: 0 }}
              alignItems='center'
              sx={{ mr: 'auto' }}
            >
              <Grid container columnGap={2} justifyContent='center'>
                <Grid item>
                  <CustomLink exact to='/'>
                    Foreacst
                  </CustomLink>
                </Grid>
                <Grid item>
                  <CustomLink exact to='/favorites'>
                    Favorites
                  </CustomLink>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                onClick={handleToggleTheme}
                className={classes.appBarButton}
              >
                {themeMode === 'light' ? 'Light' : 'Dark'}
              </Button>
            </Grid>
            <Grid item sx={{ mr: queryMatch ? '' : 'auto' }}>
              <Button
                onClick={handleToggleUnit}
                className={classes.appBarButton}
              >
                {isF ? 'F' : 'C'}&#176;
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
