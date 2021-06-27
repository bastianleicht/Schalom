/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */

module.exports.run = async function (client, message, args) {
  if (message.channel === 'dm') return;

  const channel = message.member.voice.channel;
  if (!channel) return client.sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return client.sendError("There is nothing playing that I could skip for you.", message.channel);
  serverQueue.connection.dispatcher.end("Skipped the music");
  await message.react("✅");
};

module.exports.help = {
  name: "skip",
  usage: "skip",
  description: "To skip the current Song.",
  permissions: "",
  guildOnly: true,
  nsfw: false,
  ownerOnly: false,
};