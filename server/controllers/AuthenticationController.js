const {users} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/authConfig')
const nodemailer = require('nodemailer')

function jwtSignUser (user) {
	const ONE_WEEK = 60 * 60 * 24 * 7
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	})
}

function jwtSignReset(user){
	const ONE_HOUR = 60 * 60
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_HOUR
	})
}
module.exports = {
	async register(req, res) {
		try{
			const user = await users.create(req.body)
			let userJson = user.toJSON()
			delete userJson.resetToken
			res.send({
				user: userJson,
				token: jwtSignUser(userJson)
			})
		}catch(err){
			res.status(400).send({
				error: "This Email is already in use"
			})
		}
	},
	async login(req, res) {
		try{
			const {email, password} = req.body
			const user = await users.findOne({
				where: {
					email: email
				}
			})
			if(!user) {
				return res.status(403).send({
					error: 'Could not find this account'
				})
			}
			const isPasswordValid = await user.comparePassword(password)
			if (!isPasswordValid){
				return res.status(403).send({
					error: 'Incorrect password'
				})
			}
			const userJson = user.toJSON()
			delete userJson.resetToken
			res.send({
				user: userJson,
				token: jwtSignUser(userJson)
			})
		}catch(err){
			res.status(500).send({
				error: "Login error"
			})
		}
	},
	async me (req, res) {
		res.status(200).send({message: 'admin function reached'})
	},
	async isAdmin (req, res, next) {
		const token = req.headers['x-access-token']
		if (!token) {
			res.status(401).send({ auth: false, message: 'You are not logged in'})
		}
		jwt.verify(token, config.authentication.jwtSecret, async function(err, token){
			if(err){
				return res.status(500).send({message: 'Invalid Account'})
			}else{
				const user = await users.findById(token.id)
				if(user.admin != 1){
					return res.status(403).send({message: 'Unauthorized to perform this action'})
				}
				next()
			}
		})
	},
	async getAllUsers(req, res) {
		try{
			const userArr = await users.findAll({
				attributes: ['id','name', 'email']
			})
			const parsedUsers = JSON.parse(JSON.stringify(userArr))
			res.send(parsedUsers)
		}catch(err){
			console.log(err)
			res.status(500).send({
				error: "Failed to retrieve Users"
			})
		}
	},
	async updateUser(req, res) {
		try{
			const {id} = req.body
			const user = await users.findOne({where:{id: id}})
			const {name, email} = req.body
			user.update({
			    name: name,
			    email: email
			}).then(function(){
				res.send({user: user.toJSON()})
			})
		}catch(err){
			console.log(err)
			res.status(500).send({
				error: "Failed to update User"
			})
		}
	},
	async deleteUser(req, res){
		try{
			const {id} = req.body
			const user = await users.findOne({
				where:{
					id: id
				}
			})
			user.destroy()
				.then(function(){
					res.send({message: 'User deleted'})
				})
		}catch(err){
			res.status(500).send({
				error: "Failed to delete user"
			})
		}
	},
	async matchUserToken(req, res, next) {
		const {userId} = req.body
		const token = req.headers['x-access-token']
		if (!token) {
			res.status(401).send({ auth: false, message: 'You are not logged in'})
		}
		jwt.verify(token, config.authentication.jwtSecret, async function(err, token){
			if(err){
				console.log(err)
				return res.status(500).send({message: 'Invalid Account'})
			}else{
				const tmpuser = await users.findById(token.id)
				if(tmpuser.id != userId){
					return res.status(403).send({message: 'Unauthorized to perform this action'})
				}
				next()
			}
		})
	},
	async resetPassword(req, res){
		try{
			const {email} = req.body
			const user = await users.findOne({
				where: {
					email: email
				}
			})
			if(!user){
				res.status(400).send({"message": "user not found"})
			}
			let userJson = user.toJSON()
			delete userJson.resetToken
			const resetToken = jwtSignReset(userJson)
			user.update({
				resetToken: resetToken
			}).then(() => {
				// var smtpTransport = nodemailer.createTransport('SMTP', {
			 //        service: 'SendGrid',
			 //        auth: {
			 //          user: '!!! YOUR SENDGRID USERNAME !!!',
			 //          pass: '!!! YOUR SENDGRID PASSWORD !!!'
			 //        }
			 //    });
			 //    var mailOptions = {
			 //        to: user.email,
			 //        from: 'passwordreset@demo.com',
			 //        subject: 'Node.js Password Reset',
			 //        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
			 //          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
			 //          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
			 //          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			 //    };
			 //    smtpTransport.sendMail(mailOptions, function(err) {
			 //        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
			 //        done(err, 'done');
			 //    });
				res.send({
					user,
					resetToken
				})
			})
		}catch(err){
			console.log(err)
			res.status(500).send({"error" : "Server Error"})
		}
	}, async createNewPassword(req, res){
		try{
			const {resetToken, password} = req.body
			jwt.verify(resetToken, config.authentication.jwtSecret, async function(err, token){
				if(err){
					return res.status(500).send({message: 'Invalid Account'})
				}else{
					const tmpuser = await users.findById(token.id)
					console.log({usr: tmpuser.resetToken})
					console.log({sent: resetToken})
					if(tmpuser.resetToken != resetToken){
						return res.status(403).send({message: 'Token has expired'})
					}
					tmpuser.update({
						password: password
					}).then(() => {
						res.send({tmpuser})
					})
					
				}
			})			
		}catch(err){
			console.log(err)
			res.status(500).send({"error": "Server error setting new password"})
		}
	}

}
