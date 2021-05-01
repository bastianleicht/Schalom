/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const { MessageEmbed } = require("discord.js");
const sendError = require("../../../utils/error");
const config = require('../../../opt/config.json');

module.exports.run = async function (client, message, args) {
  if (message.channel === 'dm') return;

  const channel = message.member.voice.channel;
  if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return sendError("There is nothing playing in this server.", message.channel);
  if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
  serverQueue.volume = args[0]; 
  serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
  let xd = new MessageEmbed()
  .setDescription(`I set the volume to: **${args[0]/5}/5**(it will be divied by 5)`)
  .setAuthor("Server Volume Manager", "https://cdn.bastianleicht.de/etc/schalom/music.gif")
  .setColor("BLUE")
  .setFooter(config.copyright);
  return message.channel.send(xd);
};

module.exports.help = {
    name: "volume",
    usage: "volume <1-5>",
    description: "Changed the Volume of the music.",
    permissions: "",
    guildOnly: true,
    nsfw: false,
    ownerOnly: false,
};