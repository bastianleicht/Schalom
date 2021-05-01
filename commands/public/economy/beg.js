/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {

  let user = message.author;
  let timeout = 180000;
  let amount = 5;
  let beg = await db.fetch(`beg_${message.guild.id}_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor('#FF0000')
    .setDescription(`❌ You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `)
    .setTimestamp()
    .setFooter(client.config.copyright);

    message.channel.send(timeEmbed);
  } else {

    let moneyEmbed = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor(3447003)
    .setDescription(`✅ You've begged and received ${amount} coins`)
    .setTimestamp()
    .setFooter(client.config.copyright);
    message.channel.send(moneyEmbed);

    db.add(`money_${message.guild.id}_${user.id}`, amount);
    db.set(`beg_${message.guild.id}_${user.id}`, Date.now());

  }
};


module.exports.help = {
    name: "beg",
    usage: "beg",
    description: "Begs for some money.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};