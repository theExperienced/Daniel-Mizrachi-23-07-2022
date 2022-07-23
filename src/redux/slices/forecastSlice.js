import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { cToF, fToC, refineForecastData } from '../../utils';
import axios from 'axios';
// import faker from 'faker';

import { setSnackbar } from './uiSlice';
import endPoints from '../../utils/endPoints';

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState: {
    current: {},
    fiveDay: [],
    isNeedRefetch: true,
    isF: true,
  },
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setFiveDay: (state, action) => {
      state.fiveDay = action.payload;
    },
    resetData: (state, action) => {
      state.isNeedRefetch = true;
      state.current = {};
      state.fiveDay = [];
    },
    setNeedRefetch: (state, action) => {
      state.isNeedRefetch = action.payload;
    },
    toggleUnit: (state, action) => {
      if (state.isF) {
        for (let i = 0; i < 5; i++) {
          state.fiveDay[i].range.min = fToC(state.fiveDay[i].range.min);
          state.fiveDay[i].range.max = fToC(state.fiveDay[i].range.max);
        }
      } else {
        for (let i = 0; i < 5; i++) {
          state.fiveDay[i].range.min = cToF(state.fiveDay[i].range.min);
          state.fiveDay[i].range.max = cToF(state.fiveDay[i].range.max);
        }
      }

      state.isF = !state.isF;
    },
  },
});

export const getCurrentAsync = (cityKey) => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      `${endPoints.BASE}${endPoints.CURRENT}${cityKey}?apikey=${process.env.REACT_APP_API_KEY}`
    );

    if (res.status === 200 || res.status === 201) {
      const {
        WeatherText,
        Temperature: { Metric, Imperial },
      } = res.data[0];

      dispatch(
        setCurrent({
          description: WeatherText,
          value: { c: Metric.Value, f: Imperial.Value },
        })
      );
    }
  } catch (error) {
    //ERROR HANDLED UNDER getFullForecastAsync CATCH BLOCK
  }
};

export const getFiveDayAsync = (cityKey) => async (dispatch, getState) => {
  const isF = getState().forecast.isF;

  try {
    const res = await axios.get(
      `${endPoints.BASE}${endPoints.FORECASTS}${
        endPoints.FIVE_DAY
      }${cityKey}?apikey=${process.env.REACT_APP_API_KEY}${
        !isF ? '&metric=true' : ''
      }`
    );
    if (res.status === 200 || res.status === 201) {
      const refinedData = refineForecastData(res.data, cityKey);
      dispatch(setFiveDay(refinedData));
    }
  } catch (error) {
    //ERROR HANDLED UNDER getFullForecastAsync CATCH BLOCK
  }
};

export const getFullForecastAsync = (cityKey) => async (dispatch) => {
  try {
    batch(() => {
      dispatch(resetData());
      dispatch(getCurrentAsync(cityKey));
      dispatch(getFiveDayAsync(cityKey));
      dispatch(setNeedRefetch(false));
    });
  } catch (error) {
    batch(() => {
      dispatch(resetData());
      dispatch(
        setSnackbar({
          isOn: true,
          message: 'Failed to fetch forecast data ,click to try again',
          handleAction: () => dispatch(getFullForecastAsync(cityKey)),
        })
      );
    });
  }
};

export const { setCurrent, setFiveDay, resetData, setNeedRefetch, toggleUnit } =
  forecastSlice.actions;

export default forecastSlice.reducer;
