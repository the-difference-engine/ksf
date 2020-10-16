const { Router } = require('express');
const nominationController = require('../controllers/nomination.js');
const userController = require('../controllers/user.js');
const grantCycleController = require('../controllers/grantCycle.js');

const router = Router();

// nomintation endpoints
router.get('/nomination/:id', nominationController.getNominationById);

// user endpoints
router.get('/user/:id', userController.getUserById);

// grant cycle endpoints
router.get('/grantcycle/findall', grantCycleController.findAll);
router.get('/grantcycle/findactive', grantCycleController.findActive);
router.get('/grantcycle/findbyname/:name', grantCycleController.findByName);
router.post('/grantcycle', grantCycleController.create);
router.put('/grantcycle/:id', grantCycleController.update);

module.exports = router;
