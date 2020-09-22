const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/nomination/:id', controllers.getNomiationById);

module.exports = router
