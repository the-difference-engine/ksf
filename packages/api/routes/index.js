const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

// nomitation endpoints
router.get('/nomination/:id', controllers.getNominationById);

// user endpoints
router.get('/user/:id', controllers.getUserById);

module.exports = router
