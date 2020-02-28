const { EventHandler, CommandContext }  = require('../')

module.exports = class ClientOnMessage extends EventHandler {
    constructor(client) {
        super(client, 'message')
    }

    async run(message) {
        const user = await this.client.database.users.findOne({ _id: message.author.id })
        const guild = await this.client.database.guilds.findOne({ _id: message.guild.id })

        let prefix = message.channel.type === "dm" ? '' : guild ? guild.prefix : "m!"

        if (message.author.bot) return
        
        const botMention = this.client.user.toString()

        const mc = (...m) => m.some(st => message.content.startsWith(st))
        const usedPrefix = mc(botMention, `<@!${this.client.user.id}>`) ? `${botMention} ` : mc(prefix) ? prefix : null
        
        if(!usedPrefix) return

        const fullCmd = message.content.substring(usedPrefix.length).split(/[ \t]+/).filter(a => a)
        const args = fullCmd.slice(1)
        if (!fullCmd.length) return

        if(!user) {
            const newUser = new this.client.database.users({
                _id: message.author.id
            })

            newUser.save()
        }

        if(!guild) {
            const newGuild = new this.client.database.guilds({
                _id: message.guild.id
            })

            newGuild.save()
        }

        if(user && user.blacklisted) return   
        const language = guild ? guild.language : "en-US"

        const cmd = fullCmd[0].toLowerCase().trim()
        const command = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd))
        
        if(!command) return

        const context = new CommandContext({ 
            client: this.client,
            message,
            language: language,
            command,
            prefix: guild.prefix
        })

        console.log(`[Commands] "${message.content}" (${command.constructor.name}) ran by "${message.author.tag}" (${message.author.id}) on guild "${message.guild.name}" (${message.guild.id}) channel "#${message.channel.name}" (${message.channel.id})`)
        this.client.runCommand(command, context, args, language)
    }
}

