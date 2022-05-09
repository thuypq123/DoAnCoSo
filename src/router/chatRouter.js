const express = require('express');
const router = express.Router();
const path = require('path');
const chatController = require('../controller/chatController');

router.get('/',chatController.getChat);
router.post('/',chatController.postChat);

module.exports = router;