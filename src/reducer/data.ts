import APIHelper from '../helpers/APIHelper';

export default function dataStore(storeName, { url, query = {}, ...args }) {
  const initialState = {
    data: {},
    isLoading: false,
    state: 'IDLE',
    ...(args.initialState ?? {}),
  };
  function transform(data: any) {
    const _item = args.transform ? args.transform(data) : data;
    return _item;
  }
  const load = () => async (dispatch, getState) => {
    dispatch({
      type: DATA_LOADING,
    });
    if (args._load) {
      const data = await args._load();
      dispatch({
        type: DATA_LOADED,
        payload: transform(data),
      });

      return;
    }
    APIHelper.get(url, {
      query,
    }).then((data) => {
      //
      dispatch({
        type: DATA_LOADED,
        payload: transform(data),
      });
    });
  };
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case DATA_LOADING:
        return {
          ...state,
          state: 'LOADING',
          isLoading: true,
          loadingFailed: false,
          isLoaded: false,
        };
      case DATA_LOADED:
        return {
          ...state,
          state: 'LOADED',
          isLoading: false,
          loadingFailed: false,
          isLoaded: true,
          ...action.payload,
        };
      case DATA_LOADING_FAILED:
        return {
          ...state,
          state: 'LOADING_FAILED',
          isLoading: false,
          loadingFailed: true,
        };
      default:
        return state;
    }
  };
  const _ = {
    reducer,
    load,
  };
  return _;
}

export const DATA_LOADING = 'DATA_LOADING';
export const DATA_LOADED = 'DATA_LOADED';
export const DATA_LOADING_FAILED = 'LOAD_FAILED';
