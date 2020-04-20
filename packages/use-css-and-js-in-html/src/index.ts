function doGet() {
  const template = 'main';
  return HtmlService.createTemplateFromFile(template).evaluate();
}

function include(filename: string) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
