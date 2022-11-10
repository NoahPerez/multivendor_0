export type WpRestApiVersion = 'wp/v2';
export type WpRestApiEncoding = 'utf-8' | 'ascii';
export type WpRestApiMethod = 'get' | 'post' | 'put' | 'delete' | 'options';

export interface WpRestApiOptions {
  /* Your Store URL, example: http://woo.dev/ */
  url: string;
  /* Your API consumer key */
  username: string;
  /* Your API consumer secret */
  code: string;
  /* Custom WP REST API URL prefix, used to support custom prefixes created with the `rest_url_prefix filter` */
  wpAPIPrefix?: string | undefined;
  /* API version, default is `v3` */
  version?: WpRestApiVersion | undefined;
  /* Encoding, default is 'utf-8' */
  encoding?: WpRestApiEncoding | undefined;
  /* When `true` and using under HTTPS force Basic Authentication as query string, default is `false` */
  queryStringAuth?: boolean | undefined;
  /* Provide support for URLs with ports, eg: `8080` */
  port?: string | undefined;
  /* Define the request timeout */
  timeout?: number | undefined;
  /* Define the custom Axios config, also override this library options */
  axiosConfig?: any;

  authurl: string;
}

export interface WpRestApiQuery {
  [key: string]: string;
}

export default class WpRestApi {
  classVersion?: string;
  url?: string;
  username?: string;
  code?: string;
  wpAPIPrefix?: string;
  version?: WpRestApiVersion;
  encoding?: WpRestApiEncoding;
  queryStringAuth?: boolean;
  port?: string;
  timeout?: number;
  axiosConfig: any;
  authurl?: string;

  /**
   * Class constructor.
   */
  // constructor(opt: WpRestApiOptions | WpRestApi);

  // /**
  //  * Set default options
  //  */
  // _setDefaultsOptions(opt: WpRestApiOptions): void;

  // /**
  //  * Parse params object.
  //  */
  // _parseParamsObject(params: any, query: any): WpRestApiQuery;

  // /**
  //  * Normalize query string for oAuth
  //  */
  // _normalizeQueryString(url: string, params: any): string;

  // /**
  //  * Get URL
  //  */
  // _getUrl(endpoint: string, params: any): string;

  // /**
  //  * Get OAuth
  //  */
  // _getOAuth(): any;

  // /**
  //  * Do requests
  //  */
  // _request(method: WpRestApiMethod, endpoint: string, data: any, params: any): Promise<any>;

  // /**
  //  * GET requests
  //  */
  // get(endpoint: string, params?: any): Promise<any>;

  // /**
  //  * POST requests
  //  */
  // post(endpoint: string, data: any, params?: any): Promise<any>;

  // /**
  //  * PUT requests
  //  */
  // put(endpoint: string, data: any, params?: any): Promise<any>;

  // /**
  //  * DELETE requests
  //  */
  // delete(endpoint: string, params?: any): Promise<any>;

  // /**
  //  * OPTIONS requests
  //  */
  // options(endpoint: string, params?: any): Promise<any>;
}

/**
 * Options Exception.
 */
export class OptionsException {
  message: string;

  /**
   * Constructor.
   */
  constructor(message: string) {
    this.message = message;
  }
}
