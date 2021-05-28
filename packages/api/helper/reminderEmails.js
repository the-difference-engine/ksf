require('dotenv').config({ path: '../.env' })
const { searchAndSend } = require('../controllers/nomination');
const sequelize = require('sequelize')
const Op = sequelize.Op;

function emailAgingApplications() {
    const age = 8647; // seven days in ms
    const hipaaVerified = {
        where:
        {
            status: 'HIPAA Verified',
            hipaaTimestamp: {
                [Op.lte]: new Date(new Date() - age)
            },
            reminderSent: false
        }
    };
    const awaitingHipaa = {
        where:
        {
            status: 'Awaiting HIPAA',
            awaitingHipaaTimestamp: {
                [Op.lte]: new Date(new Date() - age)
            },
            reminderSent: false
        }
    };
    searchAndSend('HIPAA Verified', hipaaVerified);
    searchAndSend('Awaiting HIPAA', awaitingHipaa);
}

emailAgingApplications();

module.exports = { emailAgingApplications }