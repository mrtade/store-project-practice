
const fs = require('fs');
const path = require('path');
const fileDir = path.join(path.dirname(process.mainModule.filename),'data','products.json');

const getProductsFromFile = (cb) => {

    fs.readFile(fileDir, (err, data) => {
        if (err) {
            console.log('This is the readFile error', err);
            cb([]);
        } else {
        console.log('This is the file content: ', data);
        console.log('This is the post parse file content: ', JSON.parse(data));
        cb(JSON.parse(data));
        }
    });
}

module.exports = class Product {

    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            console.log('This is the updated products array:', products);

            fs.writeFile(fileDir,JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    
    };


    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
};