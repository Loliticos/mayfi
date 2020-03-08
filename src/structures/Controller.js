module.exports = class EventHandler {
    constructor(opts, client) {
    	
        this.client = client

        this.name = opts.name

        this.subcontrollers = []
    }

    load () {
	    this.subcontrollers.forEach(subcontroller => {
	      Object.defineProperty(this, subcontroller.name, { get: () => subcontroller })
	    })

	    return this
  }
}