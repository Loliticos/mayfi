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

    const pkg = await npm.text(npmPackage).search()

    console.log(pkg)

    embed
      .setAuthor("npm", "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/042013/npm_0.png?itok=0Jst3N3-")
      .setTitle(pkg.name)
      .setURL(pkg.links.npm)
      .setDescription(`${pkg.description ? pkg.description : ""}\n${pkg.keywords && pkg.keywords.length > 0 ? pkg.keywords.map(p => `\`${p}\``).join(", ") : ""}`)

    channel.send(embed)


  }
}
