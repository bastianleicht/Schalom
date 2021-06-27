/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const { MessageEmbed } = require("discord.js");
const config = require(__BASE__ + '/opt/config.json');

module.exports = async (title, text, channel) => {
    let embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(text)
        .setColor("RED")
        .setTimestamp()
        .setFooter(config.copyright);
    await channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 });         // Deletes Message after 10seconds
    }).catch(console.error);                    // Logs the error if there is one
};