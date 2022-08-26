import useList from './use-list';
import React, { createContext, useContext, useMemo, useReducer } from 'react';

const AppStateContext = createContext<any>({});

function AppStateProvider(props) {
  const [state, setState] = useReducer(
    (state, action) => {
      return {
        ...state,
      };
    },
    {
      pageList: 'snull',
    }
  );
  const value = useMemo(() => {
    return {
      state,
      set(key, value) {
        console.log('APP SET STATE->', key);
        setState({
          [key]: value,
          ...state,
        });
      },
    };
  }, [state]);
  return <AppStateContext.Provider value={value}>{props.children}</AppStateContext.Provider>;
}

const AppState = () => useContext(AppStateContext);
export { AppState, AppStateContext };
export default AppStateProvider;
