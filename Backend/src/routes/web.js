
const express = require('express');
const router = express.Router();
const { getHomePage,
    postCreationChampions,
    getCreatePage,
    getUpdatePage,
} = require('../controllers/homeController');
//Khai báo route

//route.Method('/route', name_handle)
router.get('/', getHomePage);

router.get('/create', getCreatePage);

router.post('/create-champions', postCreationChampions);

router.get('/update', getUpdatePage);

module.exports = router;