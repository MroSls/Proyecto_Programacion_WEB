const router = require('express').Router();
const path = require('path');

router.get('/shopping_cart', (req, res) => {
    const htmlFilePath = path.join(__dirname, '..','views', 'shopping_cart.html');
    res.sendFile(htmlFilePath);
});

module.exports = router;