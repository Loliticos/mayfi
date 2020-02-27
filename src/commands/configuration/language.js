const { Command, Constants, MayfiEmbed } = require('../../')

module.exports = class LanguageConfig extends Command {
  constructor (client) {
    super({
      name: 'language',
      aliases: ['lang', 'setlang'],
      category: 'config',
      requirements: {
       guildOnly: true, 
       databaseOnly: true,
       permissions: ['MANAGE_GUILD']
      },
      parameters: [{
        type: 'string', 
        full: true, 
        whitelist: (arg) => languageCodes().concat(languageAliases(this.client)).some(l => l.toLowerCase() === arg.toLowerCase()),
        missingError: ({ t, prefix, author }) => {
        let embed = new MayfiEmbed(author)
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commands:language.mustBe"))
        }
      }]
    }, client)
  }

  async run ({ channel, author, guild, t }, lang) {
    lang = lang.toLowerCase()

    let embed = new MayfiEmbed(author)

    try {
      const databaseGuild = await this.client.database.guilds.updateOne({ _id: guild.id }, { language: lang })
      embed.setTitle(t("commands:language.languageChangedTo", { language: lang }))
    } catch (e) {
      embed.setColor(Constants.ERROR_COLOR)
        .setTitle(t('errors:generic'))
    }

    channel.send(embed)


  }
}
