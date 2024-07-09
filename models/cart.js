// models/cart.js

class Cart {
    constructor() {
        this.items = []; // Array para armazenar os itens no carrinho
    }

    // Adicionar um produto ao carrinho
    addProduct(product, quantity) {
        // Verificar se o produto já está no carrinho
        const existingItem = this.items.find(item => item.product.id === product.id);

        if (existingItem) {
            // Se já existe, aumenta a quantidade
            existingItem.quantity += quantity;
        } else {
            // Se não existe, adiciona como um novo item no carrinho
            this.items.push({ product, quantity });
        }
    }

    // Remover um produto do carrinho
    removeProduct(productId) {
        // Encontrar o índice do item no carrinho
        const index = this.items.findIndex(item => item.product.id === productId);

        if (index !== -1) {
            // Remover o item do array de itens
            this.items.splice(index, 1);
        }
    }

    // Obter todos os itens do carrinho
    getItems() {
        return this.items;
    }

    // Obter a quantidade de um produto no carrinho
    getQuantity(productId) {
        const item = this.items.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
    }

    // Calcular o total do carrinho
    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }
}

module.exports = Cart;
