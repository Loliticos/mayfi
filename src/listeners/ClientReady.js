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

      fetch(`https://botsfordiscord.com/api/bots/673960641261994014`, {
        method: 'POST',
        headers: { Authorization: process.env.BOTSFORDISCORD_TOKEN },
        body: { server_count: this.client.guilds.size }
      })
      .then(() => console.log('[BFD] Posted statistics successfully'))
      .catch(() => console.log('[BFD] Failed to post statistics'))

    }
};
