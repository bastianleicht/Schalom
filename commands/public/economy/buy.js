/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    let user = message.author;
    let author = db.fetch(`money_${message.guild.id}_${user.id}`);

    let Embed = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor(0x8e44ad)
    .setDescription(`❌ You need 2000 coins to purchase Bronze VIP`)
    .setTimestamp()
    .setFooter(client.config.copyright);

    if (args[0] === 'bronze') {
        if (author < 3500) return message.channel.send(Embed);
        
        db.fetch(`bronze_${message.guild.id}_${user.id}`);
        db.set(`bronze_${message.guild.id}_${user.id}`, true);

        let Embed2 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor(0x8e44ad)
        .setDescription(`✅ Purchased Bronze VIP For 3500 Coins`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        db.subtract(`money_${message.guild.id}_${user.id}`, 3500);
        message.channel.send(Embed2);
    } else if(args[0] === 'nikes') {
        let Embed2 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor("#FF0000")
        .setDescription(`❌ You need 600 coins to purchase some Nikes`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        if (author < 600) return message.channel.send(Embed2);
       
        db.fetch(`nikes_${message.guild.id}_${user.id}`);
        db.add(`nikes_${message.guild.id}_${user.id}`, 1);

        let Embed3 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor(0x8e44ad)
        .setDescription(`✅ Purchased Fresh Nikes For 600 Coins`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        db.subtract(`money_${message.guild.id}_${user.id}`, 600);
        message.channel.send(Embed3);
    } else if(args[0] === 'car') {
        let Embed2 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor("#FF0000")
        .setDescription(`❌ You need 800 coins to purchase a new car`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        if (author < 800) return message.channel.send(Embed2);
       
        db.fetch(`car_${message.guild.id}_${user.id}`);
        db.add(`car_${message.guild.id}_${user.id}`, 1);

        let Embed3 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor(0x8e44ad)
        .setDescription(`✅ Purchased a New Car For 800 Coins`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        db.subtract(`money_${message.guild.id}_${user.id}`, 800);
        message.channel.send(Embed3);
    } else if(args[0] === 'mansion') {
        let Embed2 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor("#FF0000")
        .setDescription(`❌ You need 1200 coins to purchase a Mansion`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        if (author < 1200) return message.channel.send(Embed2);
       
        db.fetch(`house_${message.guild.id}_${user.id}`);
        db.add(`house_${message.guild.id}_${user.id}`, 1);

        let Embed3 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor(0x8e44ad)
        .setDescription(`✅ Purchased a Mansion For 1200 Coins`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        db.subtract(`money_${message.guild.id}_${user.id}`, 1200);
        message.channel.send(Embed3);
    } else {
        let embed3 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor("#FF0000")
        .setDescription('❌ Enter an item to buy')
        .setTimestamp()
        .setFooter(client.config.copyright);
        message.channel.send(embed3);
    }

};

module.exports.help = {
    name: "buy",
    usage: "buy <item>",
    description: "Buys the specified Item.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};