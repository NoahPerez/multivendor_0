const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

export const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WP_SITE_URL ?? '',
  consumerKey:
    process.env.NEXT_CONSUMERKEY ??
    'ck_49312ef6281b31679511453663907f6450b3cf5b',
  consumerSecret:
    process.env.NEXT_CONSUMERSECRET ??
    'cs_9cb8a6c81653d3ff4cb9528e94de0ebf3c605f61',
  version: 'wc/v3',
});
