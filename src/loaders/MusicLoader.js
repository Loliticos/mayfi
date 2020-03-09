const { PlayerManager } = require("discord.js-lavalink")

const nodes = [
    { host: "localhost", port: 2333, password: "youshallnotpass" }
]

module.exports = class CommandLoader  {
    constructor(client) {
        this.client = client

        this.player = null

    }

    async load () {
        try {
            await this.initializeMusic(this.client)
            this.client.player = this.player
            return true
        } catch (err) {
            console.error(err)
        }
    }

    async initializeMusic (client) {
        this.player = new PlayerManager(client, nodes, {
            user: client.user.id,
            shards: 1
        })

        this.player.on("error", (node, error) => {
            console.error(error, node)
        })
    }
}