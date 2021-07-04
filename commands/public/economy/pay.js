/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require("discord.js");
const economyHelper = require(__BASE__ + '/utils/helper/economyHelper');
const errorHandler  = require(__BASE__ + '/utils/handler/error');

module.exports.run = async (client, message, args) => {

    let user = message.mentions.users.first();

    client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], (error, { length }) => {
        if (error || !length) {
            // User does not exist in DB
            client.db.query(`INSERT INTO economy (userid) values (?)`, [message.author.id], (error, {insertId}) => {
                if (error) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!\n ${error}`);
                if (!insertId) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!`);

                client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], function (error, rows) {
                    if (error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

                    const money = rows[0].money;

                    let embed1 = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setColor("#FFFFFF")
                        .setDescription(`❌ Mention someone to pay`)
                        .setTimestamp()
                        .setFooter(client.config.copyright);

                    if (!user) {
                        return message.channel.send(embed1);
                    }
                    let embed2 = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setColor("#FFFFFF")
                        .setDescription(`❌ Specify an amount to pay`)
                        .setTimestamp()
                        .setFooter(client.config.copyright);

                    if (!args[1]) {
                        return message.channel.send(embed2);
                    }
                    let embed3 = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setColor("#FFFFFF")
                        .setDescription(`❌ You can't pay someone negative money`)
                        .setTimestamp()
                        .setFooter(client.config.copyright);

                    if (message.content.includes('-')) {
                        return message.channel.send(embed3);
                    }
                    let embed4 = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setColor("#FFFFFF")
                        .setDescription(`❌ You don't have that much money`)
                        .setTimestamp()
                        .setFooter(client.config.copyright);

                    if (money < args[1]) {
                        return message.channel.send(embed4);
                    }

                    let embed5 = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setColor("#FFFFFF")
                        .setDescription(`✅ You have payed ${user.user.username} ${args[1]} coins`)
                        .setTimestamp()
                        .setFooter(client.config.copyright);

                    message.channel.send(embed5);

                    client.db.query('SELECT * FROM economy WHERE userID = ?', [user.id], function (error, rows) {
                        if (error) return errorHandler.mysql(`Error while querying data for User : "${user.id}"!\n ${error}`);

                        const money = rows[0].money;

                        const add = parseInt(money) + args[1];
                        economyHelper.updateMoney(user.id, add, client.db);

                    });

                    const remove = parseInt(money) - args[1];
                    economyHelper.updateMoney(message.author.id, remove, client.db);

                });
            });
        } else {
            // User exists in DB

            client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], function (error, rows) {
                if (error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

                const money = rows[0].money;

                let embed1 = new Discord.MessageEmbed()
                    .setTitle('💰 Economy')
                    .setColor("#FFFFFF")
                    .setDescription(`❌ Mention someone to pay`)
                    .setTimestamp()
                    .setFooter(client.config.copyright);

                if (!user) {
                    return message.channel.send(embed1);
                }
                let embed2 = new Discord.MessageEmbed()
                    .setTitle('💰 Economy')
                    .setColor("#FFFFFF")
                    .setDescription(`❌ Specify an amount to pay`)
                    .setTimestamp()
                    .setFooter(client.config.copyright);

                if (!args[1]) {
                    return message.channel.send(embed2);
                }
                let embed3 = new Discord.MessageEmbed()
                    .setTitle('💰 Economy')
                    .setColor("#FFFFFF")
                    .setDescription(`❌ You can't pay someone negative money`)
                    .setTimestamp()
                    .setFooter(client.config.copyright);

                if (message.content.includes('-')) {
                    return message.channel.send(embed3);
                }
                let embed4 = new Discord.MessageEmbed()
                    .setTitle('💰 Economy')
                    .setColor("#FFFFFF")
                    .setDescription(`❌ You don't have that much money`)
                    .setTimestamp()
                    .setFooter(client.config.copyright);

                if (money < args[1]) {
                    return message.channel.send(embed4);
                }

                let embed5 = new Discord.MessageEmbed()
                    .setTitle('💰 Economy')
                    .setColor("#FFFFFF")
                    .setDescription(`✅ You have payed ${user.user.username} ${args[1]} coins`)
                    .setTimestamp()
                    .setFooter(client.config.copyright);

                message.channel.send(embed5);

                client.db.query('SELECT * FROM economy WHERE userID = ?', [user.id], function (error, rows) {
                    if (error) return errorHandler.mysql(`Error while querying data for User : "${user.id}"!\n ${error}`);

                    const money = rows[0].money;

                    const add = parseInt(money) + args[1];
                    economyHelper.updateMoney(user.id, add, client.db);

                });

                const remove = parseInt(money) - args[1];
                economyHelper.updateMoney(message.author.id, remove, client.db);

            });
        }
    });

};

module.exports.help = {
    name: "pay",
    usage: "pay <user> <amount>",
    description: "Pays someone the specified amount.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};