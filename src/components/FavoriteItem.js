import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory } from 'react-router';

import { setCity } from '../redux/slices/citySlice';
import { resetData } from '../redux/slices/forecastSlice';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useStyles } from '../styles';

const FavoritesItem = (props) => {
  const { useKey, countryId, name, current } = props;
  const currentCityKey = useSelector((state) => state.city.city?.key);
  const isF = useSelector((state) => state.forecast.isF);

  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleVisit = () => {
    if (currentCityKey !== useKey) {
      batch(() => {
        dispatch(
          setCity({ Key: useKey, LocalizedName: name, countryId: countryId })
        );
        dispatch(resetData());
      });
    }
    history.replace('/');
  };

  return (
    <Grid
      container
      className={classes.favoriteItemContainer}
      onClick={handleVisit}
      sx={{ p: 2, pb: 5 }}
    >
      <Grid item xs={12}>
        <Typography>
          {name}, {countryId}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {current?.value
            ? 'Now: ' + current?.value?.[isF ? 'f' : 'c'] + '°'
            : ''}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FavoritesItem;
