const ProductModel = require('../models/product')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/nodejs-shopping-cart', {useNewUrlParser: true})

let products = [
	new ProductModel({
		imagePath: 'https://maryannemistretta.files.wordpress.com/2012/11/daffy-duck.png',
		title: 'Daffy Duck',
		description: 'Lorem ipsum dolor sit amet...',
		price: 10
	}),
	new ProductModel({
		imagePath: 'https://vignette.wikia.nocookie.net/animatedfeetscenes/images/f/ff/Bugsbunny-body.png/revision/latest/scale-to-width-down/300?cb=20180606184826',
		title: 'Bugs Bunny',
		description: 'Lorem ipsum dolor sit amet...',
		price: 10
	}),
	new ProductModel({
		imagePath: 'https://vignette.wikia.nocookie.net/vsbattles/images/4/4a/Yosemite_Sam_by_chaosengine77.png/revision/latest?cb=20161019000453',
		title: 'Yosemite Sam',
		description: 'Lorem ipsum dolor sit amet...',
		price: 10
	}),
	new ProductModel({
		imagePath: 'https://i.pinimg.com/originals/8d/ab/52/8dab52be3fd74499aa4e5fb24348b139.png',
		title: 'Coyote',
		description: 'Lorem ipsum dolor sit amet...',
		price: 10
	}),
	new ProductModel({
		imagePath: 'https://vignette.wikia.nocookie.net/looneytunes/images/1/13/Looneytunes-roadrunner.gif/revision/latest?cb=20130303015934',
		title: 'Road Runner',
		description: 'Lorem ipsum dolor sit amet...',
		price: 10
	}),
	new ProductModel({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Taz-Looney_Tunes.svg/1200px-Taz-Looney_Tunes.svg.png',
		title: 'Tasmania Devil',
		description: 'Lorem ipsum dolor sit amet...',
		price: 10
	}),
	new ProductModel({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Sylvester_the_Cat.svg/1200px-Sylvester_the_Cat.svg.png',
		title: 'Sylvester',
		description: 'Lorem ipsum dolor sit amet...',
		price: 10
	}),
	new ProductModel({
		imagePath: 'https://vignette.wikia.nocookie.net/looneytunes/images/7/79/Tweety.png/revision/latest?cb=20130218203946',
		title: 'Tweety',
		description: 'Lorem ipsum dolor sit amet...',
		price: 10
	})
]

let done = 0
products.forEach((product) => {
	product.save().then(() => {
		done++
		if(done === products.length) exit()
	})
})
function exit() {
	mongoose.disconnect()
}