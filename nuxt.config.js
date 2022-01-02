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
    ],
  },

  css: [{ src: '~/assets/sass/app.scss', lang: 'scss' }, 'bulma'],

  plugins: [],

  components: true,

  buildModules: [],

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

  axios: { baseURL: 'http://192.168.33.10:8000' },

  build: {},
}
