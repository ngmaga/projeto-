class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.errorMessage = document.getElementById('errorMessage');

        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();
        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                email: email,
                password: password
            })
        })
        .then(response => response.text())
        .then(data => {
            this.handleLoginResponse(data);
        });
    }

    handleLoginResponse(data) {
        if (data.includes('Vendor login successful')) {
            window.location.href = '/products'; // Redireciona para a página de estoque
        } else if (data.includes('Client login successful')) {
            window.location.href = '/profile'; // Redireciona para a página de perfil
        } else {
            this.errorMessage.textContent = data;
            this.errorMessage.style.display = 'block';
        }
    }
}

// Utilização da classe LoginForm
document.addEventListener('DOMContentLoaded', () => {
    new LoginForm();
});
