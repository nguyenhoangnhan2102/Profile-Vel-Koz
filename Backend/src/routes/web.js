
const express = require('express');
const router = express.Router();
const { getHomePage } = require('../controllers/homeController');
//Khai báo route

//route.Method('/route', name_handle)
router.get('/', getHomePage);

router.get('/abc', (req, res) => {
    res.send('Hello World with ABC!!!')
})

module.exports = router;