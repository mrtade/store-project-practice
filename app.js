const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

// Require mongodb connection from the /util/database folder
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

// This is the callback function to spin-up the server only after connecting to the DB
mongoConnect(() => {
    app.listen(3000);
    console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');
    console.log('Server started on port 3000.');
    console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*');
});