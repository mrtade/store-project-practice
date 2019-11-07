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

app.use((req, res, next) => {
    User.findById('5dc35cdda33d9b230481b685')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// This is the callback function to spin-up the server only after connecting to the DB

mongoose.connect('mongodb+srv://admin-mrtade:Momo123@cluster0-ft6tk.mongodb.net/shopDB?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
.then((connection) => {
    // console.log(connection);
    console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');
    console.log('Database connection successful!');
    User.findOne().then(user => {
        if (!user) {
            const user = new User({
                name: 'Me',
                email: 'me@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
        console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');
        console.log(`Existing user "${user._id}" is connected!`);
        console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');

    });

    app.listen(3000);
    console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*'); 
    console.log('Server started on port 3000.');
})
.catch((err) => {
    console.log(err);
});