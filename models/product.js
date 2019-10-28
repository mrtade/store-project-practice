const getDb = require('../util/database').getDb;
const mongodb = require('mongodb'); // allows to use new mongodb.ObjectId on the _id
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
    return db.collection('products').find().toArray() // toArray is used here so we can get a promise
    .then(products => {
      console.log(products);
      return products;
    }).catch(err => {
      console.log(err);
    });
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products')
    .find({ _id: new mongodb.ObjectId(prodId) }) // _id are saved as special mongodb ObjectId and this is how to convert a sting to the format the _id is stored on the DB
    .next() // passes the result to the next function to allow us get a promise
    .then(product => {
      console.log(product);
      return product;
    })
    .catch(err => {
      console.log(err);
    });
  }
};
