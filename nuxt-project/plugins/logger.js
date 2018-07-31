// vue-routerのbeforEachフックを利用して
// ページ遷移が行われるたびに、そのルーティングパスを
// `console.log`で表示するプラグイン
export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    console.log(`move to ${to.fullPath}`);
    next();
  });
};
