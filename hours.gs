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
    var thisA1 = activeCell.getA1Notation();
    var lastCell = activeCell.offset(-1, 0);

    if(lastCell.getValue() == ""){
        return;
    }

    var lastA1 = lastCell.getA1Notation();
    var durationCell = activeCell.offset(-1, -1);
    durationCell.setFormula("=(" + thisA1 + "-" + lastA1 + ")*24");
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

    var sumCell = activeCell.offset(0, -1);
    sumCell.setFormula("=sum("+currentCell.offset(0, -1).getA1Notation()+":"+activeCell.offset(-1, -1).getA1Notation()+")");
}
