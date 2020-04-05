process.env['NTBA_FIX_319'] = 1;
require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, {polling: true})
const schedule = require('node-schedule')

let chatID
let job1
let job2

function ask() {
    if (chatID) {
        bot.sendMessage(chatID, 'Wer kocht heute?')
    } else {
        console.error('chatID not set')
    }
}

function reminder() {
    if (chatID) {
        bot.sendMessage(chatID, 'Zeit zu kochen')
    } else {
        console.error('chatID not set')
    }
}

function start() {
    if (!job1 && chatID) {
		job1 = schedule.scheduleJob('rubbishjob', '0 15 * * *', ask)	
    } 
    if (!job2 && chatID) {
        job2 = schedule.scheduleJob('rubbishjob', '0 18 * * *', reminder)	
    }
}

bot.onText(/\/start/, msg => {
    chatID = msg.chat.id;
	bot.sendMessage(chatID, `Bot wird gestartet.`)	
	start()
})

bot.onText(/\/active/, msg => {
	msg.chat.id === chatID ? bot.sendMessage(chatID, 'Bot läuft in diesem Channel') : bot.sendMessage(msg.chat.id, 'Bot läuft in einem anderen Channel. Um hier zu verwenden /start tippen.') 
})

bot.onText(/\/debug/, msg => {
	msg.chat.id === chatID ? bot.sendMessage(chatID, 'Bot läuft in diesem Channel') : bot.sendMessage(msg.chat.id, 'Bot läuft in einem anderen Channel. Um hier zu verwenden /start tippen.') 
})