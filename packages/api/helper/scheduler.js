const CronJob = require('cron').CronJob
const { checkApplicationStatuses } = require('../controllers/nomination')
//runs every day at 7am
// let job = new CronJob('* * 7 * * 0-7', function() {
//     console.log("please work")
// }, null, true, 'America/Chicago')

let job = new CronJob('*/10 * * * * *', function() {
    console.log("You are running the thing!")
    checkApplicationStatuses()
}, null, true, 'America/Chicago')

job.start()