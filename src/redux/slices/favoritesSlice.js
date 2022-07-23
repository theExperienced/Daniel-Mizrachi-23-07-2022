import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import endPoints from '../../utils/endPoints';
import { setSnackbar } from './uiSlice';

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: {},
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const { Key, isOn, ...favoriteData } = action.payload;

      if (isOn) state.favorites[Key] = favoriteData;
      else delete state.favorites[Key];
    },
    setFavoritesCurrent: (state, action) => {
      Object.entries(action.payload).forEach(
        ([key, newData]) =>
          (state.favorites[key] = { ...state.favorites[key], ...newData })
      );
    },
  },
});

export const getFavoritesCitiesCurrentForecast =
  () => async (dispatch, getState) => {
    const favoriteCitiesKeys = Object.keys(getState().favorites.favorites);
    try {
      const res = await Promise.all(
        favoriteCitiesKeys.map((cityKey) =>
          axios.get(
            `${endPoints.BASE}${endPoints.CURRENT}${cityKey}?apikey=${process.env.REACT_APP_API_KEY}`
          )
        )
      );

      if (res) {
        const refinedData = res
          .map(({ data }, i) => {
            const {
              WeatherText,
              Temperature: { Metric, Imperial },
            } = data[0];

            return {
              description: WeatherText,
              current: { value: { c: Metric.Value, f: Imperial.Value } },
            };
          })
          .reduce((acc, curr, i) => {
            acc[favoriteCitiesKeys[i]] = {
              description: curr.description,
              current: curr.current,
            };

            return acc;
          }, {});

        dispatch(setFavoritesCurrent(refinedData));
      }
    } catch (error) {
      dispatch(
        setSnackbar({
          isOpen: true,
          message:
            'Failed to update favorites current weather, click to try again',
          handleAction: () => dispatch(getFavoritesCitiesCurrentForecast()),
        })
      );
    }
  };

export const { toggleFavorite, setFavoritesCurrent } = favoritesSlice.actions;

export default favoritesSlice.reducer;
