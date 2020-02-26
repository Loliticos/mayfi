const { ShardingManager } = require("discord.js")
const shards = new ShardingManager("./index.js", {
  respawn: true,
  totalShards: 1,
})

shards.on("launch", shard => {
  console.log(`Iníciando Shard: ${shard.id}`)
})
shards.spawn()