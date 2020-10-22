const { Router } = require('express');
const nominationController = require('../controllers/nomination.js');
const userController = require('../controllers/user.js');
const grantCycleController = require('../controllers/grantCycle.js');

const router = Router();

// nomintation endpoints
router.get('/nomination/:id', nominationController.getNominationById);
router.post('/nomination', nominationController.createNomination);

// user endpoints
router.get('/user/:id', userController.getUserById);

// grant cycle endpoints
router.post('/grantcycle/new', grantCycleController.createGrantCycle);

module.exports = router;
