const mongoose = require('mongoose')
let Schema = mongoose.Schema
let bcrypt = require('bcrypt-nodejs')

let userSchema = new Schema({
	email: String,
	password: String
})

userSchema.methods.encryptPassword = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('user', userSchema)