import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, useMediaQuery } from '@mui/material';

import { getFavoritesCitiesCurrentForecast } from '../redux/slices/favoritesSlice';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FavoritesItem from '../components/FavoriteItem';

import { useStyles } from '../styles';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const theme = useTheme();
  const queryMatch = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(getFavoritesCitiesCurrentForecast());
  }, []);

  return (
    <Grid
      container
      rowGap={2}
      columnGap={3}
      sx={{ py: { sm: 3 }, px: { xs: 3, md: 14 } }}
    >
      <Grid item xs={12}>
        <Typography
          align={queryMatch ? 'center' : 'left'}
          sx={{ fontSize: queryMatch ? '2rem' : '5rem' }}
        >
          Favorites
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {Object.keys(favorites).length !== 0 &&
            Object.entries(favorites).map(([key, favorite]) => {
              return (
                <Grid
                  item
                  xs={queryMatch ? 12 : 4}
                  key={key}
                  className={classes.favoriteItemItem}
                >
                  <FavoritesItem key={key} useKey={key} {...favorite} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Favorites;
