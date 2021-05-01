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

  let money = await db.fetch(`money_${message.guild.id}_${user.id}`);
  if (money === null) money = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);
  if (bank === null) bank = 0;

  let vip = await db.fetch(`bronze_${message.guild.id}_${user.id}`);
    if(vip === null) vip = 'None';
    if(vip === true) vip = 'Bronze';

  let shoes = await db.fetch(`nikes_${message.guild.id}_${user.id}`);
  if(shoes === null) shoes = '0';

  let newcar = await db.fetch(`car_${message.guild.id}_${user.id}`);
  if(newcar === null) newcar = '0';

  let newhouse = await db.fetch(`house_${message.guild.id}_${user.id}`);
  if(newhouse === null) newhouse = '0';

  let moneyEmbed = new Discord.MessageEmbed()
  .setTitle('💰 Economy')
  .setColor(0x8e44ad)
  .setDescription(`**${user}'s Profile**\n\nPocket: ${money}\nBank: ${bank}\nVIP Rank: ${vip}\n\n**Inventory**\n\nNikes: ${shoes}\nCars: ${newcar}\nMansions: ${newhouse}`)
  .setTimestamp()
  .setFooter(client.config.copyright);
  message.channel.send(moneyEmbed);
};

module.exports.help = {
  name: "profile",
  usage: "profile (<@user>)",
  description: "Shows your Economy Profile.",
  permissions: "",
  guildOnly: false,
  nsfw: false,
  ownerOnly: false,
};