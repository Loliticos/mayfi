const EventHandler = require('../structures/EventHandler')
const fetch = require('node-fetch')

module.exports = class ClientOnReady extends EventHandler {
    constructor(client) {
        super(client, 'ready')
    }

    run() {
      const PRESENCE_INTERVAL = 60 * 1000

      fetch(`https://top.gg/api/bots/${this.client.user.id}/stats`, {
        method: 'POST',
        headers: { Authorization: process.env.DBL_TOKEN },
        body: { server_count: this.client.guilds.size }
      })
      .then(() => client.log('[DBL] Posted statistics successfully'))
      .catch(() => client.log('[DBL] Failed to post statistics'))
      
      const presences = [
        {
          name: `Mayfi Canary | Version ${process.env.MAYFI_VERSION}`,
          type: 'WATCHING'
        },
        {
          name: `Mayfi Canary | ${this.client.guilds.size} Guilds`,
          type: "LISTENING"
        },
        {
          name: `Mayfi Canary | ${this.client.users.size} Users`,
          type: "LISTENING"
        }
      ]

      setInterval(() => {
        const presence = presences[Math.floor(Math.random() * presences.length)]
        this.client.user.setPresence({ game: presence })
        console.log(`🤖 Changed presence to "${presence.name}", type "${presence.type}"`)
      }, PRESENCE_INTERVAL)

    }
};
