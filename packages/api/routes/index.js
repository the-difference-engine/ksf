const { Router } = require('express');
const nominationController = require('../controllers/nomination.js');
const userController = require('../controllers/user.js');
const grantCycleController = require('../controllers/grantCycle.js');

const router = Router();

// nomintation endpoints
router.get('/nomination/:id', nominationController.getNominationById);

// user endpoints
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.create);

// grant cycle endpoints
router.post('/grantcycle/new', grantCycleController.createGrantCycle);

module.exports = router;
