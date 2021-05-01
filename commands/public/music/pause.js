/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const { MessageEmbed } = require("discord.js");
const config = require('../../../opt/config.json');

module.exports.run = async function (client, message, args) {
  if (message.channel === 'dm') return;

  const serverQueue = message.client.queue.get(message.guild.id);
  if (serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    let pause = new MessageEmbed()
    .setDescription("⏸ Paused the music for you!")
    .setColor("YELLOW")
    .setAuthor("Music has been paused!", "https://cdn.bastianleicht.de/etc/schalom/music.gif")
    .setFooter(config.copyright);
    return message.channel.send(pause);
  }
  return sendError("There is nothing playing in this server.", message.channel);
};


module.exports.help = {
  name: "pause",
  usage: "pause",
  description: "To pause the current music in the server.",
  permissions: "",
  guildOnly: true,
  nsfw: false,
  ownerOnly: false,
};