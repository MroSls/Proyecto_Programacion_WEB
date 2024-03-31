const router = require('express').Router();
const path = require('path');

router.get('/shop', (req, res) => {
    const htmlFilePath = path.join(__dirname, '..','views', 'shop.html');
    res.sendFile(htmlFilePath);
});

module.exports = router;