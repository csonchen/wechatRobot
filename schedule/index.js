const schedule = require('node-schedule')

function setSchedule(date, callback) {
  schedule.scheduleJob(date, callback)
}

module.exports = {
  setSchedule
}