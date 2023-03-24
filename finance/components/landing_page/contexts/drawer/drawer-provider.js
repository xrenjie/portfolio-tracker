import React, { useMemo, useReducer } from 'react';
import { DrawerContext } from './drawer-context';

const initialState = {
  isOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
}
export function DrawerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}
