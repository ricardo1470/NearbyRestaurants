#!/usr/bin/node
/* config routes */

const express = require('express');
const router = express.Router();

const { getinit } = require('../controllers/init'); // import getinit from init

router.get('/', getinit); // get init data from init controller

module.exports = router;