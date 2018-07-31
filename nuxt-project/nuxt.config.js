module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  // `yarn add @nuxtjs/axios -S`した axios が読み込まれ、
  // Vue コンポーネントや Vuex ストアからそのまま呼び出せるようになる
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv'],
  // '~/plugins/axios'は
  // axios をカスタマイズするための Interceptor（割り込み処理）
  // https://axios.nuxtjs.org/extend.html
  //
  // '~/plugins/logger'は
  // vue-routerのbeforEachフックを利用して
  // ページ遷移が行われるたびに、そのルーティングパスを
  // `console.log`で表示するプラグイン
  plugins: ['~/plugins/axios', '~/plugins/logger'],
  // `middleware/redirector.js`をグローバルで利用できるようになる
  router: {
    middleware: ['redirector'],
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
