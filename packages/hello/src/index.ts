import { showHello, getHello } from './hello';

export function myFunction() {
  showHello(getHello());
}

// HTTP GETによる実行エントリポイント
// Google Apps Script でHTMLファイルを作って表示。 - Qiita - https://qiita.com/taromorimotohf/items/5e52cb9062600e8ccac3
function doGet() {
  const template = 'myfunction';
  return HtmlService.createTemplateFromFile(template).evaluate();
}
