import axios from 'axios';
import Url from 'url-parse';
import { OptionsException, WpRestApiOptions } from './interfaces';

class WPRestApi {
  url?: string;
  wpAPIPrefix?: string;
  authurl?: string;
  version?: string;
  isHttps?: boolean;
  encoding?: string;
  queryStringAuth?: boolean;
  port?: string;
  timeout?: number;
  axiosConfig?: object;
  username?: string;
  code?: string;

  constructor(opt: WpRestApiOptions) {
    if (!(this instanceof WPRestApi)) {
      return new WPRestApi(opt);
    }

    opt = opt || {};

    if (!opt.url) {
      throw new OptionsException('url is required');
    }

    this._setDefaultsOptions(opt);
  }

  _setDefaultsOptions(opt: WpRestApiOptions) {
    this.url = opt.url;
    this.wpAPIPrefix = opt.wpAPIPrefix || 'wp-json';
    this.authurl = opt.authurl || 'jwt-auth/v1/token';
    this.version = opt.version || 'wp/v2';
    this.isHttps = /^https/i.test(this.url);
    this.encoding = opt.encoding || 'utf8';
    this.queryStringAuth = opt.queryStringAuth || false;
    this.port = opt.port || '';
    this.timeout = opt.timeout;
    this.axiosConfig = opt.axiosConfig || {};
    this.username = opt.username || '';
    this.code = opt.code || '';
  }

  _parseParamsObject(params: any, query: any) {
    for (const key in params) {
      const value = params[key];

      if (typeof value === 'object') {
        for (const prop in value) {
          const itemKey = key.toString() + '[' + prop.toString() + ']';
          query[itemKey] = value[prop];
        }
      } else {
        query[key] = value;
      }
    }

    return query;
  }

  /**
   * Normalize query string for oAuth
   *
   * @param  {String} url
   * @param  {Object} params
   *
   * @return {String}
   */
  _normalizeQueryString(url: string, params = {}) {
    // Exit if don't find query string.
    if (url.indexOf('?') === -1 && Object.keys(params).length === 0) {
      return url;
    }

    const query: any = new Url(url, null || '', true).query;
    const values = [];

    let queryString = '';

    // Include params object into URL.searchParams.
    this._parseParamsObject(params, query);

    for (const key in query) {
      values.push(key);
    }
    values.sort();

    for (const i in values) {
      if (queryString.length) {
        queryString += '&';
      }

      queryString += encodeURI(values[i])
        .replace(/%5B/g, '[')
        .replace(/%5D/g, ']');
      queryString += '=';
      queryString += encodeURI(query[values[i]]);
    }

    return url.split('?')[0] + '?' + queryString;
  }

  _getUrl(endpoint: string, params = {}, auth = false) {
    const api = this.wpAPIPrefix + '/';

    let url = this.url?.slice(-1) === '/' ? this.url : this.url + '/';

    if (auth) {
      url = url + api + this.authurl + '/' + endpoint;
    }
    if (!auth) {
      url = url + api + this.version + '/' + endpoint;
    }
    //Include port.
    if (this.port !== '') {
      const hostname = new Url(url).hostname;
      url = url.replace(hostname, hostname + ':' + this.port);
    }

    if (!this.isHttps) {
      return this._normalizeQueryString(url, params);
    }

    return url;
  }

  _request({
    method = '',
    endpoint = '',
    data = {},
    params = {},
    auth = false,
    token = null,
  }) {
    const url = this._getUrl(endpoint, params, auth);

    let options: any = {
      url: url,
      method: method,
      responseEncoding: this.encoding,
      timeout: this.timeout,
      responseType: 'json',
      headers: {
        'User-Agent': 'Wordpress REST API - JS Client/',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    if (data) {
      options.headers['Content-Type'] = 'application/json;charset=utf-8';
      options.data = JSON.stringify(data);
    }

    // Allow set and override Axios options.
    options = { ...options, ...this.axiosConfig };
    console.log({ options });
    return axios(options);
  }

  async auth(data: { [key: string]: string } = {}) {
    const params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);
    const dataAuth = await axios.post(this._getUrl('', {}, true), params);

    return dataAuth;
  }

  async token() {
    try {
      const params = new URLSearchParams();
      params.append('username', this.username || '');
      params.append('password', this.code || '');

      const {
        data: { token },
      } = await axios.post(this._getUrl('', '', true), params);

      if (!token) {
        return {
          status: 403,
          message: 'No autorizado',
        };
      }

      const status = await this._validate(token);

      if (status === 200) {
        return {
          status: 200,
          message: 'Ok',
          token,
        };
      }

      return {
        status: 403,
        message: 'Token no válido',
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async _validate(token: any) {
    try {
      const {
        data: {
          data: { status },
        },
      } = await this._request({
        method: 'post',
        endpoint: 'validate',
        auth: true,
        token,
      });

      return status;
    } catch (error) {
      console.log(error);
    }
  }

  get(endpoint: string, { params = {}, token = null }) {
    return this._request({
      method: 'get',
      endpoint,
      params,
      token,
    });
  }
}

export const apiWp = new WPRestApi({
  url: process.env.NEXT_PUBLIC_WP_SITE_URL || '',
  version: 'wp/v2',
  authurl: 'jwt-auth/v1/token',
  username: process.env.WP_CLIENT_USERNAME || '',
  code: process.env.WP_CLIENT_PASSWORD || '',
});
