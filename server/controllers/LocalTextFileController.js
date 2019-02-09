var fs = require('fs');

module.exports = {
	read(req, res){

		console.log(req);

		fs.readFile(req.param.path, 'utf8', function(err, contents){
			res.send(contents);
		});

		console.log("after calling readFile");
	}
}