// Import the Product class from models
const Products = require('../models/product');

exports.getProducts = (req, res, next) => {
    Products.fetchAll((products) => {
        // console.log('getProducts fetchAll:', products);
        res.render('shop/product-list', 
        {
          pageTitle: 'All products',
          prods: products,
          path: '/products'
        });
    });

};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(`product id: ${prodId}`);
  res.redirect('/');
};

exports.getIndex = (req, res, next) => {
  Products.fetchAll((products) => {
    // console.log('getIndex fetchAll:', products);
    res.render('shop/index', 
    {
      pageTitle: 'Shop',
      prods: products,
      path: '/'
    });
});
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};