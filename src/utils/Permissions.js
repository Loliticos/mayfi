module.exports = class Permissions {
	static isDev(client, user) {
		const botGuild = client.guilds.get(process.env.BOT_GUILD)
	    const developerRole = botGuild && botGuild.roles.get(process.env.DEVELOPER_ROLE)
	    const isDeveloper = (developerRole && developerRole.members.has(user.id)) || (process.env.DEVELOPER_USERS && process.env.DEVELOPER_USERS.split(',').includes(user.id))
	    return isDeveloper
	}

	static getManagers(client) {
		const botGuild = client.guilds.get(process.env.BOT_GUILD)
		const managerRole = botGuild.roles.get(process.env.DEVELOPER_ROLE)
		return role.members.map(m => m.tag)
}