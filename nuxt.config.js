export default {
  ssr: false,

  target: 'static',

  head: {
    title: 'いぬいのうた',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://kit.fontawesome.com/d2bc88bd60.js',
        crossorigin: 'anonymous',
      },
      { src: 'https://www.youtube.com/iframe_api' },
    ],
  },

  css: [{ src: '~/assets/sass/app.scss', lang: 'scss' }, 'bulma'],

  plugins: [
    '~/plugins/vue-youtube.js',
    '~/plugins/datas.js',
    '~/plugins/utils.js',
    '~/plugins/playlist.js',
    '~/plugins/controller.js',
    '~/plugins/font-awesome.js',
  ],

  components: true,

  modules: ['@nuxtjs/axios', 'nuxt-webfontloader', 'nuxt-fontawesome'],

  webfontloader: {
    google: {
      families: [
        'Zen+Kaku+Gothic+New:wght@500',
        'Zen+Maru+Gothic:wght@500',
        'Kosugi+Maru',
      ],
    },
  },

  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://uta.inui-dondon-sukininaru.net'
        : 'http://192.168.33.10:8000',
  },

  build: {},

  router: {
    base: '/inuinouta-demo/',
  },
}
