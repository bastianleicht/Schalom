/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const slotItems = ["🍇", "🍉", "🍊", "🍎", "🍓", "🍒"];
const db = require("quick.db");
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    let user = message.author;
    let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`);
    let money = parseInt(args[0]);
    let win = false;

    let moneymore = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor("#FF0000")
    .setDescription(`❌ You are betting more than you have`)
    .setTimestamp()
    .setFooter(client.config.copyright);

    let moneyhelp = new Discord.MessageEmbed()
    .setTitle('💰 Economy')
    .setColor("#FF0000")
    .setDescription(`❌ Specify an amount`)
    .setTimestamp()
    .setFooter(client.config.copyright);

    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);

    let number = [];
    let i;
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] === number[1] && number[1] === number[2]) {
        money *= 9;
        win = true;
    } else if (number[0] === number[1] || number[0] === number[2] || number[1] === number[2]) {
        money *= 2;
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setDescription(`\n${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
        .setColor(0x8e44ad)
        .setTimestamp()
        .setFooter(client.config.copyright);

        message.channel.send(slotsEmbed1);
        db.add(`money_${message.guild.id}_${user.id}`, money);
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
        .setColor(0x8e44ad)
        .setTimestamp()
        .setFooter(client.config.copyright);

        message.channel.send(slotsEmbed);
        db.subtract(`money_${message.guild.id}_${user.id}`, money);
    }

};
  
module.exports.help = {
    name: "slots",
    usage: "slots <amount>",
    description: "Just a Economy Slot game",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};