const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const session = require('express-session');
const bodyParser = require('body-parser');
const engine = require('ejs-mate');

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'sua-chave-secreta-aqui',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Simular armazenamento de usuários em um array
let users = [
  { name: 'Vendedor1', email: 'vendedor1@gmail.com', password: 'vendedor123', role: 'vendor' }
];

// Rotas
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');


app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);

app.get('/', (req, res) => {
  res.render('index', { error: null });
});

// Rota de produtos (protegida por autenticação)
app.get('/products', (req, res) => {
  if (req.session.logged_in) {
      res.render('products');
  } else {
      res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
      req.session.logged_in = true;
      req.session.user = user;
      
      if (user.role === 'vendor') {
          res.send('Vendor login successful');
      } else {
          res.send('Client login successful');
      }
  } else {
      res.send('Invalid email or password');
  }
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Verifica se o email já está registrado
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
      return res.send('Email already registered');
  }

  const user = {
      name: name,
      email: email,
      password: password,
      role: 'client'  // Assume 'client' role by default
  };

  users.push(user);
  res.redirect('/login');
});


app.get('/profile', (req, res) => {
  if (req.session.logged_in) {
    res.render('profile', { 
      error: null,
      userEmail: req.session.user.email  // Passa o email do usuário para o template
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/products/client', (req, res) => {
  res.render('client', { error: null });
});

app.get('/users', (req, res) => {
  res.render('users', { users });
});



app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.redirect('/profile');
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
  });
});




app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


