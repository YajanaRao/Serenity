import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from './actionTypes';
import { Integrations } from './integrations';

let plugins: any[] = [];
export const __init__ = () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  console.log(Integrations);
  if (Integrations.length) {
    Integrations.forEach(intergration => {
      plugins[intergration.name] = import(
        `./integrations/${intergration.name}`
      );
      import(`./integrations/${intergration.name}`).then(obj => {
        let plugin = obj.default;
        let handler = new plugin();
        handler.getData().then(data => console.log(data));
      });
      // console.log("added", intergration.name);
      // plugins[intergration.name]();
    });
  }
  // plugins.forEach(plugin => {
  //   console.log("int plugin");
  //   let handler = new plugin();
  //   console.log("handler",handler);
  //   handler.getData();
  // })
};

export const addTodo = (text: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  dispatch({ type: ADD_TODO, text });
};
export const toggleTodo = (index: number) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  dispatch({ type: TOGGLE_TODO, index });
};
export const setVisibilityFilter = (filter: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  dispatch({ type: SET_VISIBILITY_FILTER, filter });
};
