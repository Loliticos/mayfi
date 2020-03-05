const { Command, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

module.exports = class Translate extends Command {
  constructor (client) {
    super({
      name: 'translate',
      aliases: ['gtranslate', 'traduzir'],
      category: 'utility',
      parameters: [{
       type: 'string', 
       required: true, 
       full: false
      }, {
        type: 'string',
        required: true,
        full: false
      }, {
        type: 'string',
        required: true,
        full: true
      }]
    }, client)
  }

  async run ({ channel, author, t}, from, to, text) {

    const params = {
      sl: from,
      tl: to,
      q: text
    }

    const URLqueryParams = new URLSearchParams(params)

    const res = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&dt=t' + `&${URLqueryParams.toString()}`).then(res => res.json())

    console.log(res)
    
    let embed = new MayfiEmbed(author)
    .setDescription(res[0][0][0])

    channel.send({embed})
        
  }
}
