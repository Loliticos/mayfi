const dotenv = require('dotenv')
dotenv.config();

const CLIENT_OPTIONS = {
	fetchAllMembers: true,
	disableEveryone: true
}

const Mayfi = require('./src/MayfiClient.js')
const client = new Mayfi(CLIENT_OPTIONS)

console.log(process.env.DISCORD_TOKEN)

client.login().then(() => {
	console.log("[DISCORD] Logged succesfuly")
	.catch((err) => console.error(err))
})