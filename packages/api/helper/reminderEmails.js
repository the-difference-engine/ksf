const { searchAndSend } = require('../controllers/nomination');

function emailAgingApplications() {
    const age = 86400000 * 7; // seven days in ms
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
    await searchAndSend('HIPAA Verified', hipaaVerified);
    await searchAndSend('Awaiting HIPAA', awaitingHipaa);
}

emailAgingApplications();

module.exports = { emailAgingApplications }