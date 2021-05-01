/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');

const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports.run = async (client, message, args) => {
    if (message.author.id !== client.config.owner) return;

    const guildId = args[0];
    if(!rgx.test(guildId)) return message.channel.send('Please provide a valid server ID');

    const guild = message.client.guilds.cache.get(guildId);

    if (!guild) return message.channel.send('Unable to find server, please check the provided ID');
    await guild.leave();
    const embed = new Discord.MessageEmbed()
        .setTitle('Leave Guild')
        .setDescription(`I have successfully left **${guild.name}**.`)
        .setColor(3447003)
        .setFooter(client.config.copyright)
        .setTimestamp();
    message.channel.send(embed);

};

module.exports.help = {
    name: "leaveguild",
    usage: "leaveguild <id>",
    description: "Leaves the mentioned Guild.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: true,
};