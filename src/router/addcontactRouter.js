const express = require('express');
const router = express.Router();
const addContactController = require('../controller/addContactController');

router.get('/', (req, res) => {
    console.log("hello get");
})

router.post('/',addContactController.postContact)

module.exports = router;