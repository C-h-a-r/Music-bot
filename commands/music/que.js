const Discord = require("discord.js")
module.exports = {
  name: "queue",
  aliases: ["q"],
  usage: "q <song>",
  description: "q a song",
  run: async (client, message, args) => {




const embed1 = new Discord.MessageEmbed()
.setColor("RED")
.setDescription("There is nothing playing.")
const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(embed1);
		
    const embed = new Discord.MessageEmbed()
    .setTitle("__**Song queue:**__")
    .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
    .addFields({
      name: "**Now playing:**",
      value: `${serverQueue.songs[0].title}`,
    })
    .setColor("GREEN")

    return message.channel.send(embed)



  }
}