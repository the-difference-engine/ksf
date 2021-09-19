require('dotenv').config()
const { syncNominations } = require('../controllers/nomination.js')

syncNominations()
