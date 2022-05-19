const express = require('express');
const router = express.Router();
const path = require('path');
const editProfileController = require('../controller/editProfileController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname,'../public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    }
});
router.get('/',editProfileController.getEditProfile);
router.post('/',upload.single('image'), editProfileController.postEditProfile);

module.exports = router;