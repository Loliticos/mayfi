const EventHandler = require('../structures/EventHandler')
const DBL = require("dblapi.js")

module.exports = class ClientOnReady extends EventHandler {
    constructor(client) {
        super(client, 'ready')
    }

    run() {
      const PRESENCE_INTERVAL = 60 * 1000
      const dbl = new DBL(process.env.DBL_TOKEN, this.client)

      dbl.on('posted', () => {
        console.log('Server count posted!');
      })

      dbl.on('error', e => {
        console.log(`Oops! ${e}`);
      })
      
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
