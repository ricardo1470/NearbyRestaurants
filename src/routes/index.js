#!/usr/bin/node
/* config routes */

const express = require('express');
const router = express.Router();

const { getinit, getTest } = require('../controllers/init'); // import getinit from init

router.get('/', getinit); // get init data from init controller

router.get('/test', getTest); // get init data from init controller

module.exports = router;