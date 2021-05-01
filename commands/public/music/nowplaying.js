/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const { MessageEmbed } = require("discord.js");

//TODO: Rework

module.exports.run = async function (client, message, args) {
  if (message.channel === 'dm') return;

  const serverQueue = message.client.queue.get(message.guild.id);
  let embed = new MessageEmbed()
  .setColor("RED")
  .setDescription("There is nothing playing in this server.")
  .setFooter("Oops something went wrong :(");
  if (!serverQueue) return message.channel.send(embed);
  let song = serverQueue.songs[0];
  let thing = new MessageEmbed()
    .setAuthor("Now Playing", "https://cdn.bastianleicht.de/etc/schalom/music.gif")
    .setThumbnail(song.img)
    .setColor("BLUE")
    .addField("Name", song.title, true)
    .addField("Duration", song.duration, true)
    .addField("Requested by", song.req.tag, true)
    .setFooter(`${client.config.copyright}  • Views: ${song.views} | ${song.ago}`);
  return message.channel.send(thing);
};

module.exports.help = {
  name: "nowplaying",
  usage: "nowplaying",
  description: "To show the music which is currently playing in this server.",
  permissions: "",
  guildOnly: true,
  nsfw: false,
  ownerOnly: false,
};