const { EventHandler, MayfiEmbed } = require('../');

module.exports = class MessageUpdate extends EventHandler {
    constructor(client) {
        super(client, 'messageUpdate')
    }

    async run(oldMessage, newMessage) {
    	if(newMessage.author.bot) return
        if(!newMessage || !oldMessage) return

    	if(oldMessage.content === newMessage.content) return
        this.client.emit("message", newMessage)

    	const author = newMessage.author

    	const dataGuild = await this.client.database.guilds.findOne({_id: newMessage.guild.id})

    	if(!dataGuild || !dataGuild.logsChannel || !dataGuild.language) return

    	const t = this.client.i18next.getFixedT(dataGuild.language)

    	const embed = new MayfiEmbed(author)
    	.setTitle(t("commands:logs.editedMessage"))
    	.setDescription(`**[${t("commands:logs.goToMessage")}](${newMessage.url})**`)
    	.addField(t("commands:logs.author"), newMessage.author)
    	.addField(t("commands:logs.channel"), newMessage.channel)
    	.addField(t("commands:logs.oldMessage"), oldMessage.content)
    	.addField(t("commands:logs.newMessage"), newMessage.content)
  		.setFooter(oldMessage.author.tag)
  		newMessage.guild.channels.get(dataGuild.logsChannel).send(embed)
    }
}
