const { Router } = require('express');
const nominationController = require('../controllers/nomination.js');
const userController = require('../controllers/user.js');

const router = Router();

// nomintation endpoints
router.get('/nomination/:id', nominationController.getNominationById);
router.post('/nomination', nominationController.createNomination);

// user endpoints
router.get('/user/:id', userController.getUserById);

module.exports = router;
