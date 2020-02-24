const EventHandler = require('../structures/EventHandler');

module.exports = class ClientOnMessage extends EventHandler {
    constructor(client) {
        super(client, 'message')
    }

    run(message) {

      if(message.author == "bot") return

      console.log(this.username)

    }
};
