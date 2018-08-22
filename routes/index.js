var express = require('express');
var router = express.Router();
var ProductModel = require('../models/product')
var csrf = require('csurf')


var csrfProtection = csrf()
router.use(csrfProtection)

/* GET home page. */
router.get('/', function (req, res, next) {

  ProductModel.find().then((docs) => {

    let productChunks = []
    let chunkSize = 3

    for (let i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize))
    }

    res.render('shop/index', {
      title: 'Shopping Cart',
      products: docs
    });
  })

});

router.get('/user/signup', (req, res, next) => {
  res.render('user/signup', {
    csrfToken: req.csrfToken()
  })
})

router.post('/user/signup', (req, res, next) => {
  res.redirect('/')
})

module.exports = router;
