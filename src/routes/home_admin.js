const router = require('express').Router();
const path = require('path');
const userSchema = require('../models/user');
const productSchema = require('../models/product');
const multer = require('multer');
const fs = require('node:fs');
const { scrypt } = require('crypto');
const { error } = require('console');

const htmlFilePath = path.join(__dirname, '..', 'public', 'home_admin.html');

const domain = ['@support.com'];

const imageAdmin = multer({ dest: 'uploads/images_admin/' });
const imageProduct = multer({ dest: 'uploads/images_product/' });

function saveImageAdmin(file) {
    const newPath = `./uploads/images_admin/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

function saveImageProduct(file, brand, animalCategory, productCategory) {
    const destinationDir = `./uploads/images_product/${brand}/${animalCategory}/${productCategory}`;
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
    }
    const newPath = `${destinationDir}${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

// Envia el archivo HTML al administrador como respuesta
router.get('/home_admin', (req, res) => {
    res.sendFile(htmlFilePath);
});

// Maneja la solicitud POST para agregar un administrador y guarda la información en la base de datos
router.post('/home_admin/admin', imageAdmin.single('image'), async (req, res) => {
    const role = 'admin';
    const { name, surname, email, password, password_2 } = req.body;
    const image = saveImageAdmin(req.file);

    if (domain.some(domain => email.endsWith(domain))) {
        if (password == password_2) {
            try {
                const newSchema = new userSchema({ name, surname, email, password, image, role });
                await newSchema.save();
                res.status(200).send('<script>alert("Usuario guardado correctamente"); window.location.href="./home_admin";</script>');
            } catch (error) {
                res.status(500).json('Ocurrió un error al guardar el usuario. Por favor, inténtalo de nuevo.');
            }
        } else {
            res.status(400).json('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        }
    } else {
        res.status(400).json('El correo electrónico ingresado no es válido. Por favor, utiliza una dirección de correo electrónico válida.');
    }
});

// Maneja la solicitud POST para agregar un producto y guarda la información en la base de datos
router.post('/home_admin/product', imageProduct.array('image_product', 10), async (req, res) => {
    const { brand, title, productCategory, animalCategory, description, piece, stock, kilogram, pricePerUnit, expiration } = req.body;
    const images = [];

    // Guarda todas las imagenes y recopila sus rutas
    req.files.forEach(file => {
        const imagePath = saveImageProduct(file, brand, animalCategory, productCategory);
        images.push(imagePath);
    });

    try {
        const newSchema = new productSchema({ brand, title, productCategory, animalCategory, description, images, piece, stock, kilogram, pricePerUnit, expiration });
        await newSchema.save();
        res.redirect('/home_admin');

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al guardar el producto. Por favor, inténtalo de nuevo." });
    }
});

module.exports = router;