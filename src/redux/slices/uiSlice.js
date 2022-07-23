import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    snackBar: { isOpen: false },
  },
  reducers: {
    setSnackbar: (state, action) => {
      Object.entries(action.payload).forEach(
        ([prop, value]) => (state.snackBar[prop] = value)
      );
    },
  },
});

export const { setSnackbar } = uiSlice.actions;

export default uiSlice.reducer;
