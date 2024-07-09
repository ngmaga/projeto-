// public/js/checkout.js

function toggleCardFields() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const cardFields = document.getElementById('cardFields');
    const pixFields = document.getElementById('pixFields');

    cardFields.style.display = (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') ? 'block' : 'none';
    pixFields.style.display = (paymentMethod === 'pix') ? 'block' : 'none';
}

function validateForm(event) {
    const paymentMethod = document.getElementById('paymentMethod').value;
    if (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardName = document.getElementById('cardName').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCVC = document.getElementById('cardCVC').value;

        if (!cardNumber || !cardName || !cardExpiry || !cardCVC) {
            alert('Por favor, preencha todos os campos do cartão.');
            event.preventDefault();
        } else {
            alert('Pagamento realizado com sucesso!');
            event.preventDefault();
            window.location.href = '/products/client'; // Redireciona para a página de produtos após o alerta
        }
    } else if (paymentMethod === 'pix') {
        alert('Pagamento via Pix realizado com sucesso!');
        event.preventDefault();
        window.location.href = '/products/client'; // Redireciona para a página de produtos após o alerta
    }
}

document.addEventListener('DOMContentLoaded', () => {
    toggleCardFields();
    document.getElementById('paymentForm').addEventListener('submit', validateForm);
});
