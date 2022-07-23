import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Skeleton from 'react-loading-skeleton';
import ForecastItem from './ForecastItem';

import { useStyles } from '../styles';

const ForecastList = () => {
  const forecast = useSelector((state) => state.forecast.fiveDay);

  const theme = useTheme();
  const queryMatch = useMediaQuery(theme.breakpoints.down('md'));

  const classes = useStyles();

  return (
    <Grid container columnGap={2} rowGap={2}>
      {forecast.length
        ? forecast.map(({ description, range }, i) => {
            return (
              <ForecastItem key={i} description={description} range={range} />
            );
          })
        : [...new Array(5)].map((_, i) => {
            return (
              <Grid
                item
                flexGrow={!queryMatch && 1}
                xs={queryMatch && 12}
                key={i}
                sx={{
                  pt: 2,
                  pb: 10,
                  px: 2,
                }}
                className={classes.forecastSkeletonItem}
              >
                <Skeleton count={3} />
              </Grid>
            );
          })}
    </Grid>
  );
};

export default ForecastList;
