import { useSelector, useDispatch } from 'react-redux';

import { setSnackbar } from '../redux/slices/uiSlice';

import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'center',
};

const DynamicSnackbar = () => {
  const isOpen = useSelector((state) => state.ui.snackBar.isOpen);
  const message = useSelector((state) => state.ui.snackBar?.message);
  const handleAction = useSelector((state) => state.ui.snackBar?.handleAction);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setSnackbar({ isOpen: false }));
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={
        <>
          {handleAction && <Button onClick={handleAction}>Go</Button>}
          <IconButton color='inherit' sx={{ p: 0.5 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </>
      }
      anchorOrigin={anchorOrigin}
    />
  );
};

export default DynamicSnackbar;
