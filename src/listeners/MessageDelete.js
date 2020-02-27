const { EventHandler, MayfiEmbed } = require('../');

module.exports = class MessageDelete extends EventHandler {
    constructor(client) {
        super(client, 'messageDelete')
    }

    async run(message) {
    	if(message.author.bot) return

    	const author = message.author

    	const { logsChannel, language } = await this.client.database.guilds.findOne({_id: message.guild.id})

    	if(!logsChannel || !language) return

    	const t = this.client.i18next.getFixedT(language)

    	const embed = new MayfiEmbed(author)
    	.setTitle(t("commands:logs.deletedMessage"))
    	.addField(t("commands:logs.author"), message.author)
    	.addField(t("commands:logs.channel"), message.channel)
    	.addField(t("commands:logs.message"), message.content)
  		.setFooter(message.author.tag)
  		this.client.channels.get(logsChannel).send(embed)
    }
}
