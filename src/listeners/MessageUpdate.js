const { EventHandler, MayfiEmbed } = require('../');

module.exports = class ClientOnReady extends EventHandler {
    constructor(client) {
        super(client, 'messageUpdate')
    }

    async run(oldMessage, newMessage) {
    	if(newMessage.author.bot) return

    	if(oldMessage.content === newMessage.content) return
        this.client.emit("message", newMessage)

    	const author = newMessage.author

    	const { logsChannel, language } = await this.client.database.guilds.findOne({_id: newMessage.guild.id})

    	if(!logsChannel || !language) return

    	const t = this.client.i18next.getFixedT(language)

    	const embed = new MayfiEmbed(author)
    	.setTitle(t("commands:logs.editedMessage"))
    	.setDescription(`**[${t("commands:logs.goToMessage")}](${newMessage.url})**`)
    	.addField(t("commands:logs.author"), newMessage.author)
    	.addField(t("commands:logs.channel"), newMessage.channel)
    	.addField(t("commands:logs.oldMessage"), oldMessage.content)
    	.addField(t("commands:logs.newMessage"), newMessage.content)
  		.setFooter(oldMessage.author.tag)
  		this.client.channels.get(logsChannel).send(embed)
    }
}
