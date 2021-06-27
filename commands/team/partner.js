/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    if(message.author.id !== client.config.owner) return;

    await message.delete().catch(O_o => {});
    if (message.author.bot) return;
    if (message.channel === 'dm') return;

    if (args[0] === null || args[0] === "") return;
    if (args[0].includes("https://discord.gg/") === false && message.author.hasPermission('MANAGE_MESSAGES')) {
        const embed = new Discord.MessageEmbed()
        .setTitle(':warning: | Error')
        .addField('**Invalid Command Syntax!** Please use:', `${client.config.prefix}partner <Invite Link> <Kontakt> <Name>`)
        .setColor(0x8e44ad)
        .setTimestamp()
        .setFooter(client.config.copyright);
        return message.member.send(embed).then(msg => {
            msg.delete({ timeout: 15000});
        }).catch(console.error);
    }

    if (args[0].includes("https://discord.gg/") && message.member.hasPermission('MANAGE_MESSAGES')) {
        let name = args.slice(2).join(' ');
        const embed = new Discord.MessageEmbed()
        .setTitle(':gem: | Neue Partnerschaft')
        .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**Name:** ${name}\n**Kontakt:** ${args[1]}\n**Discord:** ${args[0]}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
        .setColor(0x8e44ad)
        .setTimestamp()
        .setFooter(client.config.copyright);

        message.channel.send(embed);
    
    } else {
        const embed = new Discord.MessageEmbed()
            .setTitle('Missing Permission')
            .setDescription(`I'm sorry but you don't have the **MANAGE_MESSAGES** Permission`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });         // Deletes Message after 10seconds
        }).catch(console.error); 
    }

};

module.exports.help = {
    name: "partner",
    usage: "partner <@User> <Discord Link> <Name>",
    description: "",
};