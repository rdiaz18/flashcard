const {List} = require('../models')
var fs = require('fs');

function yandexTranslate(yandexText, langArr, fromLang, toLang){

	console.log("--------------");
	var yandexTextFixed = yandexText.replace(/,/g,'.'),
		yandexUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190114T000445Z.95291844b30dc809.79341b7169f080deb7cfa0ce4eb4a65e7897cf3a&text=${yandexTextFixed}&lang=${fromLang.toLowerCase()}-${toLang.toLowerCase()}`,
		xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var resArr = JSON.parse(xhr.responseText),
				resArr = resArr['text'];

			// console.log("resArr");
			// console.log(xhr.responseText);
			// console.log(resArr);
			// console.log(resArr.toString().split(", "));

			translatedRes(langArr, resArr, fromLang, toLang);
		}
	};

	xhr.open("GET", yandexUrl, true);
	xhr.send();

}

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

module.exports = {

	async readFile(req, res){
		var {file} = req.body
		file = ("/home/ubuntu/tts-flashcards/server/web-scraping/" + file)
		console.log(file)
		if(!fs.existsSync(file)) {
  			return res.status(404).send({filenotfound: req.param.path})
		}
		fs.readFile(file , 'utf8', function(err, contents){
			res.send(contents)
		});
	},
	async addAdminList(req, res){
		try{
			const {name, description, words, language, nativeLanguage, editable, share} = req.body
			const list = await List.create({
				name,
				description,
				words,
				language,
				nativeLanguage,
				editable: 0,
				userId: 1,
				share: 1
			})
			res.send({list})
		}catch(err){
			console.log(err);
			res.status(500).send("Error creating list")

		}

	},
	async getListByID(req, res){
		try{
			const {id} = req.body
			const list = await List.findOne({
				where:{
					id: id
				}
			})
			if(!list){
				res.status(404).send({
					error: "list not found"
				})
			}else{
				res.send({list})
			}
		}catch(err){
			console.log(err);
			res.status(500).send("error fetching list")
		}
	},
	async insertList(req, res){
		try{
			var {name, description, words, language, nativeLanguage, editable, share, file} = req.body
					file = ("/home/ubuntu/tts-flashcards/server/web-scraping/" + file)
			console.log(file)
			if(!fs.existsSync(file)) {
	  			return res.status(404).send({filenotfound: req.param.path})
			}
			var contents = fs.readFileSync(file , 'utf8')
			let tempArr,
				langArr = [],
				str = "";

			tempArr = contents.toString().split(",");
			tempArr.filter(function(v, i) {
			  // check the index is odd
			  if (i % 2 == 0) { 
			  	langArr.push(v); 
			  	str += v+", ";
			  }
			});

			console.log("langArr PRE YANDEX");
			console.log(str);
			yandexTranslate(str, langArr, language, nativeLanguage);

			res.send("complete")

		}catch(err){
			console.log(err)
			res.status(500).send({error: 'error inserting list'})
		}

	}
}
