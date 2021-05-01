/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(client.config.prefix)) return;

    if(args[0] == null || "") {
        const error = new Discord.MessageEmbed()
            .setTitle(':robot: | Help Commands')
            .setDescription(`__Available Commands__:\n\
            **${client.commands.info.size}** Info Commands\n\
            **${client.commands.gameinfo.size}** GameInfo Commands\n\
            **${client.commands.fun.size}** Fun Commands\n\
            **${client.commands.nsfw.size}** NSFW Commands\n\
            **${client.commands.music.size}** Music Commands\n\
            **${client.commands.economy.size}** Economy Commands\n\
            **${client.commands.moderation.size}** Moderation Commands!\n\n\
            Try getting more help by using __**${client.config.prefix}help <category>**__`)
            .setColor(3447003)
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.channel.send(error);
    }

    if(args[0] === "nsfw") {
        const commands = client.commands.nsfw.map(cmd => ` \`${cmd.help.name}\``);

        const nsfwHelp = new Discord.MessageEmbed()
            .setTitle(':robot: | NSFW Commands')
            .addField(`Here are all **NSFW** Commands! (${client.commands.nsfw.size})`, `${commands}`)
            .setColor(3447003)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(nsfwHelp);
    }

    if(args[0] === "fun") {
        const commands = client.commands.fun.map(cmd => ` \`${cmd.help.name}\``);

        const funHelp = new Discord.MessageEmbed()
            .setTitle(':robot: | Fun Commands')
            .addField(`Here are all **Fun** Commands! (${client.commands.fun.size})`, `${commands}`)
            .setColor(3447003)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(funHelp);
    }

    if(args[0] === "info") {
        const commands = client.commands.info.map(cmd => ` \`${cmd.help.name}\``);

        const infoHelp = new Discord.MessageEmbed()
            .setTitle(':robot: | Info Commands')
            .addField(`Here are all **Info** Commands! (${client.commands.info.size})`, `${commands}`)
            .setColor(3447003)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(infoHelp);
    }

    if(args[0] === "moderation" || args[0] === "mod") {
        const commands = client.commands.moderation.map(cmd => ` \`${cmd.help.name}\``);

        const modHelp = new Discord.MessageEmbed()
            .setTitle(':robot: | Moderation Commands')
            .addField(`Here are all **Moderation** Commands! (${client.commands.moderation.size})`, `${commands}`)
            .setColor(3447003)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(modHelp);
    }

    if(args[0] === "music") {
        const commands = client.commands.music.map(cmd => ` \`${cmd.help.name}\``);

        const musicHelp = new Discord.MessageEmbed()
            .setTitle(':robot: | Music Commands')
            .addField(`Here are all **Music** Commands! (${client.commands.music.size})`, `${commands}`)
            .setColor(3447003)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(musicHelp);
    }

    if(args[0] === "gameinfo") {
        const commands = client.commands.gameinfo.map(cmd => ` \`${cmd.help.name}\``);

        const musicHelp = new Discord.MessageEmbed()
            .setTitle(':robot: | Gameinfo Commands')
            .addField(`Here are all **Gameinfo** Commands! (${client.commands.gameinfo.size})`, `${commands}`)
            .setColor(3447003)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(musicHelp);
    }

    if(args[0] === "economy") {
        const commands = client.commands.economy.map(cmd => ` \`${cmd.help.name}\``);

        const economyHelp = new Discord.MessageEmbed()
            .setTitle(':robot: | Economy Commands')
            .addField(`Here are all **Economy** Commands! (${client.commands.economy.size})`, `${commands}`)
            .setColor(3447003)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(economyHelp);
    }

    if(args[0]) {
        let command = args[0];
        if(client.commands.has(command)) {
            command = client.commands.get(command);
            const embed = new Discord.MessageEmbed()
                .setTitle(client.user.username + ' | Help')
                .addFields(
                {
                    name: 'Prefix:',
                    value: '``' + `${client.config.prefix}` + '``',
                    inline: true
                },
                {
                    name: 'Command:',
                    value: command.help.name,
                    inline: true
                },
                {
                    name: 'Usage:',
                    value: command.help.usage || "No Usage",
                    inline: true
                },
                {
                    name: 'GuildOnly:',
                    value: command.help.guildOnly,
                    inline: true
                },
                {
                    name: 'NSFW:',
                    value: command.help.nsfw,
                    inline: true
                },
                {
                    name: 'OwnerOnly:',
                    value: command.help.ownerOnly,
                    inline: true
                },
                {
                    name: 'Description:',
                    value: command.help.description || "No Description",
                    inline: true
                },
                {
                    name: 'Permissions:',
                    value: command.help.permissions || "No Permissions",
                    inline: false
                },
                )
                .setColor(3447003)
                .setTimestamp()
                .setFooter(client.config.copyright);
            message.channel.send(embed);
        }
    }
};

module.exports.help = {
    name: "help",
    usage: "help <command>",
    description: "",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};