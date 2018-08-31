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
	req.checkBody('email', 'Invalid email').notEmpty().isEmail()
	req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 })
	let errors = req.validationErrors()

	if (errors) {
		let messages = []
		errors.forEach((err) => {
			messages.push(err.msg)
		})
		return done(null, false, req.flash('error', messages))
	}

	UserModel.findOne({ 'email': email }, (err, user) => {
		if (err) {
			return done(err)
		}
		if (user) {
			return done(null, false, { message: 'Email is already in use' })
		}
		let newUser = new UserModel()
		newUser.email = email
		newUser.password = newUser.encryptPassword(password)

		newUser.save((err, result) => {
			if (err) {
				return done(err)
			}
			return done(null, newUser)
		})
	})
}))

passport.use('local.signin', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (req, email, password, done) => {
	req.checkBody('email', 'Invalid email').notEmpty().isEmail()
	req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 })
	let errors = req.validationErrors()

	if (errors) {
		let messages = []
		errors.forEach((err) => {
			messages.push(err.msg)
		})
		return done(null, false, req.flash('error', messages))
	}

	UserModel.findOne({ 'email': email }, (err, user) => {
		if (err) { return done(err) }
		if (!user) {
			return done(null, false, { message: 'Nothing found related with this e-mail address!' })
		}
		if(!user.validPassword(password)) {
			return done(null, false, { message: 'Password is wrong!' })
		}

		return done(null, user)
	})
}))