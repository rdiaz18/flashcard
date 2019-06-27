const express = require('express'),
	  expressStaticGzip = require("express-static-gzip"),
	  path = require('path'),
	  app = express();

app.use('/', expressStaticGzip(path.join(__dirname, 'dist'), {
	enableBrotli: true,
	orderPreference: ['br', 'gz']
}))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// app.get('/.well-known(/*)?', function(req, res) {
// 	res.sendFile(path.join(__dirname, '.well-known', 'assetlinks.json'))
// })

// app.get('/privacy-policy(/*)', function(req, res) {
// 	res.sendFile(path.join(__dirname, 'privacy-policy', 'privacy_policy.html'))
// })

app.listen(3000, () => console.log("Static client listening on 3000"))
