/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    let embed = new Discord.MessageEmbed()
        .setTitle("🏓 Pong!")
        .setColor(3447003)
        .addField("Bot Latency", `${Date.now() - message.createdTimestamp}ms`, true)
        .addField("API Latency", `${Math.round(client.ws.ping)}ms`, true)
        .setTimestamp()
        .setFooter(client.config.copyright);

    message.channel.send(embed);
};

module.exports.help = {
    name: "ping",
    usage: "ping",
    description: "Shows you the Ping of the Bot and the Discord API.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};