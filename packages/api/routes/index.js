const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('This is root!'));

router.get('/greeting', (req, res) => res.send({message: `Hello, ${req.query.name || 'World'}!`,}));
router.get('/nominations/${nomination.id}', controllers.getNomiationById);

module.exports = router
