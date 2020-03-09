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

    const package = await npm.text(npmPackage).search()

    console.log(package)

    embed
      .setDescription(`
        [${npmPackage.name}](${npmPackage.links.npm})
        ${npmPackage.description ? npmPackage.description : ""}

        ${npmPackage.keywords && npmPackage.keywords.length > 0 ? npmPackage.keywords.map(p => `\`${p}\``).join(", ") : ""}

        ${t("commands:npm.published", { npmPackage })}

        \`\`\`npm i ${pkg.name}\`\`\`
      `)


  }
}
