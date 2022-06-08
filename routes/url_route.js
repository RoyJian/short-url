const express = require('express');
const router = express.Router();
const {CreateUrl,DecodeUrl} = require('../controllers/url_controller');
router.post('/shorten',CreateUrl);
router.get('/shorten',DecodeUrl);

module.exports = router;