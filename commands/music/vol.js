const Discord = require('discord.js');
module.exports = {
  name: "volume",
  aliases: ["v"],
  usage: "v <number>",
  description: "change the volume",
  run: async (client, message, args) => {



const embed1 = new Discord.MessageEmbed()
.setColor("RED")
.setDescription("I\'m sorry but you need to be in a voice channel to play music!")






		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(embed1);
		const serverQueue = message.client.queue.get(message.guild.id);
    const embed2 = new Discord.MessageEmbed()
.setColor("RED")
.setDescription("There is nothing playing!")
		if (!serverQueue) return message.channel.send(embed2);




    const embed3 = new Discord.MessageEmbed()
.setDescription(`The current volume is: **${serverQueue.volume}**`)

		if (!args[0]) return message.channel.send(embed3);
		serverQueue.volume = args[0]; // eslint-disable-line
    
    if (parseInt(args[0], 10) > 10 || typeof(parseInt(args[0], 10)) !== "number") return message.channel.send(embed3) 

     const embed4 = new Discord.MessageEmbed()
     .setColor("GREEN")
.setDescription(`I set the volume to: **${args[0]}**`)


		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(embed4);


  }
}