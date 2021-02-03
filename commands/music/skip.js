const Discord = require("discord.js")

module.exports = {
  name: "skip",
  aliases: ["sk"],
  usage: "sk",
  description: "skip the song!",
  run: async (client, message, args) => {


	const { channel } = message.member.voice;
  const embed1 = new Discord.MessageEmbed()
  .setDescription("I'm sorry but you need to be in a voice channel to play music!")
  .setColor("RED")
		if (!channel) return message.channel.send(embed1);
		const serverQueue = message.client.queue.get(message.guild.id);
    const embed2 = new Discord.MessageEmbed()
    .setDescription('There is nothing playing that I could skip for you.')
    .setColor("RED")
		if (!serverQueue) return message.channel.send(embed2);

		serverQueue.connection.dispatcher.end('Skip command has been used!');

  }
}