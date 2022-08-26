import { fetchApi } from '@src/utils/use-fetch';
import { IDataState } from '@src/utils/use-list';
import useStorage from '@src/utils/use-storage';
import { useDispatch, useSelector } from 'react-redux';

interface IData {
  url;
  noCache;
  transform;
  cache;
  _default;
  query;
  validate(data: Partial<IData>);
  state: IDataState;
}
const initialState = {};
export function dataReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_DATA:
      return initData(action);
    case PATCH_DATA:
      return patchData(action);
    default:
      return state;
  }
  function initData({ type, dataName, ...data }) {
    return {
      ...state,
      [dataName]: state[dataName] ?? data,
    };
  }
  function patchData({ type, dataName, ...data }) {
    return {
      ...state,
      [dataName]: {
        ...(state[dataName] ?? {}),

        ...data,
      },
    };
  }
}
const INIT_DATA = 'INIT_DATA';
const PATCH_DATA = 'PATCH_DATA';
export function useData(dataName, { url, _default, ...args }: Partial<IData>) {
  const dispatch = useDispatch();
  const state = useSelector<any, any>((state) => state.data[dataName]);
  dispatch({
    type: INIT_DATA,
    dataName,
    state: 'IDLE',
    ...(_default ?? {}),
  });

  function isReady() {
    return state.state == 'READY';
  }

  async function loadCache(_forceLoad) {
    if (args.noCache && !_forceLoad) return false;
    let { data } = await useStorage.get(dataName, {});
    console.log('FINDING CACHE', dataName);
    if (data && data.state == 'READY') {
      console.log('CACHE FOUND', dataName, data);
      setState({
        ...data,
        state: 'READY',
      });
      console.log('VALIDATE', dataName, data.state);
      return true;
    }
  }
  function validate() {
    return args.validate ? args.validate(state) : state && state.state == 'READY';
    return state.state;
  }

  function saveCache(data) {
    console.log('SAVING CACHE', dataName);
    console.log('VALIDATED', validate());
    if (args.noCache) return false;
    useStorage.set(dataName, {
      data,
    });
    console.log('CACHED', dataName);
  }
  function transformData(data) {
    return {
      state: 'READY',
      ...(args.transform ? args.transform(data) : data),
    };
  }
  function setState(data: Partial<IData>) {
    dispatch({
      type: PATCH_DATA,
      dataName,
      ...data,
    });
  }
  async function load(_url = null, _forceLoad = false) {
    if (state?.state == 'READY' && !_forceLoad) return;
    setState({
      state: 'LOADING',
    });
    if (await loadCache(_forceLoad)) return;
    console.log('FRESH FETCH', dataName);
    fetchApi({})
      .get(url, args.query)
      .then((data) => {
        const td = transformData(data);
        setState(td);
        saveCache(td);
      });
  }
  function refresh() {
    load(null, true);
  }
  return {
    state,
    get isReady() {
      return validate();
    },
    validate,
    // isReady,
    refresh,
    load,
    setState,
    loadCache,
    saveCache,
  };
}
