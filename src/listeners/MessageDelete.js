const { EventHandler, MayfiEmbed } = require('../');

module.exports = class MessageDelete extends EventHandler {
    constructor(client) {
        super(client, 'messageDelete')
    }

    async run(message) {
        try {
            if(message.author.bot) return

            const author = message.author

            const dataGuild = await this.client.database.guilds.findOne({_id: message.guild.id})

            if(!dataGuild || dataGuild.logsChannel == "false" || !dataGuild.language) return

            const t = this.client.i18next.getFixedT(dataGuild.language)

            const embed = new MayfiEmbed(author)
            .setTitle(t("commands:logs.deletedMessage"))
            .addField(t("commands:logs.author"), `${author} - ${author.tag}`)
            .addField(t("commands:logs.channel"), message.channel)
            .addField(t("commands:logs.message"), message.content)
            message.guild.channels.get(dataGuild.logsChannel).send({embed: embed})
        } catch(err) {
            console.error(err)
        }
    }
}
