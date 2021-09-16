const fields = [
    "name",
    "age",
    "fear",
    "adversityTokens"
];
var sheets = [];
var currentSheet = 0;

/* Load sheets from local storage */
function loadSheets() {
    sheets = JSON.parse(localStorage.getItem('kidsOnBikes'));

    let sheetSelect = document.getElementById('sheetSelect');
    sheets.forEach(function(sheet) {
	let option = document.createElement('option');
	option.text = sheet['name'];
	sheetSelect.add(option);
    });
}

/* Load selected sheet */
function selectSheet() {
    currentSheet = document.getElementById('sheetSelect').selectedIndex;
    let sheet = sheets[currentSheet];
    fields.forEach(function(field) {
	document.getElementById(field).value = sheet[field];
    });
}

window.onload = function() {
    if (localStorage.getItem('kidsOnBikes')) {
	console.log('loading session');
	loadSheets();
    } else {
	
    }

    document.getElementById('saveSheet').addEventListener('click', saveSheet);
    document.getElementById('loadSheet').addEventListener('click', loadSheet);
    
    document.getElementById('sheetSelect').addEventListener('change', selectSheet);
    
//    fields.forEach(function(field) {
//	document.getElementById(field).addEventListener('change', function() {
//	    localStorage.setItem(field, document.getElementById(field).value);
//	})
//    });
};

function saveSheet() {
    console.log('saveSheet');
    let sheet = {};
    fields.forEach(function(field) {
	sheet[field.toString()] = document.getElementById(field).value;
    });
    if (sheets) {
	console.log("Saving sheet " + currentSheet);
	sheets[currentSheet] = sheet;
    } else {
	console.log("Saving first sheet");	       
	sheets.push(sheet);
    }
    localStorage.setItem('kidsOnBikes', JSON.stringify(sheets));
}

