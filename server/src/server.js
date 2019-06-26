const express = require('express'),
      expressStaticGzip = require("express-static-gzip"),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      morgan = require('morgan'),
      {sequelize} = require('../models'),
      app = express();

require('./routes')(app);

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use('/', expressStaticGzip(path.join(__dirname, 'client/dist'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz']
}))

app.get('/', (req, res) => res.send('Hello World!'))

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync()
	.then(() => {
		app.listen(8081, () => console.log('FlashLang API listening on port 8081!'))
	})  
