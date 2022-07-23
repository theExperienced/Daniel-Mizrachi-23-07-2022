import { combineReducers } from '@reduxjs/toolkit';

import forecastReducer from './slices/forecastSlice';
import cityReducer from './slices/citySlice';
import favoritesReducer from './slices/favoritesSlice';
import themeReducer from './slices/themeSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  forecast: forecastReducer,
  city: cityReducer,
  favorites: favoritesReducer,
  theme: themeReducer,
  ui: uiReducer,
});

export default rootReducer;
