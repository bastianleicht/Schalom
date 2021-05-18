/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require('discord.js');
const errorHandler  = require(__BASE__ + '/utils/handler/error');

//TODO: Need to fix the Embed because it crashes the Bot when there are not 10 Users in the DB!

module.exports.run = async (client, message, args) => {

    client.db.query('SELECT * FROM economy ORDER BY money DESC LIMIT 10', [message.author.id], function (error, rows) {
        if (error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .addField('Leaderboard:', [
                `** 1. ** <@${rows[0].userID}> (${rows[0].money} Coins)`,
                `** 2. ** <@${rows[1].userID}> (${rows[1].money} Coins)`,
                `** 3. ** <@${rows[2].userID}> (${rows[2].money} Coins)`,
                `** 4. ** <@${rows[3].userID}> (${rows[3].money} Coins)`,
                `** 5. ** <@${rows[4].userID}> (${rows[4].money} Coins)`,
                `** 6. ** <@${rows[5].userID}> (${rows[5].money} Coins)`,
                `** 7. ** <@${rows[6].userID}> (${rows[6].money} Coins)`,
                `** 8. ** <@${rows[7].userID}> (${rows[7].money} Coins)`,
                `** 9. ** <@${rows[8].userID}> (${rows[8].money} Coins)`,
                `** 10. ** <@${rows[9].userID}> (${rows[9].money} Coins)`,
                '\u200b'
            ])
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