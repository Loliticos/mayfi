const { Command, MayfiEmbed, Constants } = require('../../')
const fetch = require("node-fetch")

module.exports = class Instagram extends Command {
  constructor (client) {
    super({
      name: 'instagram',
      category: 'utility',
      parameters: [{
        type: 'string',
        full: false,
        missingError: 'commands:instagram.invalidUser'
      }]
    }, client)
  }

  async run ({ t, channel, author, guild }, user) {
    const embed = new MayfiEmbed(author)

    try {
      const body = await fetch(`https://instagram.com/${user}/?__a=1`).then(res => res.json())

      const res = body.graphql.user

      embed
        .setTitle(res.full_name)
        .setURL(res.external_url_linkshimmed)
        .setThumbnail(res.profile_pic_url)
        .setDescription(res.biography.length == 0 ? t("commands:instagram.noBiography") : res.biography)
        .addField(t("commands:instagram.followers"), res.edge_followed_by.count.toLocaleString())
        .addField(t("commands:instagram.following"), res.edge_follow.count.toLocaleString() + " " + t("commands:instagram.users"))
        .addField(t("commands:instagram.media"), res.edge_owner_to_timeline_media.count + " " + t("commands:instagram.photos"))
        .addField(t("commands:instagram.privatedAcoount"), res.is_private ? t("commons:yes") : t("commons:no"))
      channel.send(embed)
    } catch(e) {
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commons:instagram.invalidUser"))
        return channel.send(embed)
    }

  }
}