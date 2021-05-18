/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');

//TODO: Maybe advance a little bit?

module.exports.run = async (client, message, args) => {

    let choices = [
        "Head",
        "Tail"
    ];

    let output = choices[Math.floor(Math.random()*choices.length)];

    const embed = new Discord.MessageEmbed()
        .setColor(3447003)
        .setTitle('Coinflip')
        .setThumbnail('https://cdn.bastianleicht.de/etc/schalom/coinflip.gif')
        .setDescription(`You have ${output}!`)
        .setTimestamp()
        .setFooter(client.config.copyright);

    message.channel.send(embed);
};

module.exports.help = {
    name: "coinflip",
    usage: "coinflip",
    description: "Performs a coinflip.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};