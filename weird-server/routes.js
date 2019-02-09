const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const LocalTextFileController = require('../controllers/LocalTextFileController')

module.exports = (app) => {

	app.get('/route', (req, res) => res.send('routes'))

	// Users endpoint
		// Register User
		app.post('/register',
			AuthenticationControllerPolicy.register,
			AuthenticationController.register)
		// Login User
		app.post('/login',
			AuthenticationController.login)
		// Update User
		app.post('/updateUser',
			AuthenticationController.matchUserToken,
			AuthenticationController.updateUser)

	// Stock Text File Endpoint
		// Get Text Content
		app.post('/readText',
			LocalTextFileController.read)

}
