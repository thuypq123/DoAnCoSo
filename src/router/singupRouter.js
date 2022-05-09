const express = require('express');
const router = express.Router();
const path = require('path');
const user = require('../model/user')
const singupController = require('../controller/singupController')
router.get('/',singupController.getSingup);
router.post('/',singupController.postSingup);
module.exports = router;