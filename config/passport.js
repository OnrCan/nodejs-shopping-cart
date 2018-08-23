const passport = require('passport')
const UserModel = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	UserModel.findById(id, (err, user) => {
		done(err, user)
	})
})

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (req, email, password, done) => {
	UserModel.findOne({ 'email': email }, (err, user) => {
		if (err) {
			return done(err)
		}
		if(user) {
			return done(null, false, {message: 'Email is already in use'})
		}
		let newUser = new UserModel()
		newUser.email = email
		newUser.password = newUser.encryptPassword(password)

		newUser.save((err, result) => {
			if(err) {
				return done(err)
			}
			return done(null, newUser)
		})
	})
}))