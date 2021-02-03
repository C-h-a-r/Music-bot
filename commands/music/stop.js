const Discord = require("discord.js")
module.exports = {
  name: "stop",
  aliases: ["s"],
  usage: "stop",
  description: "stop a song",
  run: async (client, message, args) => {

    
    const embed1 = new Discord.MessageEmbed()
    .setDescription("I'm sorry but you need to be in a voice channel to play music!")
    .setColor("RED")

		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(embed1);
		const serverQueue = message.client.queue.get(message.guild.id);
    const embed2 = new Discord.MessageEmbed()
    .setDescription("There is nothing playing that I could stop for you.")
    .setColor("RED")
		if (!serverQueue) return message.channel.send(embed2);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');

const stopped = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription("Music Stopped!")

message.channel.send(stopped)

  }
}