const router = require('express').Router();
const path = require('path');

router.get('/product', (req, res) => {
    const htmlFilePath = path.join(__dirname, '..','views', 'product.html');
    res.sendFile(htmlFilePath);
});

module.exports = router;