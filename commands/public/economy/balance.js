/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

  let user = message.mentions.members.first() || message.author;
  let bal = db.fetch(`money_${message.guild.id}_${user.id}`);
  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);

  if (bal === null) bal = 0;
  if (bank === null) bank = 0;

  let moneyEmbed = new Discord.MessageEmbed()
  .setTitle('Economy')
  .setColor(0x8e44ad)
  .setDescription(`**${user}'s Balance**\n\nPocket: ${bal}\nBank: ${bank}`)
  .setTimestamp()
  .setFooter(client.config.copyright);
  message.channel.send(moneyEmbed);
};

module.exports.help = {
    name: "balance",
    usage: "balance (<User>)",
    description: "Shows your Balance or the balance of the mentioned User.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};