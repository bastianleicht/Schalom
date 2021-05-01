/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
// jshint multistr: true 
const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    
    const embed = new Discord.MessageEmbed()
        .setTitle('🕑 Uptime')
        .addField(`I'm online since:`, `${ms(client.uptime, { long: true })}`)
        // .setDescription(`My uptime is \`${ms(client.uptime, { long: true })}\``)
        //.setThumbnail('http://static.routerabfrage.net/Clock.gif')
        .setColor(3447003)
        .setTimestamp()
        .setFooter(client.config.copyright);

    message.channel.send(embed);
};

module.exports.help = {
    name: "uptime",
    usage: "uptime",
    description: "Shows you the uptime of the Bot.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};