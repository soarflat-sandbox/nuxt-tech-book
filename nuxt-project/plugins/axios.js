// axios をカスタマイズするための Interceptor（割り込み処理）
// 今回は $axios.onRequestに Interceptor が追加され
// ドメインのチェックを行なった上で認証ヘッダーをつけることが可能となった
export default function({ $axios }) {
  $axios.onRequest(config => {
    if (config.url.indexOf('api.github.com') + 1) {
      config.headers.Authorization = process.env.GITHUB_TOKEN;
    }
  });
}
