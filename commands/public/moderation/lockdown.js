/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');
const ms = require("ms");
const config = require('../../../opt/config.json');

module.exports.run = async (client, message, args) => {
    //TODO Working
    if (message.channel === 'dm') return message.channel.send('This Command is only available in Guilds!');

    if (message.member.hasPermission("MANAGE_GUILD")) {

        // if (!client.lockit) client.lockit = [];

        // let time = args.join(' ');
        // let validUnlocks = ['release', 'unlock'];
        // var notimeembed = new Discord.MessageEmbed()
        //     .setTitle('Error')
        //     .setDescription("👾 You must set a duration for the lockdown in either hours, minutes or seconds")
        //     .setColor('36393e');
        // if (!time) return message.channel.send(notimeembed);

        // if (validUnlocks.includes(time)) {
        //     message.channel.overwritePermissions(message.guild.id, {
        //         SEND_MESSAGES: null
        //     }).then(() => {
        //         var liftedembed = new Discord.MessageEmbed()
        //             .setTitle('🔒 Lockdown')
        //             .setDescription("🔓 Loockdown lifted.")
        //             .setColor('36393e');
        //         message.channel.send(liftedembed);
        //         clearTimeout(client.lockit[message.channel.id]);
        //         delete client.lockit[message.channel.id];
        //     }).catch(error => {
        //         console.log(error);
        //     });
        // } else {
        //     message.channel.overwritePermissions(message.guild.id, {
        //         SEND_MESSAGES: false
        //     }).then(() => {
        //         var lockdownembed = new Discord.MessageEmbed()
        //             .setTitle("🔒 Channel Locked")
        //             .addField("Locked by", `${message.author}`, true)
        //             .addField("Locked for", `${ms(ms(time), { long:true })}`, true)
        //             .setColor('36393e');
        //         message.channel.send(lockdownembed).then(() => {

        //             client.lockit[message.channel.id] = setTimeout(() => {
        //                 var liftedembed = new Discord.MessageEmbed()
        //                     .setTitle('🔒 Lockdown')
        //                     .setDescription("🔓 Loockdown lifted.")
        //                     .setColor('36393e');
        //                 message.channel.overwritePermissions(message.guild.id, {
        //                     SEND_MESSAGES: null
        //                 }).then(

        //                     message.channel.send(liftedembed)).catch(console.error);
        //                 delete client.lockit[message.channel.id];
        //             }, ms(time));

        //         }).catch(error => {
        //             console.log(error);
        //         });
        //     });
        // }

    } else {
        var nopermsembed = new Discord.MessageEmbed()
            .setTitle('Error')
            .setDescription("👾 Missing Permissions :: MANAGE_SERVER")
            .setColor('36393e');
        message.channel.send(nopermsembed);
    }

};

module.exports.help = {
    name: "lockdown"
};