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

  async run ({ channel, author, t, language }, package) {
            
    const embed = new MayfiEmbed(author)

    const package = await searchNpmRegistry().text(package).search()

    console.log(package)


  }
}
