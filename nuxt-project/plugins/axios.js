export default ({ $axios }) => {
  $axios.onRequest(config => {
    if (config.url.indexOf('api.github.com') + 1) {
      config.headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }
  });
};
