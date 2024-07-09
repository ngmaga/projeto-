const express = require('express');
const router = express.Router();

// Rota para exibir a página de checkout
router.get('/', (req, res) => {
    const cart = req.session.cart; // Acessa o carrinho da sessão

    if (!cart || cart.items.length === 0) {
        return res.redirect('/profile');
    }

    const total = cart.items.reduce((sum, item) => {
        return sum + item.quantity * parseFloat(item.product.price || 0);
    }, 0);

    res.render('checkout', { total });
});

module.exports = router;
