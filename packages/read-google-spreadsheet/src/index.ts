// 一番シンプルな Json を返す doGet 関数
// function doGet(e: any) {
//   var data = { Hello: 'world' };
//   var payload = JSON.stringify(data);
//   var output = ContentService.createTextOutput();
//   output.setMimeType(ContentService.MimeType.JSON);
//   output.setContent(payload);
//
//   return output;
// }

function doGet(request: any) {
  // list データを json に変換
  const payload = JSON.stringify(myFunction());
  // payload を returnするだけではだめ
  // ContentService を利用して、 response を作成
  ContentService.createTextOutput();
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(payload);
  return output;
}

// GASでJSONを返すAPIを作る - Qiita - https://qiita.com/tfuruya/items/3c306ee03d1ac290bcef
// Gasでgoogle Spreadsheetをjsonで返す方法 - Qiita - https://qiita.com/taichi0514/items/ee6dedff45f9d9e58ef4
function myFunction() {
  // Google Apps Script で Spreadsheet にアクセスする方法まとめ - Qiita - https://qiita.com/negito6/items/c64a7a8589faaffcfdcf
  const spreadsheet = SpreadsheetApp.openById(
    '1QiYJp_2DG5q0aPcCCFu8wxeJQ4ySaucPX-LVzCroEdE'
  );
  const sheet = spreadsheet.getSheetByName('Form Responses 1');

  //シート全体のデータを取得する場合
  // dataにはシートのデータが２次元配列で入る
  const data = sheet?.getDataRange()!.getValues();
  console.log(data);
  return data;
}
