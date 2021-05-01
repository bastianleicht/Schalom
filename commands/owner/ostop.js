/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (message.author.id !== client.config.owner) return;

    try {
        await message.channel.send("Bot is shutting down!");
        process.exit();
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`);
    }

};

exports.help = {
    name: "ostop",
    usage: "ostop",
    description: "Stop's the Bot.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: true,
};