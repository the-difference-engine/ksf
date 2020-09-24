const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/nomination/:id', controllers.getNominationById);

module.exports = router
