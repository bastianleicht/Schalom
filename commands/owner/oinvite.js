/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */

module.exports.run = async (client, message, args) => {
    if(message.author.id !== client.config.owner) return;
    const guildID = args.join(" ");

    if (!message.guild) {
        console.log('test');
        const getGuild = client.guilds.cache.get(guildID);
        const toInv = getGuild.channels.cache.first();

        const invite = toInv.createInvite({
            maxAge: 120,
            maxUses: 1
        }).then(async invite => {
            await message.author.send(`Here's the invite link to **${getGuild.name}**!\n${invite}`);
        }).catch(console.error).then(msg => {
            msg.delete({ timeout: 10000 });         // Deletes Message after 10seconds
        }).catch(console.error);                    // Logs the error if there is one

    } else {
        const getGuild = client.guilds.cache.get(guildID);
        const toInv = getGuild.channels.cache.first();

        const invite = toInv.createInvite({
            maxAge: 120,
            maxUses: 1
        }).then(async invite => {
            await message.author.send(`Here's the invite link to **${getGuild.name}**!\n${invite}`);
            message.channel.send('✅ | I\'ve sent the invite link to your DMs!').then(msg => {
                msg.delete({ timeout: 10000 });         // Deletes Message after 10seconds
            }).catch(console.error);                    // Logs the error if there is one
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