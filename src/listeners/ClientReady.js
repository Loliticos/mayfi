const EventHandler = require('../structures/EventHandler')
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

      function postStats (client) {
        if (process.env.DBL_TOKEN) {
          fetch(`https://discordbots.org/api/bots/${client.user.id}/stats`, {
            method: "POST",
            headers: { Authorization: process.env.DBL_TOKEN },
            body: { server_count: client.guilds.size }
          })
            .then(() => console.log("[DBL] Posted statistics successfully"))
            .catch(() => console.log("[DBL] Failed to post statistics"))
        }

        if (process.env.BOTSFORDISCORD_TOKEN) {
          fetch(`https://botsfordiscord.com/api/bots/${client.user.id}`, {
            method: 'POST',
            headers: { Authorization: process.env.BOTSFORDISCORD_TOKEN },
            body: { server_count: this.client.guilds.size }
          })
          .then(() => console.log('[BFD] Posted statistics successfully'))
          .catch(() => console.log('[BFD] Failed to post statistics'))
        }
      }

      postStats(this.client)
      setInterval(postStats, 1800000, this.client)
    }
}
