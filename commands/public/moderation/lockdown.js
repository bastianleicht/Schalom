/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');
const ms = require('ms');

// TODO: Update to seconds instead of milliseconds.

module.exports.run = async (client, message, args) => {
    if (message.channel === 'dm') return;

    if (message.member.hasPermission("MANAGE_GUILD")) {
        if (!client.lockit) client.lockit = [];

        let time = args.join(' ');
        let validUnlocks = ['release', 'unlock'];
        if (!time) {
            let embed = new Discord.MessageEmbed()
                .setTitle('Error')
                .setDescription("👾 You must set a duration for the lockdown in either hours, minutes or seconds")
                .setColor('36393e');
            return message.channel.send(embed);
        }

        if (validUnlocks.includes(time)) {
            message.channel.overwritePermissions([
                {
                    id: message.guild.id,
                    allow: ['SEND_MESSAGES'],
                }
            ]).then(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle('🔒 Lockdown')
                    .setDescription("🔓 Lockdown lifted.")
                    .setColor('36393e');
                message.channel.send(embed);
                clearTimeout(client.lockit[message.channel.id]);
                delete client.lockit[message.channel.id];
            }).catch(error => {
                console.log(error);
            });
        } else {
            message.channel.overwritePermissions( [
                {
                    id: message.guild.id,
                    deny: ['SEND_MESSAGES'],
                }
                ]).then(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle("🔒 Channel Locked")
                    .addField("Locked by", `${message.author}`, true)
                    .addField("Locked for", `${ms(ms(time), { long:true })}`, true)
                    .setColor('36393e');
                message.channel.send(embed).then(() => {
                    client.lockit[message.channel.id] = setTimeout(() => {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('🔒 Lockdown')
                            .setDescription("🔓 Lockdown lifted.")
                            .setColor('36393e');
                        message.channel.overwritePermissions([
                            {
                                id: message.guild.id,
                                allow: ['SEND_MESSAGES'],
                            }
                        ]).then(
                            message.channel.send(embed)).catch(console.error);
                        delete client.lockit[message.channel.id];
                    }, ms(time));
                }).catch(error => {
                    console.log(error);
                });
            });
        }
    } else {
        let embed = new Discord.MessageEmbed()
            .setTitle('Error')
            .setDescription("👾 Missing Permissions :: MANAGE_SERVER")
            .setColor('36393e');
        message.channel.send(embed);
    }
};

module.exports.help = {
    name: "lockdown"
};