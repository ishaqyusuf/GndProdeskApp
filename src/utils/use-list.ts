import { useState } from 'react';
import useConsole from './use-console';
import { fetchApi } from './use-fetch';
import useStorage from './use-storage';
import qs from 'qs';
import useForm from './use-form';
import { INIT_LIST, PATCH_LIST } from '@src/redux/reducers/list';
import { useDispatch, useSelector } from 'react-redux';

export type IDataState =
  | 'LOADING'
  | 'IDLE'
  | 'READY'
  | 'FAILED'
  | 'EMPTY'
  | 'LOADED'
  | 'REFRESHING'
  | 'LOADING_MORE';
interface IList {
  items: any[];
  query: any;
  type;
  extras: any;
  pager: any;
  fromCache;
  listName;
  length;
  filtered: Boolean;
  queried_at;
  focused;
  _url;
  focusedItem;

  filter: {};
  defaultFilter: {};
  filterable: {};
  state: IDataState;
}
const useList = (
  listName,
  {
    _key = 'id',
    _transform = null,
    _transformExtras = null,
    _items = [],
    _url = null,
    _query = {},
    _extras = {},
    _push = false,
    _cache = false,
    _debug = false,
    _init = true,
    _filter = {},

    _stateKey = null,
    ...args
  }
) => {
  const dispatch = useDispatch();
  const list = useSelector<any, IList>((state) => state.list[listName]);

  if (_init || !list) {
    if (list) {
      //
      if (!list.filtered && list.query == _query) return;
    }
    dispatch({
      type: INIT_LIST,
      listName,
      items: _items,
      extras: _extras,
      length: _items?.length ?? 0,
      filter: _filter,
      filtered: false,
      _url,
      filterable: getFiltrables(),
      defaultFilter: { ..._filter },
      query: _query,
    });
  }
  function getFiltrables() {
    let __ = {};
    Object.keys(_filter).map((f) => (__[f] = true));
    return __;
  }
  function setState(data: Partial<IList>) {
    dispatch({
      type: PATCH_LIST,
      listName,
      filter: _filter,
      ...data,
    });
  }
  function getCacheId() {
    return listName;
    // let allQuery = { ..._query };
    // let query = {};
    // Object.keys(allQuery)
    //   .sort()
    //   .filter((k) => k != 'page')
    //   .map((k) => (query[k] = allQuery[k]));
    // return [_url, qs.stringify(query)].join('?');
  }
  async function loadCache(_forceLoad) {
    setState({
      items: [],
      fromCache: false,
      length: 0,
    });
    if (_cache && !_forceLoad) {
      let _data = await useStorage.get(getCacheId());
      console.log('FINDING CACHE', _data);
      if (_data?.data?.length > 0) {
        useConsole.log('CACHE LOADING!', _data.data.length);
        setState({
          fromCache: true,
          ..._data.data,
        });
        useConsole.log('CACHE LOADED!', _data.data.length);
        useConsole.log(getCacheId());
        // initItems(_data.data);
        return true;
      }
    }
    return false;
  }
  function saveCache() {
    console.log('CACHING>>>>', list?.state, list?.length);
    if (_cache && list.items.length > 0 && !list.filtered) {
      useStorage.set(getCacheId(), {
        data: {
          ...list,
        },
      });
      console.log('CACHED', getCacheId(), list.length, list.pager);
    }
  }
  async function refresh() {
    setState({
      state: 'REFRESHING',
    });
    return _apiFetch();
  }
  async function load(url = null, _forceLoad = false) {
    if (_debug) useConsole.log(JSON.stringify(_query));
    if (list?.state == 'LOADED' && !_forceLoad) return;

    setState({
      state: 'LOADING',
      items: [],
    });
    // if (await loadCache(_forceLoad)) return;
    // if (list.length > 0) {
    //   console.log(list.length);
    //   return;
    // }
    // console.log('Query::', Filter.state);

    return _apiFetch(url);
    // console.log(url ?? list._url ?? _url);
    // return new Promise((resolve,reject) => {
    //   fetchApi({
    //     debug: _debug,
    //   })
    //     .get(url ?? list?._url, {
    //       ..._query,
    //       ...list.filter,
    //     })
    //     .then(({ data: items, meta: pager, ...extras }) => {
    //       initItems({ items, pager, extras });
    //       saveCache();
    //       resolve(null);
    //     })
    //     .catch((error) => {
    //       if (_debug) useConsole.log(JSON.stringify(error));
    //       reject(null)
    //     });
    // })
  }
  function initItems({ items, extras = null, pager = null }) {
    const _p = pager ?? { to: items?.length };
    // console.log('LENGTH>', _p);
    setState({
      items: _transformList(items),
      extras: transformExtras(extras ?? {}),
      pager: _p,
      length: _p.to,
      state: _p.to == 0 ? 'EMPTY' : 'LOADED',
    });
    if (_debug) useConsole.log('DATA LOADED');
  }
  function _transformList(items) {
    return items.map((i) => _transformItem(i));
  }
  function transformExtras(extras) {
    return _transformExtras ? _transformExtras(extras) : extras;
  }
  function _transformItem(item) {
    return _transform ? _transform(item) : item;
  }
  function composePager(pager, _default = {}) {
    const { current_page, from, to, count, per_page, total, last_page } = pager ?? _default;
    return {
      total,
      current_page,
      last_page,
      hasMore: last_page > current_page,
      count: count ?? current_page * per_page,
    };
  }
  function _apiFetch(url = null, extrasQuery = {}, s = {}) {
    let eq: any = {
      ..._query,
      // ...(list?.filter ?? {}),
      ...extrasQuery,
    };
    const more = eq?.page > 1;
    if (!more) eq.updated_at = list?.queried_at;
    else {
      console.log('MORE', eq);
    }
    // setState({
    //   state: more ? 'LOADING_MORE' : 'LOADING',
    // });

    return new Promise(async (resolve, reject) => {
      console.log(url, _url, list?._url);

      fetchApi({
        debug: _debug,
      })
        .get(url ?? _url ?? list?._url, eq)
        .then(({ data: items, meta, links, queried_at, ...extras }) => {
          let pager = composePager(meta, { count: items.length });

          // if (!_p.count) _p.count = _p.page * _p.per_page;
          let _items = [...(more ? list.items : []), ..._transformList(items)];
          setState({
            state: pager.count == 0 ? 'EMPTY' : 'LOADED',
            items: _items,
            length: _items.length,
            queried_at,
            extras: more ? list.extras : transformExtras(extras ?? {}),
            pager,
            ...s,
          });
          console.log(':::::::::::::::::: CURRENT PAGE', pager.current_page);
          saveCache();
          resolve(null);
        });
    });
  }
  async function loadMore() {
    if (list.state == 'LOADING_MORE') return;
    console.log(':::::::::::::LOADING MORE-');
    setState({
      state: 'LOADING_MORE',
    });
    console.log(list.pager);
    if (list.pager.hasMore) {
      return (
        _apiFetch(_url),
        {
          page: list.pager.current_page + 1,
        }
      );
    }
  }
  function getItemKey(item) {
    return _key ? item[_key] : item.id;
  }
  async function deleteItem(item) {
    let k = getItemKey(item);
    return new Promise((resolve) => {
      fetchApi({})
        .delete([_url, k], {})
        .then((d) => {
          resolve(d);
          setState({
            items: listHelper.removeById(k, list.items, _key),
          });
        });
    });
  }
  return {
    listName,
    state: list,
    refresh,
    // items: list.items,
    load,
    applyFilter(form) {
      console.log(form);
      // if (JSON.stringify(form) != JSON.stringify(list.filter)) {
      //   // _apiFetch(null, form, {
      //   //   filter: form,
      //   //   filtered: true,
      //   // });
      // }
    },
    clearFilter() {
      setState({
        filtered: false,
        filter: list.defaultFilter,
      });
      load();
    },
    // _state,
    initItems,
    deleteItem,
    // _pressed,
    // _pager,
    longPress(item) {
      // setPressedItem(item);
      // setPressed(true);
      setState({
        focused: true,
        focusedItem: item,
      });
      useConsole.log('LONG PRESSED');
    },
    closeOption() {
      setState({
        focused: false,
        focusedItem: null,
      });
    },
    _addItem(data) {
      setState({
        items: listHelper.updateItem(list.items, _transformItem(data), _key),
      });
    },
    async updateItem(form, id) {
      fetchApi({})
        .patch([_url, id], form)
        .then(({ data }) => {
          console.log(data);
          console.log(_key);
          setState({
            items: listHelper.updateItem(list.items, _transformItem(data), _key),
          });
          saveCache();
        });
    },
    async createItem(form) {
      return new Promise((resolve, reject) => {
        fetchApi({
          debug: true,
        })
          .post(_url ?? list?._url, form)
          .then(({ data }) => {
            console.log(data);
            let _items = [...list.items];
            let _item = _transformItem(data);
            if (_push) _items.push(_item);
            else _items.unshift(_item);
            setState({
              items: _items,
            });
            resolve(true);
          })
          .catch((e) => {
            resolve(false);
            console.log('FAILED!');
          });
      });
    },
    get hasMore() {
      return list?.state == 'READY' && list.pager.hasMore;
    },
    get isLoading() {
      return list?.state == 'LOADING';
    },
    get isLoadingMore() {
      return list?.state == 'LOADING_MORE';
    },
    get isEmpty() {
      return list?.state == 'EMPTY';
    },
    get isReady() {
      return list?.length > 0 && !this.isLoading;
    },
    get hasItems() {
      return list.length > 0;
    },
    loadMore,

    _removeItem(item) {
      setState({
        items: listHelper.remove(item, list.items, _key),
      });
    },
    _removeByKey(id) {
      setState({
        items: listHelper.removeById(id, list.items, _key),
      });
    },
    ...args,
  };
};

export function listDispatcher(state, dispatcher) {}
export let listHelper = {
  updateItem(list, item, _key = 'id') {
    console.log('UPDATING LIST');
    let index = list.findIndex((i) => i[_key] == item[_key]);
    console.log('INDEX>>>', index);
    if (index > -1) {
      return list.map((_item, _index) => {
        return _index == index ? item : _item;
      });
    }
    return list;
  },
  remove(item, list, _key = 'id') {
    let index = list.findIndex((i) => i[_key] == item[_key]);
    return this.removeIndex(index, list);
  },
  removeById(id, list, _key = 'id') {
    let index = list.findIndex((i) => i[_key] == id);
    return this.removeIndex(index, list);
  },
  removeIndex(index, list) {
    if (index > -1 && list?.length > index) {
      list.splice(index, 1);
    }
    return list;
  },
};

export default useList;
