const { Command, Constants, MayfiEmbed } = require('../../')
const i18next = require('i18next')

const languageCodes = () => Object.keys(i18next.store.data)

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
        whitelist: (arg) => languageCodes().some(l => l.toLowerCase() === arg.toLowerCase()),
        missingError: "commands:language.mustbe"
      }]
    }, client)
  }

  async run ({ channel, author, guild, t }, lang) {
    lang = lang.toLowerCase()

    let embed = new MayfiEmbed(author)

    try {
      await this.client.database.guilds.updateOne({ _id: guild.id }, { language: lang })
      embed.setTitle(t("commands:language.languageChangedTo", { language: lang }))
    } catch (e) {
      embed.setColor(Constants.ERROR_COLOR)
        .setTitle(t('errors:generic'))
    }

    channel.send(embed)


  }
}
