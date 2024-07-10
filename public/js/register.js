class RegisterForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.errorMessage = document.getElementById('errorMessage');

        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        this.registerUser(name, email, password);
    }

    registerUser(name, email, password) {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                name: name,
                email: email,
                password: password
            })
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes('Email already registered')) {
                this.showError('Email já está registrado');
            } else {
                window.location.href = '/login';
            }
        })
        .catch(error => {
            console.error('Erro ao registrar usuário:', error);
            this.showError('Ocorreu um erro ao registrar o usuário. Por favor, tente novamente.');
        });
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
    }
}

// Aguardando o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Instanciando a classe RegisterForm
    const registerForm = new RegisterForm('registerForm');
});
r