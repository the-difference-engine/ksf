const CronJob = require('cron').CronJob
const { checkApplicationStatuses } = require('../controllers/nomination')
//runs every day at 7am
// let job = new CronJob('* * 7 * * 0-7', function() {
//     console.log("please work")
// }, null, true, 'America/Chicago')

// use testing for below, every 10 seconds
let job = new CronJob('*/10 * * * * *', function() {
    console.log("The scheduler has started.")
    checkApplicationStatuses()
}, null, true, 'America/Chicago')

job.start()