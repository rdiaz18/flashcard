const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const ListController = require('../controllers/ListController')
const menuTranslationController = require('../controllers/menuTranslationController')
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
		app.post('/resetPassword',
			AuthenticationController.resetPassword)
		app.post('/createNewPassword',
			AuthenticationController.createNewPassword)

	//List Endpoints
		//Read file for langs
		app.post('/readFile',
			ListController.readFile)
		//Admin only add list
		app.post('/addAdminList',
			AuthenticationController.isAdmin,
			ListController.addAdminList)
		//User Create List
		app.post('/userCreateList',
			ListController.userCreateList)
		//get list by list ID
		app.post('/getListByID',
			ListController.getListByID)
		//update List
		app.post('/updateList',
			ListController.updateList)
		//Get list by user ID
		app.post('/getListByUser',
			ListController.getListByUser)
		//Get lists by language
		app.post('/getListByLanguage',
			ListController.getListByLanguage)
		//Insert list from fname
		app.post('/insertList',
			ListController.insertList)
		app.post('/deleteList',
			ListController.deleteList)

		//Menu Routes
		app.post('/createMenu',
			menuTranslationController.createMenu)
		app.post('/getMenuById',
			menuTranslationController.getMenuById)
		app.post('/getMenuByLanguage',
			menuTranslationController.getMenuByLanguage)
		app.post('/deleteMenu',
			menuTranslationController.deleteMenu)

}