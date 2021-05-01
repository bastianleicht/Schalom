/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
// jshint multistr: true 
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, [target]) => {
    if (message.channel === 'dm') return;
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const flags = {
        DISCORD_EMPLOYEE: 'Discord Employee',
        DISCORD_PARTNER: 'Discord Partner',
        BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
        BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
        HYPESQUAD_EVENTS: 'HypeSquad Events',
        HOUSE_BRAVERY: 'House of Bravery',
        HOUSE_BRILLIANCE: 'House of Brilliance',
        HOUSE_BALANCE: 'House of Balance',
        EARLY_SUPPORTER: 'Early Supporter',
        TEAM_USER: 'Team User',
        SYSTEM: 'System',
        VERIFIED_BOT: 'Verified Bot',
        VERIFIED_DEVELOPER: 'Verified Bot Developer'
    };

    let status;
    switch (user.presence.status) {
        case "online":
            status = ":green_circle: online";
            break;
        case "dnd":
            status = ":red_circle: dnd";
            break;
        case "idle":
            status = ":yellow_circle: idle";
            break;
        case "offline":
            status = ":black_circle: offline";
            break;
    }

    function trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    }

    const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
    const userFlags = member.user.flags.toArray();
    const roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);

    const embed = new MessageEmbed()
        .setTitle(`${user.user.username}' Stats`)
        .setColor(3447003)
        .setTimestamp()
        .setFooter(client.config.copyright)
        .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
        .addFields(
            {
                name: "Name: ",
                value: user.user.username,
                inline: true
            },
            {
                name: "#️⃣ Discriminator: ",
                value: `#${user.user.discriminator}`,
                inline: true
            },
            {
                name: "🆔 ID: ",
                value: user.user.id,
            },
            {
                name: "🚩 Flags: ",
                value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
            },
            {
                name: "Current Status: ",
                value: status,
                inline: true
            },
            {
                name: "Activity: ",
                value: user.presence.activities[0] ? user.presence.activities[0].name : `User isn't playing a game!`,
                inline: true
            },
            {
                name: 'Avatar link: ',
                value: `[Click Here](${user.user.displayAvatarURL()})`
            },
            {
                name: 'Creation Date: ',
                value: user.user.createdAt.toLocaleDateString("en-us"),
                inline: true
            },
            {
                name: 'Joined Date: ',
                value: user.joinedAt.toLocaleDateString("en-us"),
                inline: true
            },
            {
                name: `Roles (${roles.length})`,
                value: roles.length < 10 ? roles.join(', ') : roles.length > 10 ? trimArray(roles) : 'None',
                // value: user.roles.cache.map(role => role.toString()).join(" ,"),
                inline: true
            }
        );

    await message.channel.send(embed).catch(console.error);
};

module.exports.help = {
    name: "userinfo",
    usage: "userinfo <@user>",
    description: "Shows you some infos of an User.",
    permissions: "",
    guildOnly: true,
    nsfw: false,
    ownerOnly: false,
};