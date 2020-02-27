const { EventHandler } = require('../');

module.exports = class ClientOnReady extends EventHandler {
    constructor(client) {
        super(client, 'messageUpdate')
    }

    run(oldMessage, newMessage) {
      if(oldMessage.content === newMessage.content) return

      client.emit("message", newMessage)
    }
};
