
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');
const {
    //CHAMPION
    getHomePage, postCreationChampions, getCreatePage,
    getUpdatePage, postUpdateChampion, postDeleteChampion,
    postHandleRemoveChampion,

    //SKIN
    postSkinPage, getCreateSkinPage, postCreateSkin,
    getUpdateSkinPage, postEditSkin, postDeleteSkin,
    postHandleRemoveSkin,

    //SKILL
    postSkillPage, postSkillPassivePage, postSkillQPage,
    postSkillWPage, postSkillEPage, postSkillRPage,
    postCreateSkillPassive, postCreateSkillQ, postCreateSkillW,
    postCreateSkillE, postCreateSkillR, postEditPassivePage,
    postUpdatePassive, postEditQPage, postUpdateQ,
    postEditWPage, postUpdateW,
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

// CHAMPION------------------------------------------CHAMPION
router.get('/', getHomePage);

router.get('/create', getCreatePage);

router.post('/create-champions', upload.single("profile_pic"), postCreationChampions);

router.get('/update/:champion_id', getUpdatePage);

router.post('/update-champion', upload.single("profile_pic"), postUpdateChampion);

router.post('/delete-champion/:id', postHandleRemoveChampion);

// SKIN-----------------------------------SKIN
router.post('/skin/:id', postSkinPage);

router.get('/create-skin-page/:id', getCreateSkinPage);

router.post('/create-skin', upload.single("profile_pic"), postCreateSkin);

router.get('/update-skin/:skin_id', getUpdateSkinPage);

router.post('/update-skin', upload.single("profile_pic"), postEditSkin);

router.post('/delete-skin', postHandleRemoveSkin);

router.post('/delete-skin/:skin_id', postDeleteSkin);

// SKILL-------------------------------SKILL
router.post('/skill-page/:id', postSkillPage);

//HOMEPAGE SKILL
router.get('/skill-passive-page/:id', postSkillPassivePage);
router.get('/skill-q-page/:id', postSkillQPage);
router.get('/skill-w-page/:id', postSkillWPage);
router.get('/skill-e-page/:id', postSkillEPage);
router.get('/skill-r-page/:id', postSkillRPage);

//CREATE SKILL
router.post('/create-skill-passive', upload.single("profile_pic"), postCreateSkillPassive);
router.post('/create-skill-q', upload.single("profile_pic"), postCreateSkillQ);
router.post('/create-skill-w', upload.single("profile_pic"), postCreateSkillW);
router.post('/create-skill-e', upload.single("profile_pic"), postCreateSkillE);
router.post('/create-skill-r', upload.single("profile_pic"), postCreateSkillR);

//UPDATE SKILL
router.post('/update-passive/:id', postEditPassivePage);
router.post('/update-passive', upload.single("profile_pic"), postUpdatePassive);

router.post('/update-q/:id', postEditQPage);
router.post('/update-q', upload.single("profile_pic"), postUpdateQ);

router.post('/update-w/:id', postEditWPage);
router.post('/update-w', upload.single("profile_pic"), postUpdateW);


module.exports = router;