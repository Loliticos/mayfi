const { EventHandler, CommandContext }  = require('../')
const DatabaseCheck = require("../utils/DatabaseCheck.js")

module.exports = class ClientOnMessage extends EventHandler {
    constructor(client) {
        super(client, 'message')
    }

    async run(message) {
        if (message.author.bot) return

        const user = await this.client.database.users.findOne({ _id: message.author.id })
        const guild = await this.client.database.guilds.findOne({ _id: message.guild.id })

        let prefix = guild ? guild.prefix : "m!" 
        
        const botMention = this.client.user.toString()

        const mc = (...m) => m.some(st => message.content.toLowerCase().startsWith(st))
        const usedPrefix = mc(botMention, `<@!${this.client.user.id}>`) ? `${botMention} ` : mc(prefix) ? prefix : null
       
        if(!usedPrefix) return

        const fullCmd = message.content.substring(usedPrefix.length).split(/[ \t]+/).filter(a => a)
        const args = fullCmd.slice(1)
        
        if (!fullCmd.length) return

        DatabaseCheck.checkGuild(this.client, guild, message.guild.id)
        DatabaseCheck.checkUser(this.client, user, message.author)

        if(user && user.blacklisted) return   
        const language = guild ? guild.language : "en-US"

        if (!message.channel.permissionsFor(member).has("SEND_MESSAGES")) {
            if (!message.guild.owner || guild.noPermissions === true) return

            message.guild.owner.send(`:flag_en: I don't have the permission **"SEND_MESSAGES"** on the guild **${message.guild.id}**, please give me this permission so i'm able to send messages.`)

            await this.client.database.guilds.updateOne({_id: message.guild.id}, { noPermissions: true })
        }

        const cmd = fullCmd[0].toLowerCase().trim()
        const command = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd))
        
        if(!command) return

        const context = new CommandContext({ 
            client: this.client,
            message,
            language,
            command,
            prefix
        })

        console.log(`[Commands] "${message.content}" (${command.constructor.name}) ran by "${message.author.tag}" (${message.author.id}) on guild "${message.guild.name}" (${message.guild.id}) channel "#${message.channel.name}" (${message.channel.id})`)
        this.client.runCommand(command, context, args, language)
    }
}

