const { EventHandler, CommandContext }  = require('../')
const mongoose = require("mongoose")

module.exports = class ClientOnMessage extends EventHandler {
    constructor(client) {
        super(client, 'message')
    }

    async run(message) {
        let prefix = message.channel.type === "dm" ? '' : 'mc!'

        if (message.author.bot) return
        
        const language = "pt-BR"
        const botMention = this.client.user.toString()

        const mc = (...m) => m.some(st => message.content.startsWith(st))
        const usedPrefix = mc(botMention, `<@!${this.client.user.id}>`) ? `${botMention} ` : mc(prefix) ? prefix : null
        
        if(!usedPrefix) return

        const fullCmd = message.content.substring(usedPrefix.length).split(/[ \t]+/).filter(a => a)
        const args = fullCmd.slice(1)
        if (!fullCmd.length) return

        verifyUser(message.author.id)

        function verifyUser (id) {
            this.database.users.findOne({"_id": id}, (err, user) => {
                if(!user) {
                    const newUser = new this.database.users({
                    _id: id
                    })

                    newUser.save()
                }   
            })
        }

        const cmd = fullCmd[0].toLowerCase().trim()
        const command = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd))

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

