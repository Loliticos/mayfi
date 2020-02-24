module.exports = class Command {
    constructor(options = {}) {
        this.name = options.name;
        this.aliases = options.aliases  || [];
    }

}
