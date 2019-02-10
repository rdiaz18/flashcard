// Access Text Files

var xhttp = new XMLHttpRequest(),
	url = 'http://18.188.201.66:8081/readFile',
	fUrl = JSON.stringify({ 'file': 'RU-EN-1000.csv' });

xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	  processRes(xhttp.responseText);
	}
};

xhttp.open("POST", url, true);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.send(fUrl);

// Split Into Array for API Send
function processRes(res){
	console.log(res);
	let tempArr,
		langArr = [];

	tempArr = res.toString().split(",");
	console.log(resArr.length);
	tempArr.filter(function(v, i) {
	  // check the index is odd
	  if (i % 2 == 0) { langArr.push(v); }
	});
	console.log(langArr);
}

var yandexUrl = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20190114T000445Z.95291844b30dc809.79341b7169f080deb7cfa0ce4eb4a65e7897cf3a';


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



// Yandex API Language Codes
// https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20190114T000445Z.95291844b30dc809.79341b7169f080deb7cfa0ce4eb4a65e7897cf3a

{
	"dirs":["az-ru","be-bg","be-cs","be-de","be-en","be-es","be-fr","be-it","be-pl","be-ro","be-ru","be-sr","be-tr","bg-be","bg-ru","bg-uk","ca-en","ca-ru","cs-be","cs-en","cs-ru","cs-uk","da-en","da-ru","de-be","de-en","de-es","de-fr","de-it","de-ru","de-tr","de-uk","el-en","el-ru","en-be","en-ca","en-cs","en-da","en-de","en-el","en-es","en-et","en-fi","en-fr","en-hu","en-it","en-lt","en-lv","en-mk","en-nl","en-no","en-pt","en-ru","en-sk","en-sl","en-sq","en-sv","en-tr","en-uk","es-be","es-de","es-en","es-ru","es-uk","et-en","et-ru","fi-en","fi-ru","fr-be","fr-de","fr-en","fr-ru","fr-uk","hr-ru","hu-en","hu-ru","hy-ru","it-be","it-de","it-en","it-ru","it-uk","lt-en","lt-ru","lv-en","lv-ru","mk-en","mk-ru","nl-en","nl-ru","no-en","no-ru","pl-be","pl-ru","pl-uk","pt-en","pt-ru","ro-be","ro-ru","ro-uk","ru-az","ru-be","ru-bg","ru-ca","ru-cs","ru-da","ru-de","ru-el","ru-en","ru-es","ru-et","ru-fi","ru-fr","ru-hr","ru-hu","ru-hy","ru-it","ru-lt","ru-lv","ru-mk","ru-nl","ru-no","ru-pl","ru-pt","ru-ro","ru-sk","ru-sl","ru-sq","ru-sr","ru-sv","ru-tr","ru-uk","sk-en","sk-ru","sl-en","sl-ru","sq-en","sq-ru","sr-be","sr-ru","sr-uk","sv-en","sv-ru","tr-be","tr-de","tr-en","tr-ru","tr-uk","uk-bg","uk-cs","uk-de","uk-en","uk-es","uk-fr","uk-it","uk-pl","uk-ro","uk-ru","uk-sr","uk-tr"],
	"langs":{"af":"Afrikaans","am":"Amharic","ar":"Arabic","az":"Azerbaijani","ba":"Bashkir","be":"Belarusian","bg":"Bulgarian","bn":"Bengali","bs":"Bosnian","ca":"Catalan","ceb":"Cebuano","cs":"Czech","cy":"Welsh","da":"Danish","de":"German","el":"Greek","en":"English","eo":"Esperanto","es":"Spanish","et":"Estonian","eu":"Basque","fa":"Persian","fi":"Finnish","fr":"French","ga":"Irish","gd":"Scottish Gaelic","gl":"Galician","gu":"Gujarati","he":"Hebrew","hi":"Hindi","hr":"Croatian","ht":"Haitian","hu":"Hungarian","hy":"Armenian","id":"Indonesian","is":"Icelandic","it":"Italian","ja":"Japanese","jv":"Javanese","ka":"Georgian","kk":"Kazakh","km":"Khmer","kn":"Kannada","ko":"Korean","ky":"Kyrgyz","la":"Latin","lb":"Luxembourgish","lo":"Lao","lt":"Lithuanian","lv":"Latvian","mg":"Malagasy","mhr":"Mari","mi":"Maori","mk":"Macedonian","ml":"Malayalam","mn":"Mongolian","mr":"Marathi","mrj":"Hill Mari","ms":"Malay","mt":"Maltese","my":"Burmese","ne":"Nepali","nl":"Dutch","no":"Norwegian","pa":"Punjabi","pap":"Papiamento","pl":"Polish","pt":"Portuguese","ro":"Romanian","ru":"Russian","si":"Sinhalese","sk":"Slovak","sl":"Slovenian","sq":"Albanian","sr":"Serbian","su":"Sundanese","sv":"Swedish","sw":"Swahili","ta":"Tamil","te":"Telugu","tg":"Tajik","th":"Thai","tl":"Tagalog","tr":"Turkish","tt":"Tatar","udm":"Udmurt","uk":"Ukrainian","ur":"Urdu","uz":"Uzbek","vi":"Vietnamese","xh":"Xhosa","yi":"Yiddish","zh":"Chinese"}
}

// Yandex Translation Request
// https://translate.yandex.net/api/v1.5/tr/translate?key=<API key>&text=<text to translate>&lang=<translation direction>&[format=<text format>]&[options=<translation options>]
