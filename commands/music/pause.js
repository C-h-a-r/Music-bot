const Discord = require('discord.js')
module.exports = {
  name: "pause",
  aliases: ["pa"],
  usage: "pause",
  description: "pause the song!",
  run: async (client, message, args) => {




		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();

      const embed1 = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription("⏸ Paused the music for you!")
			return message.channel.send(embed1);
		}

    const embed2 = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("There is nothing playing!")
		return message.channel.send(embed2);


  }
}