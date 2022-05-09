const express = require('express');
const router = express.Router();
const path = require('path');
const handelContactController = require('../controller/handleContactController');

router.get('/',handelContactController.getHandleContact);
router.post('/',handelContactController.postHandleContact);

module.exports = router;