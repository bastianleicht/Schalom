/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const db = require('quick.db');
const Discord = require('discord.js');
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {

    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`);
    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`❌ You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `)
            .setColor("#FF0000")
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(timeEmbed);
    } else {

        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic'];
        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 80) + 1;

        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`✅ You worked as a **${replies[result]}** and earned ${amount} coins`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed);
        
        db.add(`money_${message.guild.id}_${user.id}`, amount);
        db.set(`work_${message.guild.id}_${user.id}`, Date.now());
    }
};



module.exports.help = {
  name: "work",
  usage: "work",
  description: "Working for Money.",
  permissions: "",
  guildOnly: false,
  nsfw: false,
  ownerOnly: false,
};
