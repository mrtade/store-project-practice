const getDb = require('../util/database').getDb;
const Cart = require('./cart');

const getProductsFromFile = cb => {
  // fs.readFile(p, (err, fileContent) => {
  //   if (err) {
  //     cb([]);
  //   } else {
  //     cb(JSON.parse(fileContent));
  //   }
  // });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getDb();
    return db.collection('products').insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
    });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray()
    .then(products => {
      console.log(products);
      return products;
    }).catch(err => {
      console.log(err);
    });
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
