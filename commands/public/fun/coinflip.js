/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
// jshint multistr: true 
const Discord = require('discord.js');
//TODO: Rework (dead cdn!)

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    let choices = [
        "Kopf",
        "Zahl"
    ];

    let output = choices[Math.floor(Math.random()*choices.length)];

    const embed = new Discord.MessageEmbed()
        .setColor(3447003)
        .setTitle('Coinflip')
        .setDescription(`Du hast ${output}`)
        .setImage('https://static.routerabfrage.net/coinflip.gif')
        .setTimestamp()
        .setFooter(client.config.copyright);

    message.channel.send(embed);
};

module.exports.help = {
    name: "coinflip",
    usage: "coinflip",
    description: "Does a random coinflip.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};