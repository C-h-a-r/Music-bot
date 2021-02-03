const { Util } = require('discord.js');
const ytdl = require('ytdl-core');

const Discord = require('discord.js');

module.exports = {
  name: "play",
  aliases: ["pl"],
  usage: "play <song>",
  description: "play a song",
  run: async (client, message, args) => {







    
    const embed1 = new Discord.MessageEmbed()
    .setDescription("I'm sorry but you need to be in a voice channel to play music!")
    .setColor("RED")
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(embed1);
		const permissions = channel.permissionsFor(message.client.user);
    const embed2 = new Discord.MessageEmbed()
    .setDescription("I cannot connect to your voice channel, make sure I have the proper permissions!")
    .setColor("RED")
		if (!permissions.has('CONNECT'))return message.channel.send(embed2);
    const embed7 = new Discord.MessageEmbed()
    .setDescription("Please make sure the Song is a YouTube Link and not a different link or words")
    .setColor("RED")

    if(message.content.includes("https://youtube.com/") ||message.content.includes(" https://www.youtube.com/") || message.content.includes("https://youtu.be.com/")) {
    
    


		const serverQueue = message.client.queue.get(message.guild.id);
		const songInfo = await ytdl.getInfo(args[0])
		const song = {
			id: songInfo.videoDetails.video_id,
			title: Util.escapeMarkdown(songInfo.videoDetails.title),
			url: songInfo.videoDetails.video_url
		};
    const embed4 = new Discord.MessageEmbed()
    .setDescription(`✅ **${song.title}** has been added to the queue!`)
    .setColor("GREEN")
		if (serverQueue) {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			return message.channel.send(embed4);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		};
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				message.client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.play(ytdl(song.url))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
      const embed5 = new Discord.MessageEmbed()
      .setDescription(`🎶 Started playing: **${song.title}**`)
      .setColor("GREEN")
			queue.textChannel.send(embed5);
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
      const embed6 = new Discord.MessageEmbed()
      .setDescription(`I could not join the voice channel: ${error}`)
      .setColor("RED")
			return message.channel.send(embed6);
		}

    } else {
      message.channel.send(embed7)
    };

	}
};