/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require("discord.js");
const errorHandler  = require(__BASE__ + '/utils/handler/error');

module.exports.run = async (client, message, args) => {

    let user = message.mentions.users.first() || message.author;

    client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], (error, { length }) => {
        if (error || !length) {
            // User does not exist in DB
            client.db.query(`INSERT INTO economy (userid) values (?)`, [message.author.id], (error, {insertId}) => {
                if (error) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!\n ${error}`);
                if (!insertId) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!`);

                client.db.query('SELECT * FROM economy WHERE userID = ?', [user.id], function (error, rows) {
                    if (error) return errorHandler.mysql(`Error while querying the money for User : "${user.id}"!\n ${error}`);
                    let balance = 0;
                    let bank = 0;

                    if(rows.length > 0) {
                        balance = rows[0].money;
                        bank = rows[0].bank;
                    }

                    let moneyEmbed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`**${user}'s Balance**\n\nPocket: ${balance}\nBank: ${bank}`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(moneyEmbed);

                });
            });
        } else {
            // User exists in DB
            client.db.query('SELECT * FROM economy WHERE userID = ?', [user.id], function (error, rows) {
                if (error) return errorHandler.mysql(`Error while querying the money for User : "${user.id}"!\n ${error}`);
                let balance = 0;
                let bank = 0;

                if(rows.length > 0) {
                    balance = rows[0].money;
                    bank = rows[0].bank;
                }

                let moneyEmbed = new Discord.MessageEmbed()
                    .setTitle('💰 Economy')
                    .setDescription(`**${user}'s Balance**\n\nPocket: ${balance}\nBank: ${bank}`)
                    .setColor(0x8e44ad)
                    .setTimestamp()
                    .setFooter(client.config.copyright);
                message.channel.send(moneyEmbed);

            });
        }
    });
};

module.exports.help = {
    name: "balance",
    usage: "balance (<User>)",
    description: "Shows your Balance or the balance of the mentioned User.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};