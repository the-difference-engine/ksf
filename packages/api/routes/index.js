const { Router } = require('express');
const nominationController = require('../controllers/nomination.js');
const userController = require('../controllers/user.js');
const grantCycleController = require('../controllers/grantCycle.js');

const router = Router();

// nomination endpoints
router.get('/api/nominations/:id', nominationController.getNominationById);
router.get('/api/nominations', nominationController.findAllNominations);
router.post('/api/nominations', nominationController.createNomination);
router.put('/api/nominations/:id', nominationController.updateNomination);
router.get('/api/syncnominations', nominationController.syncNominations);
router.get('/api/confirmation/:token', nominationController.emailVerification);

// user endpoints
router.get('/api/user/:id', userController.getUserById);
router.post('/api/user', userController.create);

// grant cycle endpoints
router.get('/api/grantcycles', grantCycleController.findAll);
router.get('/api/grantcycles/findactive', grantCycleController.findActive);
router.post('/api/grantcycles', grantCycleController.create);
router.get('/api/grantcycles/findbyname/:name', grantCycleController.findByName);
router.put('/api/grantcycles/:id', grantCycleController.update);

module.exports = router;
