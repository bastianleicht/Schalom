/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require('discord.js');
const errorHandler  = require(__BASE__ + '/utils/handler/error');

module.exports.run = async (client, message, args) => {
    client.db.query('SELECT * FROM economy ORDER BY money DESC LIMIT 10', [message.author.id], function (error, rows) {
        if (error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

        let board = '';
        Object.keys(rows).forEach(function (index) {
            const row = rows[index];
            board += `** ${parseInt(index) + 1}. ** <@${row.userID}> (${row.money} Coins)\n`;
        });

        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .addField('Leaderboard:', board + '\u200b')
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed);
    });
};

module.exports.help = {
    name: "leaderboard",
    usage: "leaderboard",
    description: "",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};