const {List} = require('../models')
var fs = require('fs');

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
			const {words, language, nativeLanguage, editable} = req.body
			const list = await List.create({
				words,
				language,
				nativeLanguage,
				editable: 0,
				userID: 1
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
	}
}
