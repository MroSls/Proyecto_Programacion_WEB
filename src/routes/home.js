const router = require('express').Router();
const path = require('path');

const htmlFilePath = path.join(__dirname, '..','views', 'home.html');

router.get('/home', (req, res) => {
    res.sendFile(htmlFilePath);
});

router.post('/home/new-user', (req, res) => {
    console.log(req.body);
    res.sendFile(htmlFilePath);
});

module.exports = router;