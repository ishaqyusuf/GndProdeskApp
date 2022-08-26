const initialState = {};
export function listReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_LIST:
      return initList(action);
    case PATCH_LIST:
      return patchList(action);
    default:
      return state;
    // case LOAD_LIST:
    //   return loadList(action);
    // case FILTER_LIST:
    //   return filterList(action);
  }
  function patchList({ listName, type, ...data }) {
    return {
      ...state,
      [listName]: {
        ...(state[listName] ?? {}),

        ...data,
      },
    };
  }
  function initList({ type, listName, ...listOptions }) {
    console.log(listName, 'Initializing....');
    // console.log(Object.keys({ ...state }));
    return {
      ...state,
      [listName]: state[listName] ?? listOptions,
    };
  }
  function loadList({ type, listName }) {
    let list = state[listName];

    if (list) {
      //
    }

    return {
      ...state,
    };
  }
}
export const PATCH_LIST = 'PATCH_LIST';
export const LOAD_LIST = 'LOAD_LIST';
export const INIT_LIST = 'INIT_LIST';
export const FILTER_LIST = 'FILTER_LIST';

// function listLoading({displayName})
export const loadList = (list, query = {}) => {
  return async (dispatch) => {
    dispatch({
      type: PATCH_LIST,
      listName: list.listName,
      state: 'IDLE',
    });
    dispatch({
      type: LOAD_LIST,
      list,
    });
  };
};
