const router = require('express').Router();
const path = require('path');

router.get('/payment', (req, res) => {
    const htmlFilePath = path.join(__dirname, '..','views', 'payment.html');
    res.sendFile(htmlFilePath);
});

module.exports = router;