require('dotenv').config()
const { searchAndSend } = require('../controllers/nomination');
const { Op } = require('sequelize')

const emailAgingApplications = async(res, req) =>{
    const age = 86400000 * 7; // seven days in ms
    const hipaaVerified = {
        where:
        {
            status: 'HIPAA Verified',
            hipaaTimestamp: {
                [Op.lte]: new Date(new Date() - age)
            },
            //if this property is null, it should mean a reminder email hasn't been sent and that its ok to send one
            hipaaReminderEmailTimestamp: {
               [Op.is]: null 
            },
        }
    };
    const awaitingHipaa = {
        where:
        {
            status: 'Awaiting HIPAA',
            awaitingHipaaTimestamp: {
                [Op.lte]: new Date(new Date() - age)
            },
            //if this property is null, it should mean a reminder email hasn't been sent and that its ok to send one
            awaitingHipaaReminderEmailTimestamp: {
                [Op.is]: null
            },
        }
    };
    await searchAndSend('HIPAA Verified', hipaaVerified);
    await searchAndSend('Awaiting HIPAA', awaitingHipaa);
}

emailAgingApplications();

module.exports = { emailAgingApplications }
