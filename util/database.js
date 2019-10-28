const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://admin-mrtade:Momo123@cluster0-ft6tk.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
        console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');
        console.log('DB connected!');
        console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');
        callback(client);
    })
    .catch(err => {
        console.log(err);
        throw err; 
    });
};

module.exports = mongoConnect;