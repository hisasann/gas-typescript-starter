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

### lerna

Using npm,

```bash
$ npm install -g lerna
```

Using yarn,

```bash
$ yarn add global lerna
```

[lerna/lerna: A tool for managing JavaScript projects with multiple packages.](https://github.com/lerna/lerna)

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

### lerna パッケージを作成する

一般公開する npm module ではないので `private: true` で作成します。

```bash
lerna create hello --private
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

## Google Apps Script APIの有効化する

```bash
$ clasp create hello
Error: Permission denied. Enable the Apps Script API:
https://script.google.com/home/usersettings
```

`clasp create` でエラーがでてしまう場合は、

`https://script.google.com/home/usersettings`

にて、 **オン** にしてあげます。（ぼくはデフォルトはオフでした）

[GAS のGoogle謹製CLIツール clasp - Qiita](https://qiita.com/HeRo/items/4e65dcc82783b2766c03#google-apps-script-api%E3%81%AE%E6%9C%89%E5%8A%B9%E5%8C%96)

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

## 環境変数の使い方

ハードコードしないほうがよさそうなものは、 **Script properties** （環境変数）を使いましょう。

「File」->「Project properties」->「Script properties」こちらに KeyValue を入れます。

```javascript
const token = PropertiesService.getScriptProperties().getProperty('TOKEN');
```

[GASをClaspとTypescriptでローカル開発してみた。(Clasp / Typescript / TSLint / Prettier)](https://medium.com/@kosa3/gas%E3%82%92clasp%E3%81%A8typescript%E3%81%A7%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E9%96%8B%E7%99%BA%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F-e7835d1763ed)

[【初心者向けGAS】スクリプトプロパティを操作してそのデータを取り出す方法](https://tonari-it.com/gas-properties-script-property/)

## GAS でライブラリを使う場合

GAS のメニューから追加することもできるが、それだと `clasp push` されたタイミングでクリアされてしまうので、実用的ではなかった。

代わりに、以下のように `appsscript.json` に追加するのが妥当のようでした。

```json
{
  "dependencies": {
    "libraries": [
      {
        "userSymbol": "Moment",
        "libraryId": "MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48",
        "version": "9"
      }
    ]
  },
}
```

[[GAS]Claspでライブラリを使う方法｜kazuya_saito/イデアルファーロ株式会社 CEO｜note](https://note.com/miraisouzoukan/n/n1dd76f67aaf9)

## GAS を API として JSON を返す方法

[🥔 feat: add read-google-spreadsheet · hisasann/gas-typescript-starter@962e45b](https://github.com/hisasann/gas-typescript-starter/commit/962e45b927467ea108f48e2b92f429a46e5b1a6e)

doGet のレスポンスを **JSON** にすることで対応可能。

## 複数の Google Form からの送信をひとつの Google Spreadsheet にまとめてシートわける方法

Spreadsheet を Create せずに Select する方法を使うといけました。

## Google Form で送信されたときに自動返信メールを送る方法

基本的には、以下のように `GmailApp.sendEmail` するのだが、問題は Google Form が送られてきたタイミングに Hook する方法です。

```javascript
GmailApp.sendEmail(送信先アドレス, 件名, 本文, オプション)
```

[Google Apps Scriptでフォーム送信時にメッセージを送るスクリプトの作り方](https://tonari-it.com/gas-on-form-submit-gmail/)

    Google Form -> Google Apps Scripts -> Trigger（ここで Form と GAS を紐付け）

で作る場合は、 Trigger の部分に Google Form に Hook するプルダウンが出てきますが、 GAS を `clasp push` の場合はでこなかったです。

なので、スクリプト側からトリガーを作りました。

```javascript
ScriptApp.newTrigger(callbackName).forForm(form).onFormSubmit().create();
```

[[GAS]スクリプトからトリガーをセットする話 - Qiita](https://qiita.com/s_maeda_fukui/items/2fcbd34d7db5e8e7a2b8)

## GAS のクライアントサイドで CSS と JavaScript を実行する方法

[🍵 feat: add to use css and js in html with gas · hisasann/gas-typescript-starter@f11b8e6](https://github.com/hisasann/gas-typescript-starter/commit/f11b8e679bfff2c04ae7946e2b89d86f42069527)

---

GAS の doGet で Web アプリとして使われる `main.html`

main.html から `HtmlService.createHtmlOutputFromFile('css').getContent();` 経由で呼び出される CSS ファイルの `css.html`

と JavaScript ファイルの `js.html`

---

これで、 main.html 内から css.html と js.html の中身を include することができます。

[Google Apps ScriptのWebアプリケーションにCSSでスタイル設定をする](https://tonari-it.com/gas-html-css/)

[GASでクライアントJavaScriptを使用する超簡単なプログラム](https://tonari-it.com/gas-button-event-javascript/)

[GASとJavaScriptフレームワークVue.jsを使ってWebアプリを作成するための最初の一歩](https://tonari-it.com/gas-web-app-vue-js/)

## GAS で Spreadsheet の値を絞り込む

```javascript
function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();　//アクティブなスプレッドシートを取得
  var sh = ss.getActiveSheet();　//アクティブなスプレッドシートのアクティブシートを取得
  
  var filter = sh.getFilter();
  if (filter !== null) {
    sh.getFilter().remove(); //フィルタをオフにする
  }

  sh.getRange(1,1,5,2).createFilter();

  var filterRange = sh.getRange(2,1,sh.getLastRow(),1).getValues();
  var hidden = getHiddenValueArray(filterRange, 'テスト2');
  
  var criteria = SpreadsheetApp.newFilterCriteria()
// .setVisibleValues(['テスト1','テスト3'])
  .setHiddenValues(hidden)
  .build();

  sh.getFilter().setColumnFilterCriteria(1, criteria);
}

function getHiddenValueArray(colValueArr,visibleValueArr){
  var flatUniqArr = colValueArr.map(function(e){return e[0];})
  .filter(function(e,i,a){return (a.indexOf(e.toString())==i && visibleValueArr.indexOf(e.toString()) ==-1); })
  return flatUniqArr;
}
```

`setVisibleValues` 関数がググるとよく出てくるが、どうやらこちらは今はサポートされていないようです。

かわりに、 `setHiddenValues` 関数で非表示にしたいデータ分値を配列で渡す必要があります。

    Exception: Visible values are not currently supported. As an alternative specify a list of hidden values that excludes the values that should be visible. (line 17, file "Code")
    
[google apps script - Apply basic filter to multiple values in a spreadsheet column - Stack Overflow](https://stackoverflow.com/questions/51497982/apply-basic-filter-to-multiple-values-in-a-spreadsheet-column)

[【初心者向けGAS】スプレッドシートのセル範囲を行数・列数を使って取得する](https://tonari-it.com/gas-getrange-row-column/)

## GAS で G Suite メールアドレスを取得して閲覧制限のやり方

## Web アプリとして公開するときの設定

<p align="center">
  <img src="https://github.com/hisasann/gas-typescript-starter/blob/master/internals/images/%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9%E5%8F%96%E5%BE%972.png?raw=true" alt="" width="50%">
</p>

[【GAS Webアプリ】ホワイトリストを使ってWebページのアクセス制御する - Qiita](https://qiita.com/merarli/items/143eb3324325c76e22bc)

`Session.getActiveUser().getEmail()` でログインしているユーザーのメールアドレスが取得できるのですが、自分としてアプリケーションを実行するにした場合、

どうやってもメールアドレスが取得できませんでした。

なので、アクセスしたユーザーとして実行にしました。

また、 GAS やユーザー一覧を記載している Google Spreadsheet などは見れる状態にしないと実行できないので、そちらもやらなければなりません。

ですが、

    these restrictions generally do not apply if the developer runs the script themselves or belongs to the same G Suite domain as the user.
 
 [Class Session  |  Apps Script  |  Google Developers](https://developers.google.com/apps-script/reference/base/session#getActiveUser())
 
 と書いてあるので、 `G Suiteドメイン` が同じであれば制限はもう少し緩いのかもしれません。

### Code.gs

```javascript
function doGet() {
  // 現在ログインしているユーザーのメールアドレスを取得
  const LOGIN_USER = Session.getActiveUser().getEmail();

  console.log(LOGIN_USER);
  
  let template = 'error';
  // ログインしているユーザーのメールアドレスを使ってアクセス権を確認
  if (LOGIN_USER === 'hoge@gmail.com' || LOGIN_USER === 'fuga@gmail.com') {
    template = 'index';
  }
  
  return HtmlService.createTemplateFromFile(template).evaluate();
}
```

### appsscript.json

```json
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {
  },
  "webapp": {
    "access": "ANYONE",
    "executeAs": "USER_DEPLOYING"
  },
  "exceptionLogging": "STACKDRIVER",
  "oauthScopes": ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/userinfo.email"],
  "runtimeVersion": "V8"
}
```

### index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
  </head>
  <body>
    見えて良い
  </body>
</html>
```

### error.html

```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
  </head>
  <body>
    見えちゃだめ
  </body>
</html>
```

[google apps script - getActiveUser() doesn't return the user? - Stack Overflow](https://stackoverflow.com/questions/57847178/getactiveuser-doesnt-return-the-user)

[Authorization Scopes  |  Apps Script  |  Google Developers](https://developers.google.com/apps-script/concepts/scopes#setting_explicit_scopes)

[アカウントにアクセスできるアプリ](https://myaccount.google.com/permissions)

## GAS から HTTP POST する方法

```javascript
function myFunction() {
  var message = 'google apps scriptより';
  sendHttpPost(message);
}

/*
* messageをpostする関数
*/
function sendHttpPost(message) {
  var payload =
    {
      'message': message,
    };

  var options =
    {
      'method': 'post',
      'payload': payload,
    };

  try {
    // httpbin.org - https://httpbin.org/
    const res = UrlFetchApp.fetch('https://httpbin.org/post', options);
    const status = res.getResponseCode();
    console.log(status);
  } catch (e) {
    console.log(e);
  }
}
```

[Google Apps ScriptからHTTP POST - Qiita](https://qiita.com/n0bisuke/items/a31a99232e50461eb00f)

`UrlFetchApp.fetch` に関しては以下のドキュメントを参考。

[Class UrlFetchApp  |  Apps Script  |  Google Developers](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app)

`fetch` エラーだが

1. 成功した
1. 失敗した（catch に入る）
1. http status が 200 かどうか

の3種類をカバーする必要があるようだ。以下を参照。

[UrlFetchApp.fetchの応答3種 タイムアウトがつらい - Qiita](https://qiita.com/khsk/items/7d90513c88559e3d703f)

## Google Spreadsheet のメニューにオリジナルメニューを追加する

```javascript
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var items = [
    {name: 'こんにちは', functionName: 'myfunction'}
  ];
  sheet.addMenu('こんばんは', items);
}
    
function myfunction() {
  console.log('はい、こんにちは');
}
```

## GAS 対応した monorepo の一つのパッケージの最終形態はこちら

    ├── README.md
    ├── __tests__
    │   └── hello.test.ts
    ├── jest.config.js
    ├── node_modules
    ├── package.json
    ├── src
    │   ├── appsscript.json
    │   └── hello.ts
    ├── .clasp.json
    └── tsconfig.json

## 参考記事

[howdy39/gas-clasp-starter: A starter template for Google Apps Script by clasp](https://github.com/howdy39/gas-clasp-starter)

[GAS のGoogle謹製CLIツール clasp - Qiita](https://qiita.com/HeRo/items/4e65dcc82783b2766c03)

## Author

- [github/hisasann](https://github.com/hisasann)
- [twitter/hisasann](https://twitter.com/hisasann)

## License

MIT © [hisasann (Yoshiyuki Hisamatsu)](https://github.com/hisasann)
