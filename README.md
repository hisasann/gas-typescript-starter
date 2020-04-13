# 🍍 gas-typescript-starter 🍩

## Stack

* [Google Apps Script](https://developers.google.com/gsuite/aspects/appsscript?hl=ja)
* [TypeScript](https://www.typescriptlang.org/)
* [lerna](https://github.com/lerna/lerna/tree/master/commands/add#readme)

## Prerequisites

以下のモジュールをインストールしておきます。

### google/clasp

Using npm,

```bash
$ npm install -g @google/clasp
```

Using yarn,

```bash
$ yarn add global @google/clasp
```

[google/clasp: 🔗 Command Line Apps Script Projects](https://github.com/google/clasp)

## Usage

### npm モジュールをインストールする

ルートディレクトリで、 npm モジュールをインストールします。

```bash
$ yarn install
```

packages の中のモジュール互換をインストールするために、以下を実行します。

```bash
$ lerna bootstrap
```

### GAS にデプロイする

lerna や WebStorm からの Run だとうまく動かない。

パス的なのが何か問題になっているのかもしれない。

なので、確実なのは `yarn` 経由で実行すること。

```bash
$ cd packages/xxx
$ yarn push
```

### GAS を開く

```bash
$ cd packages/xxx
$ yarn open
```

## clasp create コマンドを実行する

```bash
$ clasp login
$ clasp create hello
Created new script: https://script.google.com/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/edit
Cloned 1 file.
└─ appsscript.json
```

これで `appsscript.json` （プロジェクトのマニフェストファイル）と `clasp.json` が作成されます。

## clasp open コマンドを実行する

ブラウザが起動し、 `Code.gs` ですぐプログラムがすぐに書ける状態になります。

```bash
$ clasp open
```

## clasp.json を編集する

`clasp.json` では、 GAS としてのルートパスを指定できるので、ここに ts のビルド後の .js ファイルが置かれる場所をしてしています。

```
{
  "scriptId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "rootDir": "./dist"
}
```

## Web アプリとして公開する方法

**doGet** 関数を用意します。

```js
function doGet() {
  const template = 'myfunction';    // html ファイル名から拡張子を抜いた文字列
  return HtmlService.createTemplateFromFile(template).evaluate();
}
```

次に、 GAS 上のメニューで「Publish」→「Deploy as web app」を選択します。

表示されるダイアログで `Project version` を **New** を選んでバージョンをインクリメントします。

これをしないと、 `clasp push` したとしても自動的にバージョンアップしてくれないので注意が必要です。

[GASでwebアプリの作成とパラメータの確認方法(doGet、doPost) | BREEZE](https://breezegroup.co.jp/201906/gas-get/)

[Google Apps Script でHTMLファイルを作って表示。 - Qiita](https://qiita.com/taromorimotohf/items/5e52cb9062600e8ccac3)

[Google Apps Scriptを使ってサーバーレスファンクションを作る - Qiita](https://qiita.com/hakaicode/items/0e2bc0e5b5e43ca12b42)

## GAS でのマルチファイルについて

    おそらく、サーバー側ではファイル名順にすべてのスクリプトファイルを結合してから、指定した関数を実行しているものと思われます。

[Google Apps Script（GAS）のプロジェクト内に複数のスクリプトファイルがある場合の実行順序 - Qiita](https://qiita.com/munieru_jp/items/0119ca5ee38caa23b8e4)

## HTML 側から GAS の関数を実行する方法について

### GAS 側の関数を呼び出す方法

```html
<button onClick="google.script.run.myFunction()">Call myFunction</button>
```

### GAS 側の関数を呼び出し、その後コールバック関数を呼び出してもらう方法

```html
<button onClick="google.script.run.withSuccessHandler(initializer).getSpreadsheetName('hoge')">Call initializer</button>
<script>
  window.initializer = function initializer(arg) {
    console.log(`initialized! ${arg}`);
  };
</script>
```

[GASのWebアプリでクライアント側JavaScriptからサーバー側の関数を呼び出す方法](https://tonari-it.com/gas-web-app-google-script-run/)

## 権限まわりでエラーが出た場合

    Exception: No item with the given ID could be found, or you do not have permission to access it.
    
以下の記事のように、

「File」->「Project properties」->「Scopes」何もなければ、 OAuth の認証がされていない可能性があります。

その場合は、適当な function を実行して権限を付与するダイアログを出して付与しましょう（この画面もけっこうわかりにくいです）

[GASのエラー”呼び出す権限がありません”はマニフェストファイルに問題あり - Qiita](https://qiita.com/h-sto/items/fdde0905d0a4070d18fc)

## monorepo の一つのパッケージの最終形態はこちら

    ├── README.md
    ├── __tests__
    │   └── hello.test.ts
    ├── appsscript.json
    ├── dist
    │   ├── appsscript.json
    │   └── hello.js
    ├── jest.config.js
    ├── node_modules
    ├── package.json
    ├── src
    │   └── hello.ts
    └── tsconfig.json

## 参考記事

[howdy39/gas-clasp-starter: A starter template for Google Apps Script by clasp](https://github.com/howdy39/gas-clasp-starter)

[GAS のGoogle謹製CLIツール clasp - Qiita](https://qiita.com/HeRo/items/4e65dcc82783b2766c03)

## Author

- [github/hisasann](https://github.com/hisasann)
- [twitter/hisasann](https://twitter.com/hisasann)

## License

MIT © [hisasann (Yoshiyuki Hisamatsu)](https://github.com/hisasann)
