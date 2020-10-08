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
router.get('/grantcycle/findAll', grantCycleController.findAll);
router.post('/grantcycle/', grantCycleController.create);
router.post('/grantcycle/findByName', grantCycleController.findByName);
router.put('/grantcycle/update', grantCycleController.update);

// router.get('/grantcycle/getActive', grantCycleController.createGrantCycle);

module.exports = router;
