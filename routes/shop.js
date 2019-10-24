/**EXPRESS-ROUTER IMPLEMENTATION TO SEPERATE YOUR WORK INTO MINI-EXPRESS MODULES - SHOP ROUTE
 * Tap into the express module
 * Create constant router from the built-in express-Router
 * Then use router instead of app
 */

const express = require('express');

const path = require('path'); // this is nodeJs core module

const router = express.Router();

// Import the product controller from products.js
const productsController = require('../controllers/products');

// Use router instead of app
router.get('/', productsController.getProducts);

// Export the router
module.exports = router;