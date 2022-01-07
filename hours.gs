function onOpen() {
    var spreadsheet = SpreadsheetApp.getActive();
    var menuItems = [
        { name: 'Now', functionName: '_now' }
    ];

    spreadsheet.addMenu('Kreed', menuItems);
}

function _now() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var activeCell = sheet.getActiveCell();

    _dateTime(activeCell);
    _duration(activeCell);
    _sum(activeCell);
}

function _dateTime(activeCell){
    activeCell.setValue(new Date());
}

function _duration(activeCell){
    var lastCell = activeCell.offset(-1, 0);

    if(lastCell.getValue() == ""){
        return;
    }

    var durationFormula = getTimeFormula(lastCell, activeCell);
    var durationCell = activeCell.offset(-1, -1);
    durationCell.setFormula(durationFormula);
}

function _sum(activeCell){
    var currentCell = activeCell.offset(-1, 0),
        currentValue = currentCell.getValue();

    if(currentValue == "") {
        return;
    }

    while(currentValue != "") {
        currentCell = currentCell.offset(-1, 0);
        currentValue = currentCell.getValue();
    }

    currentCell = currentCell.offset(1, 0);

    var durationFormula = getTimeFormula(currentCell, activeCell);
    var sumCell = activeCell.offset(0, -1);
    sumCell.setFormula(durationFormula);
}

function getTimeFormula(startCell, endCell){
    var hoursString = "(%s-%s)*24";
    var timeString = "=floor(%s) & \":\" & right(\"0\" & round(mod(%s,1)*60), 2)";
    var formula = Utilities.formatString(hoursString, endCell.getA1Notation(), startCell.getA1Notation());
    return Utilities.formatString(timeString, formula, formula);
}
