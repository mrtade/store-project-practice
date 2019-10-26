const fs = require('fs');
const path =  require('path');

const fileDir = path.join(path.dirname(process.mainModule.filename),'data','cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart

        fs.readFile(fileDir, (err, data) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(data);
            }
            //Analyze the cart > find existing product
            const existingProductIndex = cart.products.findIndex( prod => prod.id === id );
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product or increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                console.log(`Current existing quantity: ${updatedProduct.qty}`);
                updatedProduct.qty = updatedProduct.qty + 1;
                console.log(`Updated quantity if product is existing: ${updatedProduct.qty}`);
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice; // +productPrice coverts productPrice to a number
            fs.writeFile(fileDir, JSON.stringify(cart), err => {
                console.log(err);
            });

        });        
    }
};