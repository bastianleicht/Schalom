/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const { MessageEmbed } = require("discord.js");

module.exports.run = async function (client, message, args) {
    if (message.channel === 'dm') return;

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return client.sendError("There is nothing playing in this server.", message.channel);

    let queue = new MessageEmbed()
    .setAuthor("Server Songs Queue", "https://cdn.bastianleicht.de/etc/schalom/music.gif")
    .setColor("BLUE")
    .addField("Now Playing", serverQueue.songs[0].title, true)
    .addField("Text Channel", serverQueue.textChannel, true)
    .addField("Voice Channel", serverQueue.voiceChannel, true)
    .setDescription(serverQueue.songs.map((song) => {
      if(song === serverQueue.songs[0])return;
      return `**-** ${song.title}`;
    }).join("\n"))
    .setFooter(client.config.copyright + " Currently Server Volume is "+serverQueue.volume);
    if(serverQueue.songs.length === 1)queue.setDescription(`No songs to play next add songs by \`\`${client.config.prefix}play <song_name>\`\``);
    message.channel.send(queue);
};

module.exports.help = {
  name: "queue",
  usage: "queue",
  description: "To show the server songs queue.",
  permissions: "",
  guildOnly: true,
  nsfw: false,
  ownerOnly: false,
};