/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

  let user = message.mentions.members.first();
  let member = db.fetch(`money_${message.guild.id}_${message.author.id}`);

  let embed1 = new Discord.MessageEmbed()
  .setTitle('💰 Economy')
  .setColor("#FFFFFF")
  .setDescription(`❌ Mention someone to pay`)
  .setTimestamp()
  .setFooter(client.config.copyright);

  if (!user) {
      return message.channel.send(embed1);
  }
  let embed2 = new Discord.MessageEmbed()
  .setTitle('💰 Economy')
  .setColor("#FFFFFF")
  .setDescription(`❌ Specify an amount to pay`)
  .setTimestamp()
  .setFooter(client.config.copyright);
  
  if (!args[1]) {
      return message.channel.send(embed2);
  }
  let embed3 = new Discord.MessageEmbed()
  .setTitle('💰 Economy')
  .setColor("#FFFFFF")
  .setDescription(`❌ You can't pay someone negative money`)
  .setTimestamp()
  .setFooter(client.config.copyright);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3);
  }
  let embed4 = new Discord.MessageEmbed()
  .setTitle('💰 Economy')
  .setColor("#FFFFFF")
  .setDescription(`❌ You don't have that much money`)
  .setTimestamp()
  .setFooter(client.config.copyright);

  if (member < args[1]) {
      return message.channel.send(embed4);
  }

  let embed5 = new Discord.MessageEmbed()
  .setTitle('💰 Economy')
  .setColor("#FFFFFF")
  .setDescription(`✅ You have payed ${user.user.username} ${args[1]} coins`)
  .setTimestamp()
  .setFooter(client.config.copyright);

  message.channel.send(embed5);
  db.add(`money_${message.guild.id}_${user.id}`, args[1]);
  db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1]);

};

module.exports.help = {
  name: "pay",
  usage: "pay <user> <amount>",
  description: "Pays someone the specified amount.",
  permissions: "",
  guildOnly: false,
  nsfw: false,
  ownerOnly: false,
};