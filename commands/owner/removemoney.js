/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require("discord.js");
const economyHelper = require(__BASE__ + '/utils/helper/economyHelper');
const errorHandler  = require(__BASE__ + '/utils/handler/error');

module.exports.run = async (client, message, args) => {
    if (message.author.id !== client.config.owner) return;

    let user = message.mentions.users.first() || message.author;
    let amount = args[1];

    if (isNaN(args[1])) return;

    client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], (error, {length}) => {
        if (error || !length) {
            // User does not exist in DB
            client.db.query(`INSERT INTO economy (userid) values (?)`, [message.author.id], (error, {insertId}) => {
                if (error) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!\n ${error}`);
                if (!insertId) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!`);

                client.db.query('SELECT * FROM economy WHERE userID = ?', [user.id], function (error, rows) {
                    if (error) return errorHandler.mysql(`Error while querying data for User : "${user.id}"!\n ${error}`);

                    const money = rows[0].money;

                    const add = parseInt(money) - parseInt(amount);
                    economyHelper.updateMoney(user.id, add, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy | Admin')
                        .setColor(3447003)
                        .setDescription(`✅ You removed ${amount} coins from <@${user.id}>'s balance!`)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(embed);
                });
            });
        } else {
            // User exists in DB
            client.db.query(`INSERT INTO economy (userid)
                             values (?)`, [message.author.id], (error, {insertId}) => {
                if (error) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!\n ${error}`);
                if (!insertId) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!`);

                client.db.query('SELECT * FROM economy WHERE userID = ?', [user.id], function (error, rows) {
                    if (error) return errorHandler.mysql(`Error while querying data for User : "${user.id}"!\n ${error}`);

                    const money = rows[0].money;

                    const add = parseInt(money) - parseInt(amount);
                    economyHelper.updateMoney(user.id, add, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy | Admin')
                        .setColor(3447003)
                        .setDescription(`✅ You removed ${amount} coins from <@${user.id}>'s balance!`)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(embed);
                });
            });
        }
    });
};


module.exports.help = {
    name: "removemoney",
    usage: "removemoney <@user> <amount>",
    description: "Removes the specified amount from a User.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: true,
};
