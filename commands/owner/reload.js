/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(message.author.id !== client.config.owner) return;

    if(!args[0]) return message.channel.send("Please provide a command to reload!");
    let commandName = args[0].toLowerCase();

    try {
        delete require.cache[require.resolve(`./commands/${commandName}.js`)];
        client.commands.delete(commandName);
        const pull = require(`./commands/${commandName}.js`);
        client.commands.set(commandName, pull);
    } catch(e) {
        return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``);
    }

    message.channel.send(`The Command \`${args[0].toUpperCase()}\` has been reloaded!`);

};

module.exports.help = {
    name: "reload",
    usage: "reload <command>",
    description: "Reloads the specified Command. (dir/command)",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: true,
};