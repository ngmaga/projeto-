document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

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
            errorMessage.textContent = 'Email já está registrado';
            errorMessage.style.display = 'block';
        } else {
            window.location.href = '/login';
        }
    });
});
