import { motion } from 'framer-motion';

import Typography from '@mui/material/Typography';

import { useStyles } from '../styles';

const LoadingCloud = ({ duration, i }) => {
  const classes = useStyles();
  return (
    <motion.div
      initial={{ x: '10%' }}
      animate={{
        x: '-150%',
      }}
      transition={{
        duration,
        repeat: Infinity,
      }}
    >
      <Typography align='right' className={classes[`loadingCloud${i + 1}`]}>
        ☁
      </Typography>
    </motion.div>
  );
};

export default LoadingCloud;
