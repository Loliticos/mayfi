const { Command, MayfiEmbed, Constants } = require('../../')

module.exports = class Blackjack extends Command {
  constructor (client) {
    super({
      name: 'blackjack',
      aliases: ["vinteum", "vinte-um"],
      category: 'games',
      cooldown: 5,
      parameters: [{
        type: 'number',
        min: 50,
        max: 2500,
        required: false
      }]
    }, client)
  }

  async run ({ channel, author, t, client, prefix }, amount) {
    let embed = new MayfiEmbed(author)

    if(!amount) {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t("commands:blackjack.howToPlay"))
        .setDescription(`${t("commands:blackjack.explaining")}\n\n**${t('commons:usage')}:** \`${prefix}blackjack ${t("commands:blackjack.commandUsage")}\``)
      return channel.send(embed)
    }

    const userData = await client.database.users.findOne({_id: author.id})

    if (userData < amount) {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t("errors:notEnoughMoney"))
      return channel.send(embed)
    }

    let playerValueCards = Math.floor(4 + Math.random() * (18 - 4))
    let botValueCards = Math.floor(4 + Math.random() * (18 - 4))

    channel.send(
     embed
      .setTitle(t("commands:blackjack.gameName"))
      .setDescription(getMessage(author, client))
    )

    play()

    function play () {
      const values = ["stand", "hit", "double"]

      const filter = c => c.author.id == author.id && values.includes(c.content)

      const collector = channel.createMessageCollector(filter, { time: 30000, max: 1 })

      collector.on("collect", async (m) => {
        console.log(m.content)
        collector.stop()
        switch (m.content) {
          case "hit":
            hit()
            playAsBot(botValueCards)
            break
          case "double":
            double()
            playAsBot(botValueCards)
            break
          case "stand":
            playAsBot(botValueCards)
            break
        }
      })    
    }

  function playAsBot(botCards) {
    const botValues = ["stand", "hit", "stand", "hit"]
    const botValue = botValues[Math.floor(1 + Math.random() * (3 - 1))]

    switch (botValue) {
      case "hit":
          hit(true)
          break
      case "stand": 
          break
    }

    const botResult = checkBot(botValueCards, playerValueCards)
    const playerResult = checkPlayer(playerValueCards, botValueCards)

    checkWinner(botResult, playerResult)

  }

  async function checkWinner(botResult, playerResult) {
    embed = new MayfiEmbed()

    if (botResult == false || playerResult == true) {
      await client.database.users.updateOne({_id: author.id}, { $inc: { money: amount } })
      channel.send(
        embed
          .setTitle(t("commands:blackjack.winner"))
          .setDescription(`${t("commands:blackjack.youWon", { amount })}\n ${finalMessage(author, client)}`)
      )
    }

    if (botResult == true || playerResult == false) {
      await client.database.users.updateOne({_id: author.id}, { $inc: { money: -amount } })
      channel.send(
        embed
          .setTitle(t("commands:blackjack.winner"))
          .setDescription(`${t("commands:blackjack.botWinner", { amount })}\n ${finalMessage(author, client)}`)
      )
    }

    if (botResult == "tie" || playerResult == "tie") {
      channel.send(
        embed
          .setTitle(t("commands:blackjack.tieTitle"))
          .setDescription(`${t("commands:blackjack.tie")}\n ${finalMessage(author, client)}`)
      )
    }

  }

  function finalMessage(user, client) {
     return `
     **${user.username}**: ${playerValueCards}\n **${client.user.username}**: ${botValueCards}
     `
  }

  function hit(bot = false) {
    if (bot) {

       botValueCards = botValueCards += Math.floor(4 + Math.random() * (7 - 4))
    } else {
        playerValueCards = playerValueCards += Math.floor(4 + Math.random() * (7 - 4))
      }
    }

    function double(user) {
      amount = amount * 2

      hit()
    }

    function getMessage(user, client) {
      return `**${user.username}**: ${playerValueCards}\n\n **${client.user.username}**: ${botValueCards}\n\n${t("commands:blackjack.types")}`
    }

    function checkBot(botCards, playerCards) {
      if (botCards > 21 && playerCards > botCards) return true

      if (playerCards > 21 && botCards < playerCards) return true

      if (playerCards > 21 && botCards > playerCards) return false

      if (botCards > 21) return false

      if (botCards < 21 && playerCards > botCards) return false

      if (botCards == 21) return true

      if (botCards == playerCards) return "tie"

    }

    function checkPlayer(playerCards, botCards) {
      if (botCards > 21 && playerCards > botCards) return true

      if (playerCards > 21 && botCards > playerCards) return false

      if (playerCards > 21) return false

      if (playerCards < 21 && botCards > playerCards) return false
        
      if (playerCards == 21) return true

      if (playerCards == botCards) return "tie"

    } 
  }
}
