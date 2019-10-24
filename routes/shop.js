/**EXPRESS-ROUTER IMPLEMENTATION TO SEPERATE YOUR WORK INTO MINI-EXPRESS MODULES - SHOP ROUTE
 * Tap into the express module
 * Create constant router from the built-in express-Router
 * Then use router instead of app
 */

const express = require('express');

const path = require('path'); // this is nodeJs core module

const router = express.Router();

// Import the product controller from products.js
const shopController = require('../controllers/shop');

// Use router instead of app
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

// Export the router
module.exports = router;