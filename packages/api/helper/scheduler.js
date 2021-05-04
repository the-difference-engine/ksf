const CronJob = require('cron').CronJob
const { checkApplicationStatuses } = require('../controllers/nomination')
// To override in testing set: EMAIL_CRON='*/45 * * * * *' runs every minute on the 45th second
const defaultCron = process.env.EMAIL_CRON ?? '00 00 11 * * 0-6'

let reminders = new CronJob(defaultCron, function() {
    console.log("The scheduler has started.")
    checkApplicationStatuses()
}, null, true)

module.exports ={reminders}