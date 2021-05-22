/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    const duration = parseInt(args[0]);

    if(!message.member.hasPermission('MANAGE_CHANNELS')) {
        const embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription(`❌ I'm sorry but you don't have the **MANAGE_CHANNELS** Permission!`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    if(!message.guild.member(client.user).hasPermission('MANAGE_CHANNELS')) {
        let embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription('❌ I\'m sorry but I don\'t have the **MANAGE_CHANNELS** Permission!')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 30000 });     // Deletes Message after 30seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    if(isNaN(duration)) {
        const embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription(`❌ Failed to set slowmode in this channel, please enter a valid number!`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    if(duration < 0 || duration > 21601) {
        const embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription(`❌ Failed to set slowmode in this channel, you can only use in 0 - 21600 seconds!`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    message.channel.setRateLimitPerUser(duration).catch(error => console.log(error));
    const embed = new Discord.MessageEmbed()
        .setTitle(':hammer: Moderation')
        .setDescription(`Changed the channel's slowmode to **${duration}s**!`)
        .setColor('#FFE100FF')
        .setTimestamp()
        .setFooter(client.config.copyright);
    message.channel.send(embed);

};

module.exports.help = {
    name: "slowmode",
    usage: "slowmode <0-21601>",
    description: "Edit's the channel's slowmode Settings.",
    permissions: ["MANAGE_CHANNELS"],
    guildOnly: true,
    nsfw: false,
    ownerOnly: false,
};