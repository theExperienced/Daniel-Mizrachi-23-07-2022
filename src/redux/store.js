import { configureStore } from '@reduxjs/toolkit';
import storage from 'reduxjs-toolkit-persist/lib/storage/';
import { persistReducer, persistStore, createTransform } from 'redux-persist';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme', 'favorites'],
  transforms: [
    createTransform(
      (state) => {
        const newFavorites = {};
        Object.entries(state.favorites).forEach(
          ([cityKey, data]) =>
            (newFavorites[cityKey] = {
              name: data.name,
              countryId: data.countryId,
            })
        );

        return { ...state, favorites: newFavorites };
      },
      (state) => state,
      {
        whitelist: 'favorites',
      }
    ),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default persistStore(store);
