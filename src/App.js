import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from '@mui/material/Container';
import DynamicSnackbar from './components/DynamicSnackbar';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar';
import Forecast from './pages/Forecast';
import Favorites from './pages/Favorites';
import Loading from './pages/Loading';

import { getCityByGeolocation } from './redux/slices/citySlice';

import { useStyles } from './styles';
import { useDispatch } from 'react-redux';

const App = () => {
  const [isLoading, setLoading] = useState(true);

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

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container
          maxWidth={false}
          disableGutters
          className={classes.appContainer}
        >
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
      )}
    </>
  );
};

export default App;
