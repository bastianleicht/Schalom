/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    const embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username}'s Invite Link`)
        .setDescription(`[Click to Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=112536641&scope=bot)`)
        .setColor(3447003)
        .setTimestamp()
        .setFooter(client.config.copyright);
    return message.channel.send(embed);
};

module.exports.help = {
    name: "invite",
    usage: "invite",
    description: "Sends you the Bot invite Link!",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};