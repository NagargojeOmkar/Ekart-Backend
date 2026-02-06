const express = require('express');
const{pingController} = require('../../controllers/ping_controller');
const router = express.Router();

router.get('/ping', pingController);

module.exports = router;