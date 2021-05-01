/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    if (message.channel === 'dm') return;

    if (message.member.hasPermission('MANAGE_MESSAGES')) {
        await message.delete().catch(O_o => {});
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');

        const embed = new Discord.MessageEmbed()
            .setTitle('😲 New Poll! 😲')
            .setDescription(pollDescription)
            .setColor('YELLOW')
            .setTimestamp()
            .setFooter(client.config.copyright);
        let msgEmbed = await pollChannel.send(embed);
        await msgEmbed.react('👍');
        await msgEmbed.react('👎');
    } else {
        await message.delete().catch(O_o => {});
        const embed = new Discord.MessageEmbed()
                .setTitle('Missing Permission')
                .setDescription(`I'm sorry but you don't have the **MANAGE_MESSAGES** Permission`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter(client.config.copyright);
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });         // Deletes Message after 10seconds
        }).catch(console.error);                    // Logs the error if there is one 
    }
};

module.exports.help = {
    name: "poll",
    usage: "poll <#channel> <Description>",
    description: "Generates a poll Message in the mentioned Channel.",
    permissions: ["MANAGE_MESSAGES"],
    guildOnly: true,
    nsfw: false,
    ownerOnly: false,
};