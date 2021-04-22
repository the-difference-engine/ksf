const CronJob = require('cron').CronJob
const { checkApplicationStatuses } = require('../controllers/nomination')
//runs every day at 7am
let reminders = new CronJob('00 00 7 * * 0-6', function() {
    console.log("please work")
}, null, true, 'America/Chicago')

// use testing for below, every 10 seconds
// let reminders = new CronJob('*/10 * * * * *', function() {
//     console.log("The scheduler has started.")
//     checkApplicationStatuses()
// }, null, true, 'America/Chicago')

module.exports ={reminders}