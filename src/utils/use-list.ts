import { useState } from 'react';
import useConsole from './use-console';
import { fetchApi } from './use-fetch';
import useStorage from './use-storage';
import qs from 'qs';

const useList = ({
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
  _stateKey = null,
  ...args
}) => {
  const [_list, setList] = useState<any>([]);
  const [extras, setExtras] = useState<any>(_extras);
  const [_filter, _setFilter] = useState<any>({});
  const [_pager, _setPager] = useState<any>({});

  const [_state, setState] = useState('IDLE');

  const [_pressed, setPressed] = useState(false);
  const [_pressedItem, setPressedItem] = useState(null);
  const [_fromCache, setFromCache] = useState(false);
  function getCacheId() {
    let allQuery = { ..._query };
    let query = {};
    Object.keys(allQuery)
      .sort()
      .filter((k) => k != 'page')
      .map((k) => (query[k] = allQuery[k]));
    return [_url, qs.stringify(query)].join('?');
  }
  async function loadCache(_forceLoad) {
    setFromCache(false);
    setList([]);
    if (_cache && !_forceLoad) {
      let _data = await useStorage.get(getCacheId());
      if (_data?.data?.length > 0) {
        setFromCache(true);
        useConsole.log('CACHE LOADED!', _data.data.length);
        useConsole.log(getCacheId());
        initItems(_data.data);
      }
    }
    return _fromCache;
  }
  function saveCache() {
    if (_cache && _list.length > 0)
      useStorage.set(getCacheId(), {
        data: {
          ...(extras ?? {}),
          items: _list,
          pager: _pager,
          length: _list.length,
        },
      });
  }
  async function load(url = null, _forceLoad = false) {
    setState('LOADING');
    if (_debug) useConsole.log(JSON.stringify(_query));
    setList([]);
    await loadCache(_forceLoad);
    if (_list.length > 0) return;

    fetchApi({
      debug: _debug,
    })
      .get(url ?? _url, {
        ..._query,
        // ..._extraQuery
      })
      .then(({ data: items, meta: pager, ...extras }) => {
        initItems({ items, pager, extras });
        saveCache();
      })
      .catch((error) => {
        if (_debug) useConsole.log(JSON.stringify(error));
      });
  }

  function initItems({ items, extras, pager }) {
    setList(_transformList(items));
    // if (_debug) {
    //   useConsole.log('Extras');
    //   useConsole.log(JSON.stringify(extras));
    // }
    setExtras(transformExtras(extras ?? {}));
    _setPager(pager ?? { total: 0 }); // = pager;
    setState(pager.total == 0 ? 'EMPTY' : 'LOADED');
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
  function loadMore() {
    if (_pager.last_page > _pager.current_page) {
      setState('LOADING_MORE');
      fetchApi({
        debug: _debug,
      })
        .get(_url, {
          ..._query,
          ..._filter,
          page: _pager.current_page + 1,
        })
        .then(({ data: items, meta: pager }) => {
          setList([..._list, ..._transformList(items)]);
          if (pager) _setPager(pager);
          setState('LOADED');
          saveCache();
        });
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
          setList(listHelper.removeById(k, _list, _key));
        });
    });
  }
  return {
    _fromCache,
    // init,
    extras,
    load,
    _state,
    deleteItem,
    _pressed,
    _pager,
    longPress(item) {
      setPressedItem(item);
      setPressed(true);
      useConsole.log('LONG PRESSED');
    },
    closeOption() {
      setPressed(false);
    },
    async updateItem(form, id) {
      fetchApi({})
        .patch([_url, id], form)
        .then(({ data }) => {
          console.log(data);
          console.log(_key);
          setList(listHelper.updateItem(_list, _transformItem(data), _key));
        });
    },
    createItem(form) {
      fetchApi({})
        .post(_url, form)
        .then(({ data }) => {
          let _item = _transformItem(data);
          if (_push) _list.push(_item);
          else _list.unshift(_item);
          setList(_list);
        });
    },
    get isLoading() {
      return _state == 'LOADING';
    },
    get isLoadingMore() {
      return _state == 'LOADING_MORE';
    },
    get isEmpty() {
      return _state == 'EMPTY';
    },
    get isReady() {
      return _list.length > 0 && !this.isLoading;
    },
    get hasItems() {
      return _list.length > 0;
    },
    loadMore,
    setItems: setList,
    _filter,
    _setFilter,
    _removeItem(item) {
      setList(listHelper.remove(item, _list, _key));
    },
    _removeByKey(id) {
      setList(listHelper.removeById(id, _list, _key));
    },
    items: _list,
    ...args,
  };
};
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
