const EventHandler = require('../structures/EventHandler')

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

    }
};
