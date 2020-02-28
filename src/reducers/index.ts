import { combineReducers } from 'redux';
import { libraryManager } from './library';
import { visibilityFilter } from './visibilityFilter';
import { integrationManager } from './integrations';

export const RootReducer = combineReducers<any>({
  library: libraryManager,
  integrations: integrationManager,
  visibilityFilter,
});

export type RootReducerType = ReturnType<typeof RootReducer>;
