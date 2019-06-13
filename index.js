const {Wechaty, Friendship} = require('wechaty');
const schedule = require('./schedule/index')
const config = require('./config/index')
const untils = require('./untils/index')
const superagent = require('./superagent/index')
const {FileBox} = require('file-box')

function onScan(qrcode, status) {
  require('qrcode-terminal').generate(qrcode)
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')
  console.log(qrcodeImageUrl)
}

async function onLogin(user) {
  console.log(`贴心小助理${user}登录了`)
  schedule.setSchedule(config.SENDDATE, () => {
    console.log('你的小助理工作了！')
    main()
  })
}

function onLogout(user) {
  console.log(`${user}登出`)
}

// TODO
async function onMessage(msg) {
  console.log('message...')
}

// TODO
async function onFriendShip(friendship) {
  console.log('friendShip..')
}


// 自动发消息功能
async function main() {
  let logMsg
  let  contact = await bot.Contact.find({name:config.NICKNAME}) || await bot.Contact.find({alias:config.NAME}) // 获取你要发送的联系人
  let one = await superagent.getOne() //获取每日一句
  let weather = await superagent.getWeather() //获取天气信息
  let today = await untils.formatDate(new Date())//获取今天的日期
  let memorialDay = untils.getDay(config.MEMORIAL_DAY)//获取纪念日天数
  let str = today +  '<br>我们在一起的第' + memorialDay + '天<br>'+ '<br>元气满满的一天开始啦,要开心噢^_^<br>'
    + '<br>今日天气<br>' + weather.weatherTips +'<br>' +weather.todayWeather+ '<br>每日一句:<br>'+one+'<br><br>'+'————————最爱你的我'
  try {
    logMsg = str
	  await contact.say(str) // 发送消息
  } catch (e) {
	  logMsg = e.message
  }
  console.log(logMsg)
}

// TODO
function roomJoin(room, inviteeList, inviter) {
  console.log('roomJoin...')
}

const bot = new Wechaty({name: 'wechatEveryDay'})

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)
bot.on('friendship', onFriendShip)
bot.on('room-join', roomJoin)

bot.start().then(() => console.log('开始登录微信')).catch(e => console.log(e))