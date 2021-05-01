/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
  if(message.author.id !== client.config.owner) return;

  let user = message.mentions.members.first() || message.author;

  if (isNaN(args[1])) return;
  db.subtract(`money_${message.guild.id}_${user.id}`, args[1]);
  let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`✅ Removed ${args[1]} coins\n\nNew Balance: ${bal}`);
  message.channel.send(moneyEmbed);

};


module.exports.help = {
  name: "removemoney",
  usage: "removemoney <@user> <amount>",
  description: "Removes the specified amount from a User.",
  permissions: "",
  guildOnly: false,
  nsfw: false,
  ownerOnly: true,
};
