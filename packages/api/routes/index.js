const { Router } = require('express');
const nominationController = require('../controllers/nomination.js');
const userController = require('../controllers/user.js');
const grantCycleController = require('../controllers/grantCycle.js');

const router = Router();

// nomintation endpoints
router.get('/nomination/:id', nominationController.getNominationById);
router.get('/nominations', nominationController.findAllNominataions);
router.post('/nomination', nominationController.createNomination);

// user endpoints
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.create);

// grant cycle endpoints
router.get('/grantcycles', grantCycleController.findAll);
router.get('/grantcycle/findactive', grantCycleController.findActive);
router.get('/grantcycle/findbyname/:name', grantCycleController.findByName);
router.post('/grantcycle', grantCycleController.create);
router.put('/grantcycle/:id', grantCycleController.update);

module.exports = router;
