const router = require('express').Router();
const path = require('path');

router.get('/home_admin', (req, res) => {
    const htmlFilePath = path.join(__dirname, '..','views', 'home_admin.html');
    res.sendFile(htmlFilePath);
});

module.exports = router;