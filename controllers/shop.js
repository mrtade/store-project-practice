// Import the Product class from models
const Products = require('../models/product');
const Cart = require('../models/cart');

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
  Products.findById(prodId, product => {
    res.render('shop/product-detail', 
    {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
  // res.redirect('/');
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

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Products.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/');
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