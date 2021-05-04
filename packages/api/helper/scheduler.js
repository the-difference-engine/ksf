const CronJob = require('cron').CronJob
const { checkApplicationStatuses } = require('../controllers/nomination')
process.env.TZ = 'America/Chicago'
const production = '00 00 11 * * 0-6' // run at 9am PST / 11am Central
const development = '*/45 * * * * *'  // every 45th second on the minute


let schedule = process.env.APP_URL === 'http://localhost:3000' ? development : production


let reminders = new CronJob(schedule, function() {
    console.log("The scheduler has started.")
    checkApplicationStatuses()
}, null, true, process.env.TZ)

module.exports ={reminders}