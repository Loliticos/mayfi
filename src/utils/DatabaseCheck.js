module.exports = class DatabaseCheck {

  static checkGuild (client, guild, guildID) {
	if(!client.database) return false

    if(!guild) {
        const newGuild = new client.database.guilds({
            _id: guildID
        })

        newGuild.save()
        return false
    } else {
        return true
    }
  }

  static checkUser (client, user, author) {
  	if(!client.database) return false

  	if(!user) {
  		const newUser = new client.database.users({
  			_id: author.id
  		})

  		newUser.save()
  		return false
  	} else {
  		return true
  	}
  }
}