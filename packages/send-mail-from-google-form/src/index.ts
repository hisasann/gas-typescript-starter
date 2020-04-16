function myFunction() {
  // フォームkey
  const form = FormApp.openById('1SXN8J0-89y2FwuXs0MTXrSjlMV_4-z8OhMbuJFj51sU');
  setTrigger(form, 'sendMessage');
}

function setTrigger(form: any, callbackName: string) {
  // 実行者が持っているこのスクリプトでのトリガーを全削除
  const allTriggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < allTriggers.length; ++i) {
    ScriptApp.deleteTrigger(allTriggers[i]);
  }

  // フォーム送信時
  ScriptApp.newTrigger(callbackName).forForm(form).onFormSubmit().create();
}

function sendMessage() {
  // これを実行している人のメールアドレス
  const email = Session.getActiveUser().getEmail();
  const subject = '問い合わせ返信のお知らせ';
  let body = `
こんにちは！
はい、こんにちは！
もう一度問い合わせしてねっ！

https://docs.google.com/forms/d/e/1FAIpQLScjZs6BJa6NhQazxn42Gq1gjfqtbFerAEQv6FuW63Fn3f4pCg/viewform
`;

  GmailApp.sendEmail(email, subject, body);
}
