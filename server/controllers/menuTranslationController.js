const {menuTranslate} = require('../models')

module.exports = {
	async createMenu(req, res){
		try{
			const menu = await menuTranslate.create(req.body)
			res.send({menu})
		}catch(err){
			console.log(err)
			res.status(500).send("Error Creating Menu")
		}
	},
	async getMenuById(req, res){
		try{
			const {id} = req.body
			const menu = await menuTranslate.findOne({
				where:{
					id: id
				}
			})
			if(!menu){
				return res.status(404).send({
					error: "menu not found"
				})
			}else{
				res.send({menu})
			}
		}catch(err){
			console.log(err);
			res.status(500).send("error fetching menu")
		}
	},
	async getMenuByLanguage(req, res){
		try{
			const {language} = req.body
			const menu = await menuTranslate.findOne({
				where:{
					language: language
				}
			})
			if(!menu){
				return res.status(404).send({
					error: "menu not found"
				})
			}else{
				res.send({menu})
			}
		}catch(err){
			console.log(err);
			res.status(500).send("error fetching menu")
		}
	},
	async deleteMenu(req, res){
		try{
			const {id} = req.body
			const menu = await menuTranslate.findOne({
				where:{
					id: id
				}
			})
			menu.destroy()
				.then(function(){
					res.send({message: 'menu deleted'})
				})
		}catch(err){
			res.status(500).send({
				error: "Failed to delete menu"
			})
		}
	}
}