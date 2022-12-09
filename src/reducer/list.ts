import APIHelper from '../helpers/APIHelper';
import listHelper from '../helpers/list-helper';

export const projects = listStore('projects', {
  url: 'projects',
  formKeyName: 'slug',
});

export default function listStore(storeName, { url, formKeyName = 'id', query = {}, ...args }) {
  const initialState = {
    items: [],
    extras: {},
    filters: {},
    pager: {},
    state: 'IDLE' as 'IDLE' | 'LOADING' | 'LOADED' | 'LOADING_MORE' | 'EMPTY' | 'FAILED',
    empty: true,
    // isLoading: false,
    // isLoadingMore: false,
    canLoadMore: false,
    hasMore: false,
  };
  function formId(item) {
    return item[formKeyName];
  }
  function transform(item: any) {
    const _item = args.transform ? args.transform(item) : item;
    return {
      ..._item,
      ctx: {
        id: formId(_item),
      },
    };
  }
  function transformLoadedData(data: any) {
    return args.transformLoadedData ? args.transformLoadedData(data) : data;
  }
  function _transformExtras(extras) {
    return args.transformExtras ? args.transformExtras(extras) : extras;
  }
  function transformItems(_items: any[]) {
    return _items.map((item) => transform(item));
  }
  const load =
    (query = {}) =>
    async (dispatch, getState) => {
      // args.beforeLoad && args.beforeLoad();
      dispatch({
        type: LIST_LOADING,
      });
      fetchItems(dispatch);
    };
  const fetchItems = (dispatch) => {
    console.log('FETCHING ITEMS!....');
    APIHelper.get(url, {
      query,
    })
      .then((data) => {
        console.log('LIST FETCHED!');
        console.log(data);
        const { data: _items = [], meta, links, ...extras } = transformLoadedData(data);
        dispatch({
          type: LIST_LOADED,
          payload: {
            items: transformItems(_items),
            extras: _transformExtras(extras),
            pager: composePager(meta),
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: LIST_LOAD_FAILED,
        });
      });
  };
  const refreshItems = (dispatch) => {
    dispatch({
      type: REFRESHING_LIST,
    });
  };
  const loadMore = () => async (dispatch, getState) => {
    // args.beforeLoad && args.beforeLoad();
    const state = getState()[storeName];
    if (!state.pager.next_page) {
      //
      return;
    }
    dispatch({
      type: LOADING_MORE,
    });
    APIHelper.get(url, {
      query: {
        ...state.query,
        page: state.pager.next_page,
      },
    }).then((data) => {
      //   console.log(data);
      const { data: _items = [], meta, links, ...extras } = transformLoadedData(data);
      dispatch({
        type: LIST_LOADED,
        payload: {
          items: transformItems(_items),
          extras: _transformExtras(extras),
          pager: composePager(meta),
        },
      });
    });
    //
  };
  function composePager(meta) {
    const hasMore = meta.current_page < meta.last_page;
    return {
      pager: {
        ...meta,
        next_page: hasMore ? meta.current_page + 1 : null,
      },
      hasMore,
    };
  }

  const refreshWithQuery = (query) => async (dispatch, getState) => {
    //
  };
  const _ = {
    reducer: __reducer(initialState),
    load,
    loadMore,
    refresh: refreshItems,
    refreshWithQuery,
    onItemLongPress: (item) => (dispatch, getState) => {
      dispatch({
        type: ITEM_LONG_PRESS,
        payload: item,
      });
    },
    deleteItem: (item) => async (dispatch, getState) => {
      const { items } = await getState()[storeName];
      APIHelper.delete([url, formId(item)], {}).then((data) => {
        dispatch({
          type: ITEM_DELETED,
          payload: listHelper.removeById(items, formId(item)),
        });
      });
    },
  };
  return _;
}
function __reducer(initialState) {
  return (state = initialState, action) => {
    switch (action.type) {
      case LIST_LOAD_FAILED:
        return {
          ...state,
          state: 'FAILED',
        };
      case ITEM_DELETED:
        return {
          ...state,
          items: action.payload,
        };
      case ITEM_LONG_PRESS:
        return {
          ...state,
          longPressedItem: action.payload,
        };
      case LIST_LOADED: {
        return {
          ...state,
          ...action.payload,
          empty: action.payload.items.length == 0,
          state: 'LOADED',
          // isLoading: false,
          // isLoaded: true,
          // isLoadingMore: false,
          canLoadMore: action.payload.hasMore,
        };
      }
      case LOADING_MORE: {
        return {
          ...state,
          state: 'LOADING_MORE',
          canLoadMore: false,
        };
      }
      case REFRESHING_LIST:
        return {
          ...state,
          isRefreshing: true,
        };
      case LIST_LOADING: {
        return {
          ...initialState,
          state: 'LOADING',
          canLoadMore: false,
        };
      }
      default:
        return state;
    }
  };
}

export const LOAD_LIST = 'LOAD_LIST';
export const LIST_LOADED = 'LIST_LOADED';
export const LOADING_MORE = 'LOADING_MORE';
export const LIST_LOAD_FAILED = 'LIST_LOAD_FAILED';
export const LIST_LOADING = 'LIST_LOADING';
export const ITEM_LONG_PRESS = 'ITEM_LONG_PRESS';
export const REFRESHING_LIST = 'REFRESHING_LIST';
export const ITEM_DELETED = 'ITEM_DELETED';
