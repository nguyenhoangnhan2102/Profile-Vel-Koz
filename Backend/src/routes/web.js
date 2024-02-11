
const express = require('express');
const router = express.Router();
const { getHomePage, getABC } = require('../controllers/homeController');
//Khai báo route

//route.Method('/route', name_handle)
router.get('/', getHomePage);

router.get('/abc', getABC)

module.exports = router;