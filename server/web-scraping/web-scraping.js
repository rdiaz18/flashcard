// Languages Needed - Key Map Between Google Language Codes and Yandex Language Codes
var languageObj = {
	"AF":"af", // Afrikaans
	"AR":"ar", // Arabic
	"BG":"bg", // Bulgarian
	"CA":"ca", // Catalan
	"CMN":"zh", // Chinese ? WTF
	"DA":"da", // Danish
	"DE":"de", // German
	"EL":"el", // Greek
	"ES":"es", // Spanish
	// "EN":"en", // English
	"FA":"fa", // Persian / Farsi
	"FI":"fi", // Finnish
	// "FIL":"", // Philipino - NONE
	"FR":"fr", // French
	"GL":"gl", // Galacian
	"HE":"he", // Hebrew
	"HI":"hi", // Hindi
	"HR":"hr", // Croatian
	"HU":"hu", // Hungarian
	"ID":"id", // Indonesian
	"IS":"is", // Icelandic
	"IT":"it", // Italian
	"JA":"ja", // Japanese
	"KO":"ko", // Korean
	"LT":"lt", // Lithuanian
	"MS":"ms", // Malaysian
	"NB":"no", // Norwegian
	"NL":"nl", // Dutch
	"PL":"pl", // Polish
	"PT":"pt", // Portuguese
	"RO":"ro", // Romanian
	"RS":"sr", // Serbian
	"RU":"ru", // Russian
	"SK":"sk", // Slovakian
	"SL":"sl", // Slovenian
	"SV":"sv", // Swedish
	"TH":"th", // Thai
	"UK":"uk", // Ukranian
	"VI":"vi" // Vietnamese
	// "ZU":"", // Zulu
}

// Loop through Languages and Init
for (var prop in languageObj){
	readFile(prop, languageObj[prop]);
}

// Getting List Test

(function(){

	var language = "AF",
		nativeLanguage = "EN";

	login(nativeLanguage, language);

	function login(nativeLanguage, language){
		let xhttp = new XMLHttpRequest(),
			url = 'http://18.188.201.66:8081/login',
			credentials = JSON.stringify({ "email":"admin@acc.one", "password":"password" });

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				window.jwt = JSON.parse(xhttp.responseText)["token"];
				getListByLanguage(`${nativeLanguage}`, `${language}`);
			}
		};

		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send(credentials);
	};

	function getListByLanguage(fromLang, toLang){
		var xhttp = new XMLHttpRequest(),
			url = 'http://18.188.201.66:8081/getListByLanguage',
			fUrl = JSON.stringify({ 
				fromLang: `${fromLang}`,
				toLang: `${toLang}` 
			});

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(xhttp.responseText);
			}
		};

		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send(fUrl);
	}

})();
	


// Latest Func for Storing Admin Lists
(function saveAdminList(){
	var nativeLanguage = "CA",
		language = "EN",
		fileType = "csv";
		// fileType = "txt";

	login(nativeLanguage, language);

	function login(nativeLanguage, language){
		let xhttp = new XMLHttpRequest(),
			url = 'http://18.188.201.66:8081/login',
			credentials = JSON.stringify({ "email":"admin@acc.one", "password":"password" });

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				window.jwt = JSON.parse(xhttp.responseText)["token"];
				readFile(`${nativeLanguage}`, `${language}`);
			}
		};

		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send(credentials);
	};

	// Access Text Files
	function readFile(nativeLanguage, language){
		var xhttp = new XMLHttpRequest(),
			url = 'http://18.188.201.66:8081/readFile',
			fUrl = JSON.stringify({ 'file': `${nativeLanguage}-${language}-1000.${fileType}` });

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(xhttp.responseText);
				let json = {
					name: `${nativeLanguage}-${language}-1000`,
					description: `1,000 Most Common Words`,
					words: `${xhttp.responseText}`,
					language: `${language}`,
					nativeLanguage: `${nativeLanguage}`
				}
				sendDB(JSON.stringify(json));
			}
		};

		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send(fUrl);
	};

	// Send translated result to DB
	function sendDB(json){
		var xhr2 = new XMLHttpRequest(),
			dbURL = 'http://18.188.201.66:8081/addAdminList';

		xhr2.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(xhr2.responseText);
			}
		};

		xhr2.open("POST", dbURL, true);
		xhr2.setRequestHeader("Content-Type", "application/json");
		xhr2.setRequestHeader("x-access-token", window.jwt);
		xhr2.send(json);
	}

})();

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// Login to get admin access
(function login(){
	let xhttp2 = new XMLHttpRequest(),
		url = 'http://18.188.201.66:8081/login',
		credentials = JSON.stringify({ "email":"admin@acc.one", "password":"password" });

	xhttp2.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// console.log(JSON.parse(xhttp2.responseText)["token"]);
			window.jwt = console.log(JSON.parse(xhttp2.responseText)["token"]);
			readFile("AF", "ru");
		}
	};

	xhttp2.open("POST", url, true);
	xhttp2.setRequestHeader("Content-Type", "application/json");
	xhttp2.send(credentials);
})();

	

// Access Text Files
function readFile(prop, key){
	var xhttp = new XMLHttpRequest(),
		url = 'http://18.188.201.66:8081/readFile',
		fUrl = JSON.stringify({ 'file': `${prop}-EN-1000.csv` });

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// console.log(xhttp.responseText);
			processRes(xhttp.responseText, prop, key);
		}
	};

	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(fUrl);
};

// Split Into Array for API Send
function processRes(res, fromLang, toLang){
	// console.log(res);
	let tempArr,
		langArr = [],
		str = "";

	tempArr = res.toString().split(",");
	tempArr.filter(function(v, i) {
	  // check the index is odd
	  if (i % 2 == 0) { 
	  	langArr.push(v); 
	  	str += v+", ";
	  }
	});

	console.log("langArr PRE YANDEX");
	// console.log(langArr);
	console.log(str);
	yandexTranslate(str, langArr, fromLang, toLang);
}

// Send To Yandex For Translation
function yandexTranslate(yandexText, langArr, fromLang, toLang){
	var yandexTextFixed = yandexText.replace(/,/g,'.'),
		yandexUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190114T000445Z.95291844b30dc809.79341b7169f080deb7cfa0ce4eb4a65e7897cf3a&text=${yandexTextFixed}&lang=${fromLang.toLowerCase()}-${toLang.toLowerCase()}`,
		xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var resArr = JSON.parse(xhr.responseText),
				resArr = resArr['text'];

			translatedRes(langArr, resArr, fromLang, toLang);
		}
	};

	xhr.open("GET", yandexUrl, true);
	xhr.send();

}

// Join translated result into JSON
function translatedRes(fromArr, toArr, fromLang, toLang){
	let translatedObj = {
		name: "1,000 Most Common Words",
		description: `${fromLang.toUpperCase()}-${toLang.toUpperCase()}-1000`,
		nativeLanguage: fromLang,
		language: toLang,
		words: []
	};

	let toArrFixed = toArr.toString().split(". ");

	console.log(fromArr);
	console.log(toArr);

	if (toArrFixed.length < 1000 || fromArr.length < 1000) {
		console.log("ERROR: RESPONSE LENGTH MISMATCH");
		console.log("From Language Length: "+fromArr.length);
		console.log("To Language Length: "+toArrFixed.length);
		console.log(fromArr);
		console.log(toArr);
		console.log(toArrFixed);
	}

	for (var i = 0; i < fromArr.length; i++) {
		translatedObj.words.push([fromArr[i], toArrFixed[i]]);
	}

	console.log(translatedObj);
	// sendDB(translatedObj);
}

// Send translated result to DB
function sendDB(json){
	var xhr2 = new XMLHttpRequest(),
		dbURL = 'http://18.188.201.66:8081/addAdminList';

	xhr2.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(xhr2.responseText);
		}
	};

	xhr2.open("POST", dbURL, true);
	xhr2.setRequestHeader("Content-Type", "application/json");
	xhr2.setRequestHeader("x-access-token", window.jwt);
	xhr2.send(json);
}






// https://www.101languages.net/

var wordArr = [],
	meaningArr = [],
	combinedArr = [];

for (var i = 0; i < document.querySelectorAll("tr").length - 1; i++) {
	if (i > 0) {
		console.log(i);
		let col = document.querySelectorAll(".column-2")[i].innerText,
			colTwo = document.querySelectorAll(".column-3")[i].innerText;

		wordArr.push(col);
		meaningArr.push(colTwo);
	}
}

for (var i = 0; i < wordArr.length; i++) {
	combinedArr.push([wordArr[i], meaningArr[i]]);
}

console.log(combinedArr.toString());






// http://1000mostcommonwords.com/

var wordArr = [],
	meaningArr = [],
	combinedArr = [];

for (var i = 0; i < document.querySelectorAll("tr").length; i++) {
	if (i > 0) {
		console.log(i);
		let row = document.querySelectorAll("tr")[i],
			col = row.children[1].innerText,
			colTwo = row.children[2].innerText;

		wordArr.push(col);
		meaningArr.push(colTwo);
	}
}

for (var i = 0; i < wordArr.length; i++) {
	combinedArr.push([wordArr[i], meaningArr[i]]);
}

console.log(combinedArr.toString());

