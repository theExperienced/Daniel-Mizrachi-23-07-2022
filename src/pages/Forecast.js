import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery, useTheme } from '@mui/material';

import { toggleFavorite } from '../redux/slices/favoritesSlice';
import { getFullForecastAsync } from '../redux/slices/forecastSlice';

import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ForecastList from '../components/ForecastList';
import CustomAutocomplete from '../components/CustomAutocomplete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useStyles } from '../styles';

const Forecast = () => {
  const city = useSelector((state) => state.city.city);
  const isNeedRefetch = useSelector((state) => state.forecast.isNeedRefetch);
  const currentForecast = useSelector((state) => state.forecast?.current);
  const theme = useTheme();
  const queryMatch = useMediaQuery(theme.breakpoints.up('sm'));
  const isFavorite = useSelector(
    (state) => state.favorites.favorites?.[city?.Key]
  );
  const isF = useSelector((state) => state.forecast.isF);

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (city && isNeedRefetch) {
      dispatch(getFullForecastAsync(city.Key));
    }
  }, [city, isNeedRefetch]);

  const handleToggleFavorite = () => {
    dispatch(
      toggleFavorite({
        Key: city.Key,
        ...(isFavorite
          ? { isOn: false }
          : {
              isOn: true,
              name: city.LocalizedName,
              countryId: city.countryId,
              current: currentForecast,
            }),
      })
    );
  };

  return (
    <Grid
      container
      rowGap={queryMatch ? 3 : 8}
      sx={{
        pb: { sm: 3 },
      }}
    >
      <Grid item xs={12} sx={{ py: { md: 3 }, px: { md: 14 } }}>
        <Grid
          container
          rowGap={2}
          columnGap={2}
          justifyContent={queryMatch ? 'left' : 'center'}
          sx={{
            px: { xs: 3, lg: 0 },
          }}
        >
          <Grid item xs={queryMatch && 12}>
            <Typography
              align={queryMatch ? 'left' : 'center'}
              className={classes.forecastCityTitle}
            >
              {city?.LocalizedName}
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              alignItems='center'
              justifyContent={queryMatch ? 'start' : 'center'}
              columnGap={2}
              sx={{ height: '100%' }}
            >
              <Grid item>
                <Grid container alignItems='center' columnGap={2}>
                  <Grid item>
                    <Typography align='center'>
                      {currentForecast?.value &&
                        currentForecast?.value[isF ? 'f' : 'c'] + '°'}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleToggleFavorite}>
                      <Tooltip title='Add to favorites'>
                        <FavoriteBorderIcon
                          sx={{
                            fill: isFavorite ? 'red' : '',
                          }}
                        />
                      </Tooltip>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={!queryMatch && 12}
            order={{ xs: -1, sm: 0 }}
            alignItems='center'
          >
            <CustomAutocomplete />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          px: { xs: 3, lg: 14 },
        }}
      >
        <ForecastList days={5} />
      </Grid>
    </Grid>
  );
};

export default Forecast;
