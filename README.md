# 🍍 gas-typescript-starter 🍩

Google Apps Script + TypeScript + lerna

## 事前準備

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
