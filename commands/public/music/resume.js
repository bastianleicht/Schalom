/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const { MessageEmbed } = require("discord.js");

module.exports.run = async function (client, message, args) {
  if (message.channel === 'dm') return;

  const serverQueue = message.client.queue.get(message.guild.id);
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    let embed = new MessageEmbed()
    .setDescription("▶ Resumed the music for you!")
    .setColor("YELLOW")
    .setAuthor("Music has been Resumed!", "https://cdn.bastianleicht.de/etc/schalom/music.gif");
    return message.channel.send(embed);
  }
  return client.sendError("There is nothing playing in this server.", message.channel);
};

module.exports.help = {
  name: "resume",
  usage: "resume",
  description: "To resume the paused music.",
  permissions: "",
  guildOnly: true,
  nsfw: false,
  ownerOnly: false,
};