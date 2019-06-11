function getDay(date) {
  var date2 = new Date()
  var date1 = new Date(date)
  var iDays = parseInt(Math.abs(date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24)
  return iDays
}

function formatDate(date) {
  var tempDate = new Date(date)
  var year = tempDate.getFullYear()
  var month = tempDate.getMonth() + 1
  var day = tempDate.getDate()
  var hour = tempDate.getHours()
  var min = tempDate.getMinutes()
  var second = tempDate.getSeconds()
  var week = tempDate.getDay()
  var str = ''

  switch(week) {
    case 0:
      str = '星期日'
      break
    case 1:
      str = '星期一'
      break
    case 2:
      str = '星期二'
      break
    case 3:
      str = '星期三'
      break      
    case 4:
      str = '星期四'
      break
    case 5:
      str = '星期五'
      break
    case 6:
      str = '星期六'
      break
    default:
      break 
  }

  if (hour < 10) {
    hour = '0' + hour
  }
  if (min < 10) {
    min = '0' + min
  }
  if (second < 10) {
    second = '0' + second
  }
  return year + '-' + month + '-' + day + '日 ' + hour + ':' + min + ' ' + str
}

module.exports = {
  getDay, formatDate
}