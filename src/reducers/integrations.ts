import { ADD_PLUGIN } from '../actions/actionTypes';
import { Integrations } from '../actions/integrations/types';

const initialState = {
  plugins: Integrations,
};

export const integrationManager = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLUGIN:
      return Object.assign({}, state, {
        plugins: [...state.plugins, action.plugin],
      });
    default:
      return state;
  }
};
