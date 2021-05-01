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

    if(args[0] === 'nikes') {
        let Embed2 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor("#FF0000")
        .setDescription(`❌ You don't have Nikes to sell`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        let nikeses = await db.fetch(`nikes_${message.guild.id}_${user.id}`);

        if (nikeses < 1) return message.channel.send(Embed2);
       
        db.fetch(`nikes_${message.guild.id}_${user.id}`);
        db.subtract(`nikes_${message.guild.id}_${user.id}`, 1);

        let Embed3 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor(0x8e44ad)
        .setDescription(`✅ Sold Fresh Nikes For 600 Coins`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        db.add(`money_${message.guild.id}_${user.id}`, 600);
        message.channel.send(Embed3);

    } else if(args[0] === 'car') {
        let Embed2 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor("#FF0000")
        .setDescription(`❌ You don't have a Car to sell`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        let cars = await db.fetch(`car_${message.guild.id}_${user.id}`);

        if (cars < 1) return message.channel.send(Embed2);
       
        db.fetch(`car_${message.guild.id}_${user.id}`);
        db.subtract(`car_${message.guild.id}_${user.id}`, 1);

        let Embed3 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor(0x8e44ad)
        .setDescription(`✅ Sold a Car For 800 Coins`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        db.add(`money_${message.guild.id}_${user.id}`, 800);
        message.channel.send(Embed3);

    } else if(args[0] === 'mansion') {
        let Embed2 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor("#FF0000")
        .setDescription(`❌ You don't have a Mansion to sell`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        let houses = await db.fetch(`house_${message.guild.id}_${user.id}`);

        if (houses < 1) return message.channel.send(Embed2);
       
        db.fetch(`house_${message.guild.id}_${user.id}`);
        db.subtract(`house_${message.guild.id}_${user.id}`, 1);

        let Embed3 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setColor(0x8e44ad)
        .setDescription(`✅ Sold a Mansion For 1200 Coins`)
        .setTimestamp()
        .setFooter(client.config.copyright);

        db.add(`money_${message.guild.id}_${user.id}`, 1200);
        message.channel.send(Embed3);
    }

};
  
module.exports.help = {
    name: "sell",
    usage: "sell <nikes, car, mansion>",
    description: "",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};