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
	}
}
