/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

  let user = message.author;
  let member = db.fetch(`money_${message.guild.id}_${user.id}`);
  let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`);

  if (args[0] === 'all') {
    let money = await db.fetch(`money_${message.guild.id}_${user.id}`);
    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);

    let embedbank = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor('#FF0000')
    .setDescription("❌ You don't have any money to deposit")
    .setTimestamp()
    .setFooter(client.config.copyright);

    if(money === 0) return message.channel.send(embedbank);

    db.add(`bank_${message.guild.id}_${user.id}`, money);
    db.subtract(`money_${message.guild.id}_${user.id}`, money);

    let embed5 = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor(0x8e44ad)
    .setDescription(`✅ You have deposited all your coins into your bank`)
    .setTimestamp()
    .setFooter(client.config.copyright);
    message.channel.send(embed5);
  
  } else {
  
    let embed2 = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor('#FF0000')
    .setDescription(`❌ Specify an amount to deposit`)
    .setTimestamp()
    .setFooter(client.config.copyright);
  
    if (!args[0]) {
        return message.channel.send(embed2)
        .catch(err => console.log(err));
    }
    let embed3 = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor('#FF0000')
    .setDescription(`❌ You can't deposit negative money`)
    .setTimestamp()
    .setFooter(client.config.copyright);

    if (message.content.includes('-')) { 
        return message.channel.send(embed3);
    }
    let embed4 = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor('#FF0000')
    .setDescription(`❌ You don't have that much money`)
    .setTimestamp()
    .setFooter(client.config.copyright);

    if (member < args[0]) {
        return message.channel.send(embed4);
    }

    let embed5 = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor(0x8e44ad)
    .setDescription(`✅ You have deposited ${args[0]} coins into your bank`)
    .setTimestamp()
    .setFooter(client.config.copyright);

    message.channel.send(embed5);
    db.add(`bank_${message.guild.id}_${user.id}`, args[0]);
    db.subtract(`money_${message.guild.id}_${user.id}`, args[0]);
  }
};

module.exports.help = {
    name: "deposit",
    usage: "deposit <all, amount>",
    description: "",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};