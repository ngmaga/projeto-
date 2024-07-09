const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Product = require('../models/product');
const Cart = require('../models/cart');
const upload = multer({ dest: 'public/images/' });

let products = [];
let id = 1;
let cart = new Cart();

// Rota para exibir todos os produtos (cliente)
router.get('/client', (req, res) => {
    res.render('client', { products });
});

// Rota para adicionar produto ao carrinho
router.post('/cart/add/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const quantity = parseInt(req.body.quantity);
    const product = products.find(p => p.id === productId);

    if (product && product.quantity >= quantity) {
        cart.addProduct(product, quantity);
        product.quantity -= quantity;
        res.redirect('/products/client');
    } else {
        res.send('Quantidade solicitada não disponível em estoque.');
    }
});


// Remover produto do carrinho
router.post('/cart/remove/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const removedQuantity = cart.getQuantity(productId); // Obtém a quantidade removida do carrinho
    cart.removeProduct(productId); // Remove o produto do carrinho

    // Atualiza a quantidade disponível no estoque
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products[productIndex].quantity += removedQuantity;
    }

    res.redirect('/products/cart'); // Redireciona de volta para a página do carrinho
});

// Rota para visualizar o carrinho
router.get('/cart', (req, res) => {
    res.render('cart', { cart });
});

// Rota para exibir a página de checkout
router.get('/checkout', (req, res) => {
    res.render('checkout', { cart });
});

// Rota para processar o pagamento
router.post('/checkout', (req, res) => {
    const { paymentMethod, cardNumber, cardName, cardExpiry, cardCVC } = req.body;

    // Processamento do pagamento (exemplo básico)
    if (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') {
        if (cardNumber && cardName && cardExpiry && cardCVC) {
            // Lógica de processamento de pagamento com cartão
            // Exemplo: validando os dados do cartão e processando o pagamento
            console.log(`Processando pagamento com ${paymentMethod}:`);
            console.log(`Número do cartão: ${cardNumber}`);
            console.log(`Nome no cartão: ${cardName}`);
            console.log(`Validade: ${cardExpiry}`);
            console.log(`CVC: ${cardCVC}`);

            // Após processar o pagamento, limpar o carrinho
            cart = new Cart();
            res.send('Pagamento processado com sucesso!');
        } else {
            res.send('Por favor, preencha todos os campos do cartão.');
        }
    } else {
        // Lógica de processamento de outros métodos de pagamento
        // Após processar o pagamento, limpar o carrinho
        cart = new Cart();
        res.send('Pagamento processado com sucesso!');
    }
});

// Rota para exibir todos os produtos (admin)
router.get('/', (req, res) => {
    res.render('admin', { products });
});

// Rota para exibir o formulário de adição de produto
router.get('/add', (req, res) => {
    res.render('edit', { product: null });
});

// Rota para adicionar um novo produto
router.post('/add', upload.single('image'), (req, res) => {
    const { name, quantity, price } = req.body;
    const imageUrl = req.file ? `/images/${req.file.filename}` : '';

    const newProduct = new Product(id++, name, quantity, price, imageUrl);
    products.push(newProduct);

    res.redirect('/products');
});

// Rota para exibir o formulário de edição de produto
router.get('/edit/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    res.render('edit', { product });
});

// Rota para atualizar um produto
router.post('/edit/:id', upload.single('image'), (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, quantity, price } = req.body;
    const productIndex = products.findIndex(p => p.id === productId);

    const imageUrl = req.file ? `/images/${req.file.filename}` : products[productIndex].imageUrl;

    products[productIndex] = new Product(productId, name, quantity, price, imageUrl);

    res.redirect('/products');
});

// Rota para deletar um produto
router.post('/delete/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    products = products.filter(p => p.id !== productId);

    res.redirect('/products');
});




module.exports = router;
