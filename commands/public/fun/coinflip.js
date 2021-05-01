/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');

//TODO: Rework (dead cdn, missing gif!)

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    let choices = [
        "Head",
        "Tail"
    ];

    let output = choices[Math.floor(Math.random()*choices.length)];

    const embed = new Discord.MessageEmbed()
        .setColor(3447003)
        .setTitle('Coinflip')
        .setDescription(`You have ${output}`)
        //.setImage('https://static.routerabfrage.net/coinflip.gif')      // I don't actually have the gif anymore :(
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