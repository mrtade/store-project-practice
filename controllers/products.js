// Import the Product class from models
const Products = require('../models/product');

exports.getAddProduct = (req, res, next) => {

    res.render('add-product', 
    {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
    });

  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res, next) => {
    console.log(`item to save: ${req.body.title}`);
    
    // use the Products class in models
    const product = new Products(req.body.title);
    product.save();

    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Products.fetchAll((products) => {
        console.log('This is the getProducts fetchAll:', products);
        res.render('shop', 
        {
          pageTitle: 'Shop',
          prods: products,
          path: '/'
        });
    });

    //path.join allows to point to the required directory starting from the absolute directory
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};