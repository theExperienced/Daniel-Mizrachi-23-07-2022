import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from '@mui/material/Container';
import DynamicSnackbar from './DynamicSnackbar';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import Forecast from '../pages/Forecast';
import Favorites from '../pages/Favorites';

import { getCityByGeolocation } from '../redux/slices/citySlice';

import { useStyles } from '../styles';
import { useDispatch } from 'react-redux';

const MainDisplay = () => {
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition((position) => {
      dispatch(
        getCityByGeolocation(
          `${position.coords.latitude},${position.coords.longitude}`
        )
      );
    });
  }, []);

  return (
    <Container maxWidth={false} disableGutters className={classes.appContainer}>
      <NavBar />
      <Box
        sx={{
          pb: 8,
          pt: { xs: 6, md: 15 },
        }}
        className={classes.mainDisplayContainer}
      >
        <Switch>
          <Route exact path='/'>
            <Forecast />
          </Route>
          <Route path='/favorites'>
            <Favorites />
          </Route>
        </Switch>
      </Box>
      <DynamicSnackbar />
    </Container>
  );
};

export default MainDisplay;
