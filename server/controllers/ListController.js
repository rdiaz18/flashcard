var fs = require('fs');

module.exports = {

	async readFile(req, res){

		if(!fs.existsSync(req.param.path)) {
  			return res.status(404).send({filenotfound: req.param.path})
		}
		fs.readFile(req.param.path, 'utf8', function(err, contents){
			res.send(contents)
		});
	}
}