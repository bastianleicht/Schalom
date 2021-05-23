/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || message.guilds.members.get(args[0]);
    const name = args.slice(1).join(" ");

    if(!message.member.hasPermission('MANAGE_NICKNAMES')) {
        let embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription('❌ I\'m sorry but you don\'t have the **MANAGE_NICKNAMES** Permission!')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    if(!message.guild.member(client.user).hasPermission('MANAGE_NICKNAMES')) {
        let embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription('❌ I\'m sorry but I don\'t have the **MANAGE_NICKNAMES** Permission!')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    if(!message.mentions.users.first()) {
        let embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription('❌ I\'m sorry but you have to provide a user to rename!')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    try {
        user = message.guild.member(user);
        await user.setNickname(name);
    } catch (error) {
        console.log(error);

        let embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription('❌ Failed to change the user\'s nickname!')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    let embed = new Discord.MessageEmbed()
        .setTitle(':hammer: Moderation')
        .setDescription(`You successfully changed the nickname of <@${user.id}>!`)
        .setColor('#62ff00')
        .setTimestamp()
        .setFooter(client.config.copyright);
    return message.channel.send(embed);

};

module.exports.help = {
    name: "rename",
    usage: "rename @user <name>",
    description: "Changes the nickname of the specified user.",
    permissions: ["MANAGE_NICKNAMES"],
    guildOnly: true,
    nsfw: false,
    ownerOnly: false,
};