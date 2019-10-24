/**EXPRESS-ROUTER IMPLEMENTATION TO SEPERATE YOUR WORK INTO MINI-EXPRESS MODULES - ADMIN ROUTE
 * Tap into the express module
 * Create constant router from the built-in express-Router
 * Then use router instead of app
 */

const path = require('path'); 

const express = require('express');

const router = express.Router();

// Custom code pointing to the root directory
const rootDir = require('../util/cust-paths');

// Import the product controller from products.js
const adminController = require('../controllers/admin');

// Use router instead of app
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

// Use router instead of app
router.post('/add-product', adminController.postAddProduct);

// Export the router
module.exports = router;