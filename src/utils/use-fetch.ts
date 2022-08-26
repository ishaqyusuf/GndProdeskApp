import qs from 'qs';
import useDevice from './use-device';
import useStorage from './use-storage';
// let __url = 'https://api.gndprodesk.com';
let __url = 'http://localhost:8000';
export let fetchApi = (options: IApiOption = {}) => _fetchApi(__url, options);
let _fetchApi = (url, options: IApiOption = {}) => {
  options.log = [];
  function _printLog() {
    if (options.debug) {
      console.log('.');
      console.log('.');
      console.log('****API LOG START***');
      console.log('.');
      console.log('.');
      options.log.map((l) => {
        console.log(l);
      });
      console.log('.');
      console.log('****API LOG END****');
      console.log('.');
      console.log('.');
    }
  }
  function getUrl(path, query: any = null) {
    if (typeof path === 'string') {
      path = [path];
    }
    console.log('PATH>', path);
    let _url = path.filter(Boolean).join('/');

    return [url, `${_url}?${qs.stringify(query ?? {})}`].filter(Boolean).join('/');
  }
  let req = {
    get: async (url, query: any = null) => _fetch('GET', getUrl(url, query)),
    patch: async (url, data: any = null, query: any = null) =>
      _fetch('PUT', getUrl(url, query), getForm(data)),
    post: async (url, data: any, query: any = null) =>
      _fetch('POST', getUrl(url, query), getForm(data)),
    delete: async (url, query: any = {}) => _fetch('DELETE', getUrl(url, query)),
    save: async (url, data: any, id: any = null) =>
      id ? req.patch([url, id], getForm(data)) : req.post(url, getForm(data)),
  };
  function getForm(data) {
    if (options.upload) {
      let form = new FormData();
      Object.entries(data ?? {}).map(([k, v]) => form.append(k, v as any));
      return form;
    }
    options.log.push('FORM >>>>>> ' + JSON.stringify(data));
    return data;
  }

  async function _fetch(method, url, data: any = {}) {
    options.log.push(`URL :::::: ${url}`);
    let headers = await useFetchHeader(options);
    return new Promise<any>((_resolve, _reject) => {
      let body: any = options.upload
        ? new FormData()
        : method == 'GET'
        ? null
        : JSON.stringify(data);
      options.log.push(`FORM DATA: ${JSON.stringify(data)}`);

      if (options.upload) {
        Object.entries(data).map(([k, v]) => body.append(k, v));
      }

      fetch(url, {
        method,
        mode: 'cors',
        headers,
        body,
        //   body: JSON.stringify(data)
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { message, exception, trace, errors, error, success } = data;
          if (message && exception && trace) {
            options.log.push(message);
            options.log.push(exception);
            _reject(null);
          } else {
            if (options.debug) options.log.push(`Response: ${JSON.stringify(data)}`);
            if (error || errors) _reject(data?.error ?? data?.errors);
            else _resolve(data);
          }
          _printLog();
        });
      // .catch((error) => {
      //   options.log.push(`Error: ${error}`);
      //   _printLog();
      //   _reject(error);
      // });
      // _resolve({
      //   hello: 1,
      // });
    });
    // const promiseMe = new Promise<any>((_resolve, _reject) => {
    //   usePromise((p) => {
    //     p.reject = _reject;
    //     p.resolve = _resolve;
    //     return p;
    //   });
    // });

    // return promiseMe;
  }

  return req;
};
function getUrl(path, query: any = null) {
  if (typeof path === 'string') {
    path = [path];
  }
  let url = path.filter(Boolean).join('/');
  // options.log.push(url);
  const _q = query ?? {};
  return ['/', url, `?${qs.stringify({ ..._q, app: true })}`].filter(Boolean).join('');
}

async function useFetchHeader(options) {
  let _headers: any = await useHeader._get(options);
  if (options.debug) options.log.push(`HEADER: ${JSON.stringify(_headers)}`);

  let headers = new Headers();
  Object.entries({
    'Content-Type': options.upload ? 'multipart/form-data' : 'application/json',
    Accept: 'application/json',
    ...(_headers ?? {}),
  }).map(([k, v]) => headers.append(k, v as any));
  return headers;
}

export let useHeader = {
  key: '_header',
  __header: null,
  async init() {
    let data: any = await this.get();

    if (!data || !data['x-device-id']) {
      let device: any = useDevice.get();
      data = {
        'x-device-id': device.visitor_id,
        // "x-domain": useState.domain,
      };
      useStorage.set('_header', data);
    }
    this.setHeader(data);
  },
  async setHeader(h) {
    this.__header = h;
  },
  async logout() {
    // options.log.push("LOGOUT");
    let session: any = await this.get();
    if (session) {
      delete session['x-token'];
      useStorage.set('_header', session);
      this.setHeader(session);
    } else {
      this.init();
    }
  },
  login(token) {
    this.set('x-token', token);
  },
  async set(key, value) {
    let _: any = await this.get();
    _[key] = value;
    useStorage.set(this.key, {
      ..._,
    });
  },
  async _get(options) {
    if (this.__header == {} || !this.__header) {
      await this.init();
      // if(options.debug)
      options.log.push('INITIALIZING HEADER');
    }
    return this.__header;
  },
  async get() {
    let _ = await useStorage.get(this.key);
    // options.log.push('HEADER =>', _);
    return _;
  },
};
export interface IApiOption {
  success?: String;
  domain?: String;
  alert?: String;
  upload?: Boolean;
  debug?: Boolean;
  _list?: any;
  _form?: any;
  _dialog?: any;
  error?: String;
  silent?: Boolean;
  simple?: Boolean;
  hideError?: Boolean;
  softCache?: Boolean;
  deepCache?: Boolean;
  onSuccess?(data: any): any;
  onError?(error: any): any;
  formKeyName?: string;
  print?: any;
  errorAlert?: Boolean;
  page?: Boolean;
  log?: any;
}
