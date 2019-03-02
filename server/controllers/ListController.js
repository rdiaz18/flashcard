const {List} = require('../models')
var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require('axios')

async function yandexTranslate(yandexText, langArr, fromLang, toLang){

	console.log("--------------");
	var yandexTextFixed = yandexText.replace(/,/g,'.'),
		yandexUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190114T000445Z.95291844b30dc809.79341b7169f080deb7cfa0ce4eb4a65e7897cf3a&text=${yandexTextFixed}&lang=${fromLang.toLowerCase()}-${toLang.toLowerCase()}`,
		xhr = new XMLHttpRequest();
		try{
			return await axios.get(yandexUrl)
		}catch (err){
			console.log(err)
		}

}

function translatedRes(fromArr, toArr, fromLang, toLang){i
	console.log("in translated res")
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
	return (translatedObj);
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
	async userCreateList(req, res){
		try{
			const list = await List.create(req.body)
			res.send({list})
		}catch(err){
			console.log(err)
			res.status(500).send("Error Creating List")
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
	async getListByUser(req, res){
		try{
			const{userId} = req.body
			const listArr = await List.findAll({
				where:{
					userId: userId
				}
			})
			res.send({listArr})
		}catch(err){
			console.log(err)
			res.status(500).send("Error Fetching List")
		}
	},
	async getListByLanguage(req, res){
		try{
			const{toLang, fromLang} = req.body
			let query = {where: {}}
			if (toLang) {
				query.where.nativeLanguage = toLang
			}
			if (fromLang) {
				query.where.language = fromLang
			}
			const listArr = await List.findAll(query)
			res.send({listArr})
		}catch(err){
			console.log(err)
			res.status(500).send("Error Fetching List")
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

			var translated = await yandexTranslate(str, langArr, language, nativeLanguage);
			translated = translated.data.text;
			if(!name){
				name = "1,000 Most Common Words"
			}
			if(!description){
				description = `${language.toUpperCase()}-${nativeLanguage.toUpperCase()}-1000`
			}
			let translatedObj = {
				name: name,
				description: description,
				nativeLanguage: language,
				language: nativeLanguage,
				words: []
			};

			let toArrFixed = translated.toString().split(". ");

			console.log(langArr);
			console.log(translated);

			if (toArrFixed.length < 1000 || langArr.length < 1000) {
				console.log("ERROR: RESPONSE LENGTH MISMATCH");
				console.log("From Language Length: "+langArr.length);
				console.log("To Language Length: "+toArrFixed.length);
				console.log(langArr);
				console.log(translated);
				console.log(toArrFixed);
			}

			for (var i = 0; i < langArr.length; i++) {
				translatedObj.words.push([langArr[i], toArrFixed[i]]);
			}

			console.log(translatedObj);
			const list = await List.create({
				name: translatedObj.name,
				description: translatedObj.description,
				words: JSON.stringify(translatedObj.words),
				language: translatedObj.language,
				nativeLanguage: translatedObj.nativeLanguage,
				editable: 0,
				userId: 1,
				share: 1
			})
			res.send({list})
			res.send({translatedObj})

		}catch(err){
			console.log(err)
			res.status(500).send({error: 'error inserting list'})
		}

	}
}
