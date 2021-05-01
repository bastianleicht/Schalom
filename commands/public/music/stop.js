/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const { MessageEmbed } = require("discord.js");
const sendError = require("../../../utils/error");

module.exports.run = async function (client, message, args) {
  if (message.channel === 'dm') return;

  const channel = message.member.voice.channel;
  if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue)return sendError("There is nothing playing that I could stop for you.", message.channel);
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end("Stop the music");
  await message.react("✅");
};

module.exports.help = {
  name: "stop",
  usage: "stop",
  description: "To stop the music and clearing the queue.",
  permissions: "",
  guildOnly: true,
  nsfw: false,
  ownerOnly: false,
};