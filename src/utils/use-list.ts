import { useState } from 'react';
import useConsole from './use-console';
import { fetchApi } from './use-fetch';

const useList = ({
  _key = null,
  _transform = null,
  _transformExtras = null,
  _items = [],
  _url = null,
  _query = {},
  _push = false,
  ...args
}) => {
  const [_list, setList] = useState<any>([]);
  const [_extras, setExtras] = useState<any>({});
  const [_filter, _setFilter] = useState<any>({});
  const [_pager, _setPager] = useState<any>({});

  const [_state, setState] = useState('IDLE');

  const [_pressed, setPressed] = useState(false);
  const [_pressedItem, setPressedItem] = useState(null);
  function load(url = null) {
    setState('LOADING');
    fetchApi({})
      .get(url ?? _url, {
        ..._query,
        // ..._extraQuery
      })
      .then(({ data: items, meta: pager, ...extras }) => {
        setList(_transformList(items));
        useConsole.log('Extras');
        useConsole.log(JSON.stringify(extras));
        setExtras(transformExtras(extras ?? {}));
        _setPager(pager ?? { total: 0 }); // = pager;
        setState(pager.total == 0 ? 'EMPTY' : 'LOADED');
        console.log('DATA LOADED');
      });
  }
  function _transformList(items) {
    return _transform ? items.map((i) => _transform(i)) : items;
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
      fetchApi({})
        .get(_url, {
          ..._query,
          ..._filter,
          page: _pager.current_page + 1,
        })
        .then(({ data: items, meta: pager }) => {
          setList([..._list, _transformList(items)]);
          if (pager) _setPager(pager);
          setState('LOADED');
        });
    }
  }
  function getItemKey(item) {
    return _key ? item[_key] : item.id;
  }
  return {
    // init,
    load,
    _pressed,
    longPress(item) {
      setPressedItem(item);
      setPressed(true);
      useConsole.log('LONG PRESSED');
    },
    closeOption() {
      setPressed(false);
    },
    updateItem(form, id) {
      fetchApi({})
        .patch([_url, id], form)
        .then(({ data }) => {
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
    let index = list.findIndex((i) => i[_key] == item[_key]);
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
