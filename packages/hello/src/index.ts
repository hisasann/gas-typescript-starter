import { showHello, getHello } from './hello';
import { Moment } from 'moment';

// HTTP GETによる実行エントリポイント
// Google Apps Script でHTMLファイルを作って表示。 - Qiita - https://qiita.com/taromorimotohf/items/5e52cb9062600e8ccac3
function doGet() {
  const template = 'myfunction';
  return HtmlService.createTemplateFromFile(template).evaluate();
}

// myfunction.html から呼び出される関数
function myFunction() {
  showHello(getHello());
}

// myfunction.html から呼び出される関数
function getSpreadsheetName(hoge: string) {
  return `${SpreadsheetApp?.getActiveSpreadsheet()?.getName()} ${hoge}`;
}

function creatSS() {
  // スプレッドシートオブジェクトを作成する
  const id = SpreadsheetApp.create('new Spread Sheet').getId();
  // スプレッドシートのファイルオブジェクトを取得する
  const file = DriveApp.getFileById(id);

  // IDをどのように知るかと言いますと、フォルダであればGoogleドライブでそのフォルダを開いている際のURLの
  // https://drive.google.com/drive/folders/{フォルダID}
  // の部分です。
  // Google Apps ScriptでGoogleドライブを操作する最も簡単なスクリプト - https://tonari-it.com/gas-google-drive-app/
  // スプレッドシートの移動先となるフォルダー名（環境変数より取得）
  const GAS_FOLDER_ID:
    | string
    | null = PropertiesService.getScriptProperties().getProperty(
    'GAS_FOLDER_ID'
  );

  let folder;
  if (GAS_FOLDER_ID) {
    folder = DriveApp.getFolderById(GAS_FOLDER_ID);

    // ルートに出来たスプレッドシートをフォルダーに移動して、ルートにある同ファイルを削除する
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);

    console.log(folder.getName());
  }
}

function getNow() {
  const now = Moment.moment();
  window.alert(now.format('YYYY年MM月DD日'));
}
