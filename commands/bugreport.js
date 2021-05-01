/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');
const { oneLine } = require('common-tags');

//TODO: Maybe rework

module.exports.run = async (client, message, args) => {
    if (message.channel === 'dm') return message.channel.send('This Command is only available in Guilds!');

    const reportChannel = message.client.channels.cache.get(client.config.reportChannel);

    if (!args[0]) return message.channel.send('Please provide a message to send');

    let report = message.content.slice(message.content.indexOf(args[0]), message.content.length);

    // Send report
    const reportEmbed = new Discord.MessageEmbed()
        .setTitle('Bug Report')
        .setThumbnail(reportChannel.guild.iconURL({ dynamic: true }))
        .setDescription(report)
        .addField('User', message.member, true)
        .addField('Server', message.guild.name, true)
        .setColor(3447003)
        .setFooter(client.config.copyright)
        .setTimestamp();
    reportChannel.send(reportEmbed);

    // Send response
    if (report.length > 1024) report = report.slice(0, 1021) + '...';
    const embed = new Discord.MessageEmbed()
        .setTitle('Bug Report')
        .setThumbnail('https://cdn.discordapp.com/app-icons/777864354170273832/c49774637b22469a6855580c66e62ca3.png')
        .setDescription(oneLine `
        Successfully sent bug report!
        Please join the [Support Server](https://discord.gg/DYA89WU) to further discuss your issue.
      `)
        .addField('Member', message.member, true)
        .addField('Message', report)
        .setColor(3447003)
        .setFooter(client.config.copyright)
        .setTimestamp();
    message.channel.send(embed);

};

module.exports.help = {
   name: "bugreport",
    usage: "bugreport <Your Bug>",
    description: "Reports a Bug to the Bot Owner.",
    permissions: "",
    guildOnly: true,
    nsfw: false,
    ownerOnly: false,
};