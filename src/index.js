const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');

// Initilizations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);
// app.set('public', path.join(__dirname, 'public'));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));

// Global variables

// Routes
app.use(require('./routes/home_admin'));
app.use(require('./routes/home'));
app.use(require('./routes/payment'));
app.use(require('./routes/product'));
app.use(require('./routes/shipping'));
app.use(require('./routes/shop'));
app.use(require('./routes/shopping_cart'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});