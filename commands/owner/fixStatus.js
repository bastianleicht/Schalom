/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require('discord.js');
const errorHandler  = require(__BASE__ + '/utils/handler/error');

module.exports.run = async (client, message, args) => {
    if (message.author.id !== client.config.owner) return;

    await client.user.setActivity(`${client.config.prefix}help | ${client.config.prefix}invite`, { type: "WATCHING" });


};

module.exports.help = {
    name: "fixStatus",
    usage: "fixStatus",
    description: "Replaces the Bot's status.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: true,
};