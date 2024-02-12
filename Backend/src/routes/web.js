
const express = require('express');
const router = express.Router();
const { getHomePage, getABC, postCreationChampions } = require('../controllers/homeController');
//Khai báo route

//route.Method('/route', name_handle)
router.get('/', getHomePage);

router.get('/abc', getABC)

router.post('/create-champions', postCreationChampions);

module.exports = router;