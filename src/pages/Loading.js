import { motion } from 'framer-motion';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LoadingCloud from '../components/LoadingCloud';

import { useStyles } from '../styles';

const cloudAnimationDurations = [2, 1.4, 2.2, 1.1];

const Loading = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent='center'
      className={classes.loadingContainer}
    >
      <Grid item className={classes.loadingTitleItem}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, yoyo: Infinity }}
          className={classes.loadingTitleAnimation}
        >
          Loading
        </motion.p>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction='column'
          justifyContent='space-between'
          className={classes.loadingAnimationContainer}
        >
          <Grid item>
            <motion.div
              initial={{ y: -6 }}
              animate={{ y: 4 }}
              transition={{ duration: 1.3, yoyo: Infinity, ease: 'easeInOut' }}
            >
              <Typography
                align='center'
                sx={{
                  fontSize: '3rem',
                }}
              >
                ☀️
              </Typography>
            </motion.div>
          </Grid>
          <Grid item>
            <Grid container sx={{ position: 'relative' }}>
              {[...new Array(4)].map((_, i) => (
                <Grid item className={classes.loadingCloudItem}>
                  <LoadingCloud duration={cloudAnimationDurations[i]} i={i} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Loading;
