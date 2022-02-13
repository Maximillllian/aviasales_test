export default {
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'aviasales_test',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/normalize.css',
    '~/assets/scss/style.scss',
    '~/assets/scss/_colors.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    ['@nuxtjs/google-fonts',
      {
        families: {
          "Open+Sans": {
            wght: [400, 600]
          }
        },
        display: 'swap',
        prefetch: false,
        preconnect: false,
        preload: false,
        download: true,
        base64: false,
      }
    ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-gsap-module'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  styleResources: {
    scss: [
        './assets/scss/*.scss',
    ]
}
}
