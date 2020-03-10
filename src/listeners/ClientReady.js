const EventHandler = require('../structures/EventHandler')
const DBL = require("dblapi.js")
const fetch = require("node-fetch")

module.exports = class ClientOnReady extends EventHandler {
    constructor(client) {
        super(client, 'ready')
    }

    run() {
      const PRESENCE_INTERVAL = 60 * 1000
      
      const presences = [
        {
          name: `Mayfi | Version ${process.env.MAYFI_VERSION}`,
          type: 'WATCHING'
        },
        {
          name: `Mayfi | ${this.client.guilds.size} Guilds`,
          type: "LISTENING"
        },
        {
          name: `Mayfi | ${this.client.users.size} Users`,
          type: "LISTENING"
        }
      ]

      setInterval(() => {
        const presence = presences[Math.floor(Math.random() * presences.length)]
        this.client.user.setPresence({ game: presence })
        console.log(`🤖 Changed presence to "${presence.name}", type "${presence.type}"`)
      }, PRESENCE_INTERVAL)

      const dbl = new DBL(process.env.DBL_TOKEN, this.client)

      dbl.on("posted", () => {
        console.log("[DBL] Posted statistics successfully")
      })

      dbl.on("error", e => {
        console.log("[DBL] Failed to post statistics", e)
      }) 

      function postStats(client) {
        dbl.postStats(client.guilds.size)
      }

      postStats(this.client)
      setInterval(postStats, 1800000, this.client)

      setInterval(() => {
        fetch(`https://botsfordiscord.com/api/bots/${client.user.id}`, {
          method: 'POST',
          headers: { Authorization: process.env.BOTSFORDISCORD_TOKEN },
          body: { server_count: client.guilds.size }
        })
        .then(() => console.log('[BFD] Posted statistics successfully'))
        .catch(() => console.log('[BFD] Failed to post statistics'))
      }, 1800000)
  }
}
