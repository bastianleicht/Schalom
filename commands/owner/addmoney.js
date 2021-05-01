/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');
const db = require("quick.db");


module.exports.run = async (client, message, args) => {
    if (message.author.id !== client.config.owner) return;

    let user = message.mentions.members.first() || message.author;
    let amount = args[1];

    db.add(`money_${message.guild.id}_${user.id}`, amount);

    let moneyEmbed = new Discord.MessageEmbed()
    .setTitle('💰 Economy | Admin')
    .setColor(3447003)
    .setDescription(`✅ You added ${amount} coins to <@${user.id}>'s balance!`)
    .setTimestamp()
    .setFooter(client.config.copyright);
    message.channel.send(moneyEmbed);

};

module.exports.help = {
    name: "addmoney",
    usage: "addmoney <@user> <amount>",
    description: "Adds money to a User.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: true,
};