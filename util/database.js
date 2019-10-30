const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// _ before db only signifies the variable will be used only in this file.
let _db; 

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://admin-mrtade:Momo123@cluster0-ft6tk.mongodb.net/shopDB?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
        console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');
        console.log('DB connected!');
        console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');
        
        // A client is returned after DB connection. client.db() refers to the database to connect to on the current client connection
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err; 
    });
};

// This will return an already established connaction to the database when required from multiple files
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;