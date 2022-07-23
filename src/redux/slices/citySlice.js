import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
// import faker from 'faker';
import { batch } from 'react-redux';

import { setSnackbar } from './uiSlice';
import endPoints from '../../utils/endPoints';
import { setNeedRefetch } from './forecastSlice';

// const allCities = () => {
//   let cities = [];

//   for (let i = 0; i < 100; i++) {
//     const city = {};
//     city.Key = faker.datatype.uuid();
//     city.LocalizedName = faker.name.firstName();
//     city.countryId = faker.name.lastName();
//     cities.push(city);
//   }

//   return cities;
// };

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    autocompleteCities: [],
    // allCities: allCities(),
    // city: {},
    city: { Key: 215854, LocalizedName: 'Tel Aviv', countryId: 'IL' },
  },
  reducers: {
    setAutocompleteCities: (state, action) => {
      state.autocompleteCities = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const getCityByGeolocation = (latLng) => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      `${endPoints.BASE}${endPoints.LOCATIONS}${endPoints.GEOPOSITION}?apikey=${process.env.REACT_APP_API_KEY}&q=${latLng}`
    );

    if (res.status === 200 || res.status === 201) {
      const {
        Key,
        LocalizedName,
        Country: { ID },
      } = res.data;

      const refinedData = {
        Key,
        LocalizedName,
        countryId: ID,
      };
      batch(() => {
        dispatch(setCity(refinedData));
        dispatch(setNeedRefetch(true));
      });
    }
  } catch (error) {
    dispatch(
      setSnackbar({
        isOn: true,
        message:
          'Could not fetch your current location, settling for Tel Aviv.',
      })
    );
  }
};

export const getAutocompleteCitiesAsync =
  (query) => async (dispatch, getState) => {
    try {
      const res = await axios.get(
        `${endPoints.BASE}${endPoints.LOCATIONS}${endPoints.AUTOCOMPLETE}?apikey=${process.env.REACT_APP_API_KEY}&q=${query}`
      );
      if (res.status === 200 || res.status === 201) {
        const refinedData = res.data.map(
          ({ Key, LocalizedName, Country: { ID } }) => ({
            Key,
            LocalizedName,
            countryId: ID,
          })
        );

        dispatch(setAutocompleteCities(refinedData));
      }
    } catch (error) {
      dispatch(
        setSnackbar({
          isOn: true,
          message: 'Failed to fetch list of cities, click to try again',
          handleAction: () => dispatch(getAutocompleteCitiesAsync(query)),
        })
      );
    }
  };

export const { setAutocompleteCities, setCity } = citySlice.actions;

export default citySlice.reducer;
