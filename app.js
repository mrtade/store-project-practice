/**THIS IS THE MAIN APP WITH EXPRESS-ROUTER IMPORTS
 * You can access the 'mini-apps' by requiring their files in directory pointing to constants
 * and implement app.use() on the constants
 */

const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
// app.set('views', 'views'); this is the default setting if you are already using the views folder

// Custom code pointing to the root directory
const rootDir = require('./util/cust-paths');

// This is where mini-app routes are imported into the main app with the require function
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

//Import the error.js controller file
const errorController = require('./controllers/error');

//This is how to setup your app with express to look into the public dir for css files, images etc
app.use(express.static(path.join(rootDir, 'public')));

// Use the route modules as middleware
app.use('/admin', adminRoutes); // filters the admin route as it prefixes adminRoutes with /admin
app.use(shopRoutes);

app.use('/', errorController.get404);

// Spin up server.
app.listen(3000);
console.log('!==========================================================!');
console.log('Server started on port 3000.');
console.log(`Main directory: ${path.join(rootDir)}`);
console.log('!==========================================================!');