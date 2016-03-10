var express = require('express');
var router = express.Router();

var products = [
  { productName : 'Soylent',
    productDescription : 'Gross',
    ProductPrice : 10.99
  }
];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/product/:name', function(req, res, next) {
  var productName = req.params.name;
  
  for (var i = 0; i < products.length; i++) { 
    if (productName = products[i].productName) {
      return res.render('product', {productInfo: products[i]})
    } else {
      return next('Product does not exist');
    }
  }
    
});

module.exports = router;
