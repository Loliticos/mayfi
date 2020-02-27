const { Command, MayfiEmbed, Constants } = require('../../')
const fetch = require('node-fetch')
let moment = require("moment")

module.exports = class Github extends Command {
  constructor (client) {
    super({
      name: 'github',
      category: 'utility',
      parameters: [{
        type: 'string', full: true, required: true, missingError: "commands:github.missingParameters"
      }]
    }, client)
  }

  async run ({ channel, author, t, language }, github) {
        
    let baseURL = await fetch(`https://api.github.com/users/${github}`).then(res => res.json())
    
    const embed = new MayfiEmbed(author)
    
    if(baseURL.message == "Not Found") {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t('commands:github.userNotFound', { user: github }))
      return channel.send(embed)
    }
    
    channel.send(
      new MayfiEmbed(author)
        .setAuthor(`${baseURL.login} - ${baseURL.location ? baseURL.location : t("commands:github.unknownLocation")}`, baseURL.avatar_url)
        .setDescription(baseURL.bio ? baseURL.bio : t("commands:github.noBio"))
        .addField(t("commands:github.publicRepos"), baseURL.public_repos)
        .addField(t("commands:github.createdAt"), moment(baseURL.created_at).format('LLL'))
        .addField(t("commands:github.followers"), baseURL.followers)
        .addField(t("commands:github.following"), baseURL.following + " " + t("commands:github.users"))
    )
  }
}
