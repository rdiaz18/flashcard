const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const ListController = require('../controllers/ListController')
module.exports = (app) => {

	app.get('/route', (req, res) => res.send('routes'))

	//Users edpoint
		//Register User
		app.post('/register',
			AuthenticationControllerPolicy.register,
			AuthenticationController.register)
		//Login User
		app.post('/login',
			AuthenticationController.login)
		//Update User
		app.post('/updateUser',
			AuthenticationController.matchUserToken,
			AuthenticationController.updateUser)

	//List Endpoints
		//Read file for langs
		app.post('/readFile',
			ListController.readFile)
		//Admin only add list
		app.post('/addAdminList',
			AuthenticationController.isAdmin,
			ListController.addAdminList)
		//get list by list ID
		app.post('/getListByID',
			ListController.getListByID)

}