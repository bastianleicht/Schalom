/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    if (message.channel === 'dm') return;
    if(message.author.id !== client.config.owner) return;

    if(args[0] === "on") {
        message.channel.send("DevMode on");
        client.user.setStatus('dnd').then(console.log).catch(console.error);
    } else if(args[0] === "off") {
        message.channel.send("DevMode off");
        client.user.setStatus('online');
    }
    
};

module.exports.help = {
    name: "devmode",
    usage: "devmode",
    description: "Set's the bot into Dev Mode.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: true,
};