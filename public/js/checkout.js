// public/js/checkout.js

function toggleCardFields() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const cardFields = document.getElementById('cardFields');
    const pixFields = document.getElementById('pixFields');

    cardFields.style.display = (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') ? 'block' : 'none';
    pixFields.style.display = (paymentMethod === 'pix') ? 'block' : 'none';
}// public/js/checkout.js

class Checkout {
    constructor() {
        this.paymentMethod = document.getElementById('paymentMethod');
        this.cardFields = document.getElementById('cardFields');
        this.pixFields = document.getElementById('pixFields');
        this.cardNumber = document.getElementById('cardNumber');
        this.cardName = document.getElementById('cardName');
        this.cardExpiry = document.getElementById('cardExpiry');
        this.cardCVC = document.getElementById('cardCVC');

        this.toggleCardFields(); // Chamamos o método para definir os campos iniciais
        document.getElementById('paymentForm').addEventListener('submit', this.validateForm.bind(this));
        this.paymentMethod.addEventListener('change', this.toggleCardFields.bind(this));
    }

    toggleCardFields() {
        const paymentMethodValue = this.paymentMethod.value;

        this.cardFields.style.display = (paymentMethodValue === 'creditCard' || paymentMethodValue === 'debitCard') ? 'block' : 'none';
        this.pixFields.style.display = (paymentMethodValue === 'pix') ? 'block' : 'none';
    }

    validateForm(event) {
        const paymentMethodValue = this.paymentMethod.value;

        if (paymentMethodValue === 'creditCard' || paymentMethodValue === 'debitCard') {
            if (!this.cardNumber.value || !this.cardName.value || !this.cardExpiry.value || !this.cardCVC.value) {
                alert('Por favor, preencha todos os campos do cartão.');
                event.preventDefault();
            } else {
                this.paymentSuccessAlert();
            }
        } else if (paymentMethodValue === 'pix') {
            this.paymentSuccessAlert();
        }
    }

    paymentSuccessAlert() {
        alert('Pagamento realizado com sucesso!');
        event.preventDefault();
        window.location.href = '/products/client'; // Redireciona para a página de produtos após o alerta
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Checkout();
});


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
