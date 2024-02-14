
const express = require('express');
const router = express.Router();
const { getHomePage,
    postCreationChampions,
    getCreatePage,
    getUpdatePage,
    postUpdateChampion,
    postDeleteChampion,
    postHandleRemoveChampion,
} = require('../controllers/homeController');
//Khai báo route

//route.Method('/route', name_handle)
router.get('/', getHomePage);

router.get('/create', getCreatePage);

router.post('/create-champions', postCreationChampions);

router.get('/update/:id', getUpdatePage);

router.post('/update-champion', postUpdateChampion);

router.post('/delete-champion', postHandleRemoveChampion);

router.post('/delete-champion/:id', postDeleteChampion);

module.exports = router;