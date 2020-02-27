const dotenv = require('dotenv')
const { readFileSync } = require('fs')
dotenv.config();

require('moment')
require('moment-duration-format')

const CLIENT_OPTIONS = {
	fetchAllMembers: true,
	disableEveryone: true
}

const Mayfi = require('./src/MayfiClient.js')
const client = new Mayfi(CLIENT_OPTIONS)

console.log(readFileSync('Mayfi.txt', 'utf8').toString())

client.login().then(() => {
	console.log("[DISCORD] Logged succesfuly")
})