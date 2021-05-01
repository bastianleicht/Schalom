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
  let timeout = 86400000;
  let amount = 200;
  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor('#FF0000')
    .setDescription(`❌ You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `)
    .setTimestamp()
    .setFooter(client.config.copyright);

    message.channel.send(timeEmbed);

  } else {

    let moneyEmbed = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor(3447003)
    .setDescription(`✅ You've collected your daily reward of ${amount} coins`)
    .setTimestamp()
    .setFooter(client.config.copyright);

    message.channel.send(moneyEmbed);

    db.add(`money_${message.guild.id}_${user.id}`, amount);
    db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

  }
};


module.exports.help = {
    name: "daily",
    usage: "daily",
    description: "Redeems your daily amount of Coins.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};