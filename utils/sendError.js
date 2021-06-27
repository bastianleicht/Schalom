/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const { MessageEmbed } = require("discord.js");
const config = require(__BASE__ + '/opt/config.json');

/**
 * @param title     The Title of the Message
 * @param text      Displayed Text in the Error Message
 * @param channel   The Channel the message should be send in.
 * @returns {Promise<void>}
 */
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