/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    const botRole = message.guild.member(client.user).roles.highest.position;
    const userRole = message.guild.member(message.mentions.members.first()).roles.highest.position;
    const highestUserRole = message.member.roles.highest.position;
    let reason = args.slice(1).join(" ");

    if(!message.member.hasPermission('KICK_MEMBERS')) {
        let embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription('❌ I\'m sorry but you don\'t have the **KICK_MEMBERS** Permission!')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    if(!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) {
        let embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription('❌ I\'m sorry but I don\'t have the **KICK_MEMBERS** Permission!')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    if(!message.mentions.members.first()) {
        message.channel.send('You have to provide a User to kick!').then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    if(message.mentions.members.first().id === message.author.id) {
        message.channel.send('You can\'t kick yourself!').then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    if(highestUserRole <= botRole || botRole <= userRole) {
        let embed = new Discord.MessageEmbed()
            .setTitle(':hammer: Moderation')
            .setDescription('❌ I\'m sorry but that member\'s role is equal or higher to you!')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }

    if(!message.guild.member(message.mentions.members.first()).kickable) {
        message.channel.send('**An error occurred while kicking that member!**').then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);
    }

    if (reason.length < 1) reason = "No reason given.";

    message.guild.member(message.mentions.members.first()).kick(reason).catch(error => console.log(error));

    await message.mentions.members.first().send(`You have been kicked in **${message.guild.name}** by <@${message.author.id}>, ${reason}`);

    const embed = new Discord.MessageEmbed()
        .setTitle(':hammer: Moderation')
        .setDescription(`You successfully kicked <@${message.mentions.members.first().id}> with the reason: **${duration}s**!`)
        .setColor('#FFE100FF')
        .setTimestamp()
        .setFooter(client.config.copyright);
    message.channel.send(embed);
};

module.exports.help = {
    name: "kick",
    usage: "kick @user <reason>",
    description: "Kick's the User with the specified reason.",
    permissions: ["KICK_MEMBERS"],
    guildOnly: true,
    nsfw: false,
    ownerOnly: false,
};