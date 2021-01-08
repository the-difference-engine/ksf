const { Router } = require('express');
const nominationController = require('../controllers/nomination.js');
const userController = require('../controllers/user.js');
const grantCycleController = require('../controllers/grantCycle.js');

const router = Router();

// nomintation endpoints
router.get('/api/nominations/:id', nominationController.getNominationById);
router.get('/api/nominations', nominationController.findAllNominataions);
router.post('/api/nominations', nominationController.createNomination);
router.put('/api/nominations/:id', nominationController.updateNomination);

// user endpoints
router.get('/api/user/:id', userController.getUserById);
router.post('/api/user', userController.create);

// grant cycle endpoints
router.get('/api/grantcycles', grantCycleController.findAll);
router.get('/api/grantcycle/findactive', grantCycleController.findActive);
router.get('/api/grantcycle/findbyname/:name', grantCycleController.findByName);
router.post('/api/grantcycle', grantCycleController.create);
router.put('/api/grantcycle/:id', grantCycleController.update);

module.exports = router;
