const { Command, MayfiEmbed, CommandError } = require('../../')
const xkcd = require("xkcd-node")

module.exports = class Xkcd extends Command {
  constructor (client) {
    super({
      name: 'xkcd',
      aliases: ['tirinha'],
      category: 'miscelaneous',
      parameters: [{
        type: 'string', full: true, required: false
      }]
    }, client)
  }

  async run ({ t, author, channel }, text) {
    const embed = new MayfiEmbed()

    let responseData

    try {
      if (text && text.toLowerCase() === "latest") {
          xkcd.latest((error, response) => {
            if (error) console.error(error)

            generateEmbed(response)
          })
      } else {
         xkcd.random((error, response) => {
           if (error) console.error(error)
            
           generateEmbed(response)
        })
      }
    } catch (e) {
      if (e.statusCode === 404) {
        throw new CommandError(t("commands:xkcd.notFound"))
      }
    }

    function generateEmbed(response) {
      embed
        .setTitle(`${response.num} - ${response.title}`)
        .setURL(`http://xkcd.com/${response.num}`)
        .setDescription(response.alt)
        .setImage(response.img)
      return channel.send({embed})
    }
  }
}
