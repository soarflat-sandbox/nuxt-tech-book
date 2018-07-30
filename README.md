# Learning Nuxt tech book

Learning [Nuxt tech book](https://booth.pm/ja/items/824745).

## Study Notes

### vue-cli のインストール

```
$ npm i @vue/cli @vue/cli-init
```

### Vue.js devtools のインストール

Vue.js での開発では必須の拡張機能。

[Vue.js devtools - Chrome Web Store](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)

### Nuxt プロジェクトのセットアップ

以下のコマンドで Nuxt プロジェクト用のボイラープレートが展開される。

```shell
$ vue init nuxt/starter nuxt-project
```

### ページコンポーネント

複数のコンポーネントが集約したページ単位のコンポーネント。

以下のように vue-router などでルーティングする際に、ルートのマッピングに指定しているコンポーネントを指していることもある。

```js
// Fooがページコンポーネント
const routes = [{ path: '/foo', component: Foo }];
```

### Nuxt のルーティングの自動生成

Nuxt プロジェクトの場合、ページコンポーネントは`pages`ディレクトリに格納する。

Nuxt は`pages`の状態に応じてルーティングを自動生成してくれる。

以下のような構造の場合

```
pages/
--| index.vue
--| about.vue
--| users/
-----| index.vue
-----| about.vue
-----| _id.vue
```

以下のように URL を解決してくれる。

```
/             -> index.vue
/about        -> about.vue
/users/       -> users/index.vue
/users/about  -> users/about.vue
/users/1      -> users/_id.vue
```

`index.vue`は`/`をサポートし、`_id`などで`_`で始まるものは、`/users/:id`形式をサポートしている。

名称は`_id`ではなく、`_name`や`_slug`などでも可能。

### `asyncData`メソッド

Vue.js の`data`メソッドの拡張メソッド。

- ルーティングの情報（パラメータ）
- Vuex ストア
- リダイレクト関数

などにアクセスできる。

Nuxt のページコンポーネントでは基本的に、`asyncData`を利用する。

### layouts によるレイアウトの共通化

Nuxt には、ページ毎の共通レイアウトを、Vue コンポーネントとして再利用するレイアウト機能がある。

以下のような「共通化したいモチベーション」と「共通化した場合に管理コストが増大する」という問題が共存している場合

- 共通化したいモチベーション: 基本的にはナビゲーションやヘッダを共通化して表示したい（ルートコンポーント上に定義したい）。
- 共通化した場合に管理コストが増大する: ルートコンポーント上に定義してしまうと、ログイン画面やトップページなど、表示したくないページで表示されていしまい不便。とは言えその解決のために下手に`v-if`で分岐するとルートコンポーネントが汚れてしまい、管理コストが増大する。

layouts を利用することで解決できる。

Nuxt にはデフォルトのレイアウトとして、`layouts`ディレクトリに`default.vue`が存在する。

こちらで、何も指定をしない場合は、`default.vue`が参照される。

`default.vue`の`<template>`は以下のようになっており、`<nuxt/>`に`page`ディレクトリのコンポーネントが描画される。

```js
<template>
  <div>
    <nuxt />
  </div>
</template>
```

### レイアウトファイル（`layouts`配下の Vue コンポーネント）のベストプラクティス

基本的な Web アプリケーションや Web サイトのトップページは LP であったり、ダッシュボードであったり、他のページとは大きく異なるデザインを適用することがほとんどである。

そのため、トップページ用のレイアウトファイル（`layouts/home.vue`など）を作成して、以下のようにトップページだけに`layout: 'home'`を指定した方が管理が楽になる。

```js
<script>
export default {
  layout: 'home'
}
</script>
```

### middleware

`request` / `response`オブジェクトに対して、そのルーティングの実処理の前後に割り込み、`request` / `response`オブジェクトを改ざんできる機能。

例えば、この機能を利用することで

- Cookie に格納された認証トークンを確認した上で、正しい認証トークンの場合は Vuex にストアに認証情報を追加する機能
- 日本時が英語ページに来た際に自動で日本語ページへとリダイレクトする機能

などの、Web アプリケーションの開発で頻繁に利用される割り込みを非常に簡単に実装できる。

特に Nuxt では`request` / `response`オブジェクトの改ざんだけではなく、上述のような Vuex ストアへのアクセスや 302 リダイレクトの発行などが可能なため、非常に柔軟に利用できる。

### middleware の利用方法

middleware の利用方法を 以下の 2 種類ある。

- `nuxt.config.js`に middleware の記述を追加する
- ページコンポーネントに直接記述する

`middleware/redirector.js`という middleware があるとしてそれぞれの利用方法を記載する。

#### `nuxt.config.js`に middleware の記述を追加する

`nuxt.config.js`に以下のように記述をすれば、グローバルで利用できる。

```js
module.exports = {
  router: {
    middleware: ['redirector'],
  },
};
```

#### ページコンポーネントに直接記述する

例えば、`_id.vue`というページコンポーネントにおいて、middleware を利用したい場合、以下のように記述をする。

```js
<script>
export default {
  middleware: 'redirector'
}
</script>
```

### middleware の注意点

- SPA モードでは動作しない（SSR モードにおいても、初期アクセス時のみ有効であり、SPA モードに一旦以降すれば、middleware 機能を失う）
- middleware の実行はサーバー側の作業の一環となるため、機能によってはレスポンス速度に影響を与える

middleware の利用は、ルーティングの認証昨日の実装程度に留めておいた方が良い。

### plugin

グローバルな拡張機能。

グローバルな Vue ライブラリの import や、Vue Router のフック登録などができる。

#### middlleware との違い

前述の通り、middleware は`request` / `response`オブジェクトの改ざんをする機能のため、リクエスト・レスポンスが主体以外の機能を追加したい場合は plugin を利用する。

### Vuex ストアの 2 つのモード

Nuxt の Vuex ストアには、以下の 2 つのモードがある

- クラシックモード
- モジュールモード

#### クラシックモード

単一の名前空間を持つ、大きな Vuex ストアをベースとし、必要に応じてモジュールを追加していくモード。

通常に Vue 開発に近いモードである。

#### モジュールモード

Nuxt の`store`ディレクトリ内にファイルを作成していき、`state`や`mutation`、`action`などをそれぞれ別にエクスポートすることで、Nuxt が自動で全てのファイルを名前空間付きのモジュールとして解釈し、Vuex ストアインスタンスにまとめてくれるモード。

例えば、`store`ディレクトリに以下のような`index.js`（ルートモジュール）と

```js
export const state = () => ({
  isLoading: false,
});

export const mutations = {
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
};
```

以下のような`user.js`（`index.js`以外は名前空間となったモジュール）がある場合

```js
export const state = () => ({
  list: [],
});

export const mutations = {
  addUser(state, user) {
    state.list.push(user);
  },
};

export const actions = {
  addUser({commit}, {user}) {
    commit('addUser'), user);
  }
};
```

自分で以下のような Vuex ストアを作成したときと同じ動作をする。

```js
new Vuex.Store({
  state: { isLoading: false },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  modules: {
    users: {
      state: {
        list: [],
      },
      mutations: {
        addUser(state, user) {
          state.list.push(user);
        },
      },
      actions: {
        addUser({ commit }, { user }) {
          commit('addUser', user);
        },
      },
    },
  },
});
```

モジュールモードを利用しようが、自分で Vuex ストアを作成しようが、結果として出力されるものは同じである。

そのため、名前空間付きで`map`メソッドを呼び出したい時は`mapAtions('users', ['addUser'])`などの形式で取得できる。

#### どちらのモードを利用するべきか

数ページの小規模アプリケーションであれば、クラシックモードで十分だが、それ以外ではモジュールモードを利用した方が良い（比較的管理が容易になり、名前空間の生成に無駄に悩む必要もないため）。
