import {createSlice} from '@reduxjs/toolkit';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_LIKED: 'SHOW_LIKED',
  SORT_BY_NAME: 'SORT_BY_NAME',
  SORT_BY_DATE: 'SORT_BY_DATE',
};

const filtersSlice = createSlice({
  name: 'visibilityFilters',
  initialState: VisibilityFilters.SHOW_ALL,
  reducers: {
    setVisibilityFilter(state, action) {
      return action.payload;
    },
  },
});

export const {setVisibilityFilter} = filtersSlice.actions;

export default filtersSlice.reducer;
