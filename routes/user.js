
const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

// user
router.get('/getAllData', user.getAllData);
router.post('/setDataRedis', user.setOneDataByRedis)
router.post('/getDataRedis', user.getOneDataByRedis)
router.get('/getOneData', user.getOneDataByRedis);
router.post('/addData', user.addData);

module.exports = router;