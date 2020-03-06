const { EventHandler, MayfiEmbed } = require('../');

module.exports = class MessageUpdate extends EventHandler {
    constructor(client) {
        super(client, 'messageUpdate')
    }

    async run(oldMessage, newMessage) {
        try {
            if(newMessage.author.bot) return
            if(!newMessage || !oldMessage) return

            if(oldMessage.content === newMessage.content) return
            this.client.emit("message", newMessage)

            const author = newMessage.author

            const dataGuild = await this.client.database.guilds.findOne({_id: newMessage.guild.id})

            if(!dataGuild || dataGuild.logsChannel == "false" || !dataGuild.language) return

            const t = this.client.i18next.getFixedT(dataGuild.language)

            const embed = new MayfiEmbed(author)
            .setTitle(t("commands:logs.messages.editedMessage"))
            .setDescription(`**[${t("commands:logs.messages.goToMessage")}](${newMessage.url})**`)
            .addField(t("commands:logs.messages.author"), `${author} - ${author.tag}`)
            .addField(t("commands:logs.messages.channel"), newMessage.channel)
            .addField(t("commands:logs.messages.oldMessage"), oldMessage.content)
            .addField(t("commands:logs.messages.newMessage"), newMessage.content)
            newMessage.guild.channels.get(dataGuild.logsChannel).send(embed)
        } catch (e) {
            console.error(e)
        }
    }
}
