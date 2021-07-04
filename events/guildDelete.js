/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */

module.exports = async (client, guild) => {
    console.log(`${client.date} | ${client.user.username} just left a guild! \nGuild Name: '${guild.name}' \nGuild ID: '${guild.id}' \nGuild Member-Count: '${guild.memberCount}'!`);
};