function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    { name: 'Today', functionName: '_today' }
  ];
  
  spreadsheet.addMenu('Kreed', menuItems);
}

function _today() {
	var sheet = SpreadsheetApp.getActiveSpreadsheet();
	// var sheet = ss.getSheets()[0];
	var cell = sheet.getActiveCell();
	cell.setValue(new Date());
}