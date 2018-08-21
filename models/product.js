const mongoose = require('mongoose')
let Schema = mongoose.Schema

let productsSchema = new Schema({
	imagePath: String,
	title: String,
	price: Number,
	description: String
})

module.exports = mongoose.model('product', productsSchema)