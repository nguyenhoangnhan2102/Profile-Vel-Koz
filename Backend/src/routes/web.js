
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
    getCreateSkinPage,
    postCreateSkin,
    getUpdateSkinPage,
    postEditSkin,
    postDeleteSkin,
    postHandleRemoveSkin,
    postSkillPage,
    getUpdateSkill,
    postUpdateSkillPage,
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

//Trang home
router.get('/', getHomePage);

// Tướng
router.get('/create', getCreatePage);

router.post('/create-champions', upload.single("profile_pic"), postCreationChampions);

router.get('/update/:champion_id', getUpdatePage);

router.post('/update-champion', upload.single("profile_pic"), postUpdateChampion);

router.post('/delete-champion/:champion_id', postDeleteChampion);

router.post('/delete-champion', postHandleRemoveChampion);

// Trang phục
router.post('/skin/:id', postSkinPage);

router.get('/create-skin-page', getCreateSkinPage);

router.post('/create-skin', upload.single("profile_pic"), postCreateSkin);

router.get('/update-skin/:skin_id', getUpdateSkinPage);

router.post('/update-skin', upload.single("profile_pic"), postEditSkin);

router.post('/delete-skin', postHandleRemoveSkin);

router.post('/delete-skin/:skin_id', postDeleteSkin);

//Kỹ năng
router.post('/skill/:id', postSkillPage);

router.get('/update-skill/:id_skill', getUpdateSkill);

router.post('/update-skill', postUpdateSkillPage);

module.exports = router;