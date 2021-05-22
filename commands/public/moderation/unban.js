/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS')) {
        let embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription('❌ I\'m sorry but you don\'t have the **BAN_MEMBERS** Permission!')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    if(!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
        let embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription('❌ I\'m sorry but I don\'t have the **BAN_MEMBERS** Permission!')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    message.guild.fetchBans().then(bans => {
        if (bans.size === 0) {
            let embed = new Discord.MessageEmbed()
                .setTitle(':hammer: Moderation')
                .setDescription('❌ I\'m sorry but there are no bans on this Server!')
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter(client.config.copyright);
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
            }).catch(console.error);                // Logs the error if there is one
        }
        const User = bans.find(bans => bans.user.id === args[0]);
        if (!User) {
            let embed = new Discord.MessageEmbed()
                .setTitle(':hammer: Moderation')
                .setDescription('❌ I\'m sorry but the user you provided is not banned!')
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter(client.config.copyright);
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
            }).catch(console.error);                // Logs the error if there is one
        }

        message.guild.members.unban(User.user);

        let embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription(`You successfully unbanned <@${args[0]}>!`)
            .setColor('#FFE100FF')
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 15000 });     // Deletes Message after 15seconds
        }).catch(console.error);                // Logs the error if there is one
    });
};