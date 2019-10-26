// Import the Product class from models
const Products = require('../models/product');

exports.getAddProduct = (req, res, next) => {

    res.render('admin/edit-product', 
    {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });

  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res, next) => {
    console.log(`item to save: ${req.body.title}`);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    // use the Products class in models
    const product = new Products(title, imageUrl, description, price);
    product.save();

    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  // console.log(editMode);
  const prodId = req.params.productId;
  Products.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });

};

exports.getProducts = (req, res, next) => {
    Products.fetchAll((products) => {
    //   console.log('getIndex fetchAll:', products);
      res.render('admin/products', 
      {
        pageTitle: 'Admin Products',
        prods: products,
        path: '/admin/products'
      });
  });
  };