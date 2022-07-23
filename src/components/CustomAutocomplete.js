import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import debounce from 'lodash/debounce';

import { getAutocompleteCitiesAsync, setCity } from '../redux/slices/citySlice';
import { setNeedRefetch } from '../redux/slices/forecastSlice';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CustomAutocomplete = () => {
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');

  const cities = useSelector((state) => state.city.autocompleteCities);

  const dispatch = useDispatch();

  const handleChange = (e, newValue) => {
    setValue(newValue);
    batch(() => {
      dispatch(
        setCity({
          Key: newValue.Key,
          LocalizedName: newValue.LocalizedName,
          countryId: newValue.countryId,
        })
      );
      dispatch(setNeedRefetch(true));
    });
  };

  const handleInputChange = (e, newInputValue) => {
    if (/^$|^[a-zA-Z\s]+$/.test(newInputValue)) {
      setInputValue(newInputValue);
      debouncedQuery(newInputValue);
    }
  };

  const debouncedQuery = debounce((inputValue) => {
    dispatch(getAutocompleteCitiesAsync(inputValue));
  }, 200);

  return (
    <Autocomplete
      fullWidth
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      clearOnBlur={false}
      options={cities || []}
      sx={(theme) => ({ [theme.breakpoints.up('sm')]: { width: 300 } })}
      getOptionLabel={(option) =>
        `${option.LocalizedName}, ${option.countryId}`
      }
      renderInput={(params) => (
        <TextField {...params} label='Search for city' size='small' />
      )}
    />
  );
};

export default CustomAutocomplete;
