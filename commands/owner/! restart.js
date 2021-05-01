/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');
const config = require('../../opt/config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    if (message.author.id !== config.owner) return;

    message.channel.send('Restarting...');
    client.destroy().then(() => client.login(config.token));
};

module.exports.help = {
    name: "restart",
    usage: "restart",
    description: "Restart's the Bot.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: true,
};