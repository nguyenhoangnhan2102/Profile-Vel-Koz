
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');
const { getHomePage,
    postCreationChampions,
    getCreatePage,
    getUpdatePage,
    postUpdateChampion,
    postDeleteChampion,
    postHandleRemoveChampion,
    postSkinPage,
} = require('../controllers/homeController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/img");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp)$/)) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

//route.Method('/route', name_handle)
router.get('/', getHomePage);

router.get('/create', getCreatePage);

router.post('/create-champions', upload.single("profile_pic"), postCreationChampions);

router.get('/update/:id', getUpdatePage);

router.post('/update-champion', upload.single("profile_pic"), postUpdateChampion);

router.post('/delete-champion', postHandleRemoveChampion);

router.post('/delete-champion/:id', postDeleteChampion);

router.post('/skin/:id', postSkinPage);

module.exports = router;