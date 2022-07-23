import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material';

const CustomLink = ({ children, to }) => {
  const theme = useTheme();

  return (
    <NavLink
      exact
      to={to}
      style={(isActive) => ({
        color: theme.palette.navLink[isActive ? 'active' : 'notActive'],
        textDecoration: 'none',
      })}
    >
      {children}
    </NavLink>
  );
};

export default CustomLink;
