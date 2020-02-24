const EventHandler = require('../structures/EventHandler');

module.exports = class ClientOnReady extends EventHandler {
    constructor(client) {
        super(client, 'ready')
    }

    run(client) {
      const PRESENCE_INTERVAL = 60 * 1000
      
        const presences = [
          {
            name: `${client.users.size} Users | @Mayfi Help`,
            type: 'WATCHING'
          }, {
            name: `${client.guilds.size} Guilds | @Mayfi Help`,
            type: 'WATCHING'
          }
        ]

        setInterval(() => {
          const presence = presences[Math.floor(Math.random() * presences.length)]
          client.user.setPresence({ game: presence })
          console.log(` Changed presence to "${presence.name}", type "${presence.type}"`)
        }, PRESENCE_INTERVAL)
    }
};
