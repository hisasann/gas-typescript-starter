# 🍍 gas-typescript-starter 🍩

Google Apps Script + TypeScript + lerna

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
$ yarn gas:push
```

### GAS を開く

```bash
$ cd packages/xxx
$ yarn gas:open
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

大事なのは、 `appsscript.json` を `dist` に含めていることですね。

## 参考記事

[howdy39/gas-clasp-starter: A starter template for Google Apps Script by clasp](https://github.com/howdy39/gas-clasp-starter)

[GAS のGoogle謹製CLIツール clasp - Qiita](https://qiita.com/HeRo/items/4e65dcc82783b2766c03)

## Author

- [github/hisasann](https://github.com/hisasann)
- [twitter/hisasann](https://twitter.com/hisasann)

## License

MIT © [hisasann (Yoshiyuki Hisamatsu)](https://github.com/hisasann)
