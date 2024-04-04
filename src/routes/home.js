const router = require('express').Router();
const path = require('path');
const htmlFilePath = path.join(__dirname, '..', 'public', 'home.html');
const userSchema = require('../models/user');

const domain = ['@gmail.com', '@hotmail.com', '@hotmail.es', '@outlook.es', '@outlook.com', '@universidad-une.com'];

router.get('/home', (req, res) => {
    res.sendFile(htmlFilePath);
});

router.post('/home', async (req, res) => {
    const role = 'user';
    const image = '';

    const { name, surname, email, password, password_2 } = req.body;

    if (domain.some(domain => email.endsWith(domain))) {
        if (password == password_2) {
            try {
                const newSchema = new userSchema({ name, surname, email, password, image, role });
                await newSchema.save();
                res.redirect('/home');
            } catch (error) {
                res.status(500).send('Ocurrió un error al guardar el usuario. Por favor, inténtalo de nuevo.');
            }
        } else {
            res.status(400).send('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        }
    } else {
        res.status(400).send('El correo electrónico ingresado no es válido. Por favor, utiliza una dirección de correo electrónico válida.');
    }
});

module.exports = router;