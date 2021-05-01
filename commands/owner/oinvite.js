/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(message.author.id !== client.config.owner) return;
    //TODO Working

    if (!message.guild) {
        const getGuild = client.guilds.cache.get(args.guild);
        const toInv = getGuild.channels.cache.first();

        const invite = toInv.createInvite({
            maxAge: 120,
            maxUses: 1
        }).then(async invite => {
            await message.author.send(`Here's the invite link to **${getGuild.name}**!\n${invite}`);
        }).catch(console.error);

    } else {
        const getGuild = this.client.guilds.get(args.guild);
        const toInv = getGuild.channels.first();

        const invite = toInv.createInvite({
            maxAge: 120,
            maxUses: 1
        }).then(async invite => {
            await message.author.send(`Here's the invite link to **${getGuild.name}**!\n${invite}`);
            message.channel.send('✅ | I\'ve sent the invite link to your DMs!');
        }).catch(console.error);
    }

};

module.exports.help = {
    name: "oinvite",
    usage: "oinvite <id>",
    description: "Generates an Invite link to the mentioned Guild.",
    permissions: "",
    guildOnly: true,
    nsfw: false,
    ownerOnly: true,
};