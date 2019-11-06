const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const errorController = require('./controllers/error');

// Require mongodb connection from the /util/database folder
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     User.findById('5db78144d0f40a282475afae')
//         .then(user => {
//             req.user = new User(user.name, user.email, user.cart, user._id);
//             next();
//         })
//         .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// This is the callback function to spin-up the server only after connecting to the DB

mongoose.connect('mongodb+srv://admin-mrtade:Momo123@cluster0-ft6tk.mongodb.net/shopDB?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
.then((connection) => {
    app.listen(3000);
    // console.log(connection);
    console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');
    console.log('Database connection successful!');
    console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');
    console.log('Server started on port 3000.');
    console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');
})
.catch((err) => {
    console.log(err);
});