const { Command, MayfiEmbed, Constants } = require('../../')
const npm = require('search-npm-registry')
let moment = require("moment")

module.exports = class Npm extends Command {
  constructor (client) {
    super({
      name: 'npm',
      category: 'utility',
      parameters: [{
        type: 'string', full: true, required: true, missingError: "commands:npm.invalidPackage"
      }]
    }, client)
  }

  async run ({ channel, author, t, language }, npmPackage) {
            
    const embed = new MayfiEmbed(author)

    moment.locale(language)

    const pkg = await npm()
    .text(npmPackage)
    .search()

    console.log(pkg)

    embed
      .setAuthor("npm", "https://cdn.freebiesupply.com/logos/large/2x/npm-2-logo-png-transparent.png")
      .setTitle(pkg[0].name)
      .setURL(pkg[0].links.npm)
      .setDescription(`${pkg[0].description ? pkg[0].description : ""}\n\n${pkg[0].keywords && pkg[0].keywords.length > 0 ? pkg[0].keywords.map(p => `\`${p}\``).join(", ") : ""}`)
      .addField(t("commands:npm.lastPublish"), `${t("commands:npm.version")} ${pkg[0].version} ${t("commands:npm.publisher")} ${pkg[0].publisher.username} ${t("commands:npm.date")} ${moment(pkg[0].date).format('LLL')}\n(${moment(pkg[0].date).fromNow()})`)
    channel.send(embed)


  }
}
