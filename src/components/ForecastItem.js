import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useStyles } from '../styles';

const ForecastItem = ({ description, range }) => {
  const theme = useTheme();
  const queryMatch = useMediaQuery(theme.breakpoints.down('md'));

  const classes = useStyles();

  return (
    <Grid
      item
      flexGrow={!queryMatch && 1}
      flexBasis={!queryMatch && '0%'}
      xs={queryMatch && 12}
      sx={{ p: 2, pb: 5 }}
      className={classes.forecastItemContainer}
    >
      <Typography className={classes.forecastDescription}>
        {description.day} during the night
      </Typography>
      <Typography className={classes.forecastDescription}>
        {description.night} at day
      </Typography>
      <Typography>
        {range.min}° - {range.max}°
      </Typography>
    </Grid>
  );
};

export default ForecastItem;
