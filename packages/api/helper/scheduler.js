const CronJob = require('cron').CronJob
const { checkApplicationStatuses } = require('../controllers/nomination')
const env = process.env.NODE_ENV || 'development';
const production = '00 00 11 * * 0-6' // run at 9am PST / 11am Central
const development = '*/45 * * * * *'  // every 45th second on the minute


let schedule = env === 'development' ? development : production


let reminders = new CronJob(schedule, function() {
    console.log("The scheduler has started.")
    checkApplicationStatuses()
}, null, true)

module.exports ={reminders}