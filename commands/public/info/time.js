/*
 * Copyright (c) 2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    const date = new Date();

    const embed = new Discord.MessageEmbed()
        .setTitle(`Here is the time ${message.author.username}`)
        .setDescription(`📅 | ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}\n
         🕖 | ${date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}`)
        .setColor(3447003)
        .setTimestamp()
        .setFooter(client.config.copyright);
    return message.channel.send(embed);
};

module.exports.help = {
    name: "time",
    usage: "time",
    description: "Show's you the current Date and Time.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};