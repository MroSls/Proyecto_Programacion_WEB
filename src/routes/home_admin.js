const router = require('express').Router();
const path = require('path');
const userSchema = require('../models/user');
const multer = require('multer');
const fs = require('node:fs');

const htmlFilePath = path.join(__dirname, '..', 'views', 'home_admin.html');

const domain = ['@support.com'];

const upload = multer({ dest: 'uploads/' });

function saveImage(file) {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}


router.get('/home_admin', (req, res) => {
    res.sendFile(htmlFilePath);
});

router.post('/home_admin', upload.single('image'), async (req, res) => {
    const role = 'admin';

    const { name, surname, email, password, password_2 } = req.body;
    const image = saveImage(req.file);

    if (domain.some(domain => email.endsWith(domain))) {
        if (password == password_2) {
            try {
                const newSchema = new userSchema({ name, surname, email, password, image, role });
                await newSchema.save();
                res.redirect('/home_admin');
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