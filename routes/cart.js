// routes/cart.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');

let cart = new Cart();

// Rota para exibir o carrinho
router.get('/', (req, res) => {
    res.render('cart', { cart: cart.getItems(), total: cart.getTotal() });
});

// Rota para remover um item do carrinho
router.post('/remove/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    cart.removeProduct(productId);
    res.redirect('/cart');
});

module.exports = router;
