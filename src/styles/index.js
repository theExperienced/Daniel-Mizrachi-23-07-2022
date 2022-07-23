import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  appContainer: {
    overflowX: 'hidden',
    minHeight: '100vh',
    paddingTop: '10vh',
  },
  mainDisplayContainer: {
    position: 'relative',
    minHeight: '90vh',
  },
  appBar: {
    '&.MuiPaper-root': {
      height: '10vh',
      background: theme.palette.navBar.background,
      boxShadow: `0 0 10px ${theme.palette.grey[900]}13`,
    },
  },
  appBarButton: {
    '&.MuiButton-root': {
      padding: '4px 1rem',
      borderRadius: '40px',
      border: `2px solid ${theme.palette.navBar.buttonBorder}`,
    },
  },
  forecastCityTitle: {
    '&.MuiTypography-root': {
      color: `${theme.palette.title.primary}20`,
      fontSize: '2.5rem',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        position: 'absolute',
        left: 0,
        fontSize: '15rem',
        fontWeight: 900,
        letterSpacing: '-20px',
        transform: 'translate(0,52%)   skewX(4deg)',
        backgroundImage:
          'radial-gradient(ellipse at 80% 160%, #00000026 40%, transparent 90%)',
        color: 'transparent',
        WebkitBackgroundClip: 'text',
        pointerEvents: 'none',
        // filter: 'blur(1px)',
      },
    },
  },
  favoriteItemContainer: {
    padding: '1rem',
    minHeight: '8rem',
    borderRadius: 4,
    backgroundColor: theme.palette.item.background,
  },
  forecastItemContainer: {
    borderRadius: 4,
    backgroundColor: theme.palette.item.background,
    // backgroundImage:
    //   'linear-gradient(0, rgba(255,255,255,.03),rgba(255,255,255,.24) )',
    // backdropFilter: 'blur(2px)',
  },
  favoriteItemItem: {
    cursor: 'pointer',
  },
  forecastDescription: {
    whiteSpace: 'pre-wrap',
  },
  forecastSkeletonItem: {
    borderRadius: '4px',
    backgroundColor: `${theme.palette.item.background}30`,
  },
  loadingContainer: {
    width: '100vw',
    height: '100vh',
    padding: '0 40vw',
    background: 'rgb(245, 245, 245)',
    [theme.breakpoints.down('sm')]: {
      padding: '0 10vw',
    },
  },
  loadingTitleItem: {
    zIndex: 0,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  loadingTitleAnimation: {
    position: 'relative',
    zIndex: 0,
    color: '#e5e5e5',
    textAlign: 'center',
    fontSize: '4rem',
  },
  loadingAnimationContainer: {
    height: '65vh',
    overflow: 'hidden',
    paddingTop: '18vh',
  },
  loadingCloudItem: {
    position: 'absolute',
    width: '100%',
    right: '-5rem',
    bottom: 0,
  },
  loadingCloud1: {
    '&.MuiTypography-root': {
      fontSize: '4rem',
      textShadow: '2px 4px 15px rgba(0,0,0,.06)',
      zIndex: -1,
    },
  },
  loadingCloud2: {
    '&.MuiTypography-root': {
      fontSize: '5rem',
      textShadow: '2px 4px 15px rgba(0,0,0,.06)',
      zIndex: 1,
    },
  },
  loadingCloud3: {
    '&.MuiTypography-root': {
      fontSize: '3rem',
      textShadow: '2px 2px 15px rgba(0,0,0,.1)',
      zIndex: -2,
    },
  },
  loadingCloud4: {
    '&.MuiTypography-root': {
      fontSize: '7rem',
      textShadow: '2px 5px 15px rgba(0,0,0,.1)',
      zIndex: 2,
    },
  },
}));
