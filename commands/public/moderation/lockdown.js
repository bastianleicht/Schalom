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
                .setTitle(':hammer: Moderation')
                .setDescription("👾 You must set a duration for the lockdown in either hours, minutes or seconds")
                .setColor('36393e')
                .setTimestamp()
                .setFooter(client.config.copyright);
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
                    .setTitle(':hammer: Moderation')
                    .setDescription("🔓 Lockdown lifted.")
                    .setColor('36393e')
                    .setTimestamp()
                    .setFooter(client.config.copyright);
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
                    .setTitle(":hammer: Moderation")
                    .addField("🔒 Channel Locked \nLocked by", `${message.author}`, true)
                    .addField("Locked for", `${ms(ms(time), { long:true })}`, true)
                    .setColor('36393e')
                    .setTimestamp()
                    .setFooter(client.config.copyright);
                message.channel.send(embed).then(() => {
                    client.lockit[message.channel.id] = setTimeout(() => {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(':hammer: Moderation')
                            .setDescription("🔓 Lockdown lifted.")
                            .setColor('36393e')
                            .setTimestamp()
                            .setFooter(client.config.copyright);
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
            .setTitle(':hammer: Moderation')
            .setDescription('❌ I\'m sorry but you don\'t have the **MANAGE_GUILD** Permission!')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });     // Deletes Message after 10seconds
        }).catch(console.error);                // Logs the error if there is one
    }
};

module.exports.help = {
    name: "lockdown",
    usage: "lockdown <0-21601>",
    description: "Locks the channel for the specified time.",
    permissions: ["MANAGE_GUILD"],
    guildOnly: true,
    nsfw: false,
    ownerOnly: false,
};