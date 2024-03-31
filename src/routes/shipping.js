const router = require('express').Router();
const path = require('path');

router.get('/shipping', (req, res) => {
    const htmlFilePath = path.join(__dirname, '..','views', 'shipping.html');
    res.sendFile(htmlFilePath);
});

module.exports = router;