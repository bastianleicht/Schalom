/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require("discord.js");
const ms            = require("parse-ms");
const economyHelper = require(__BASE__ + '/utils/helper/economyHelper');
const errorHandler  = require(__BASE__ + '/utils/handler/error');

module.exports.run = async (client, message, args) => {

    let timeout = 86400000;     //24h
    let amount = 200;           //

    client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], (error, { length }) => {
        if (error || !length) {
            // User does not exist in DB
            client.db.query(`INSERT INTO economy (userid) values (?)`, [message.author.id], (error, {insertId}) => {
                if (error) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!\n ${error}`);
                if (!insertId) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!`);

                client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], function (error, rows) {
                    if (error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

                    const daily = rows[0].daily;
                    const money = rows[0].money;

                    if (daily !== null && timeout - (Date.now() - daily) > 0) {
                        let time = ms(timeout - (Date.now() - daily));

                        let timeEmbed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`❌ You've already collected your daily reward!\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `)
                            .setColor('#FF0000')
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        message.channel.send(timeEmbed);

                    } else {
                        let moneyEmbed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`✅ You've collected your daily reward of ${amount} coins!`)
                            .setColor(3447003)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        message.channel.send(moneyEmbed);

                        const add = parseInt(money) + amount;
                        economyHelper.updateMoney(message.author.id, add, client.db);
                        economyHelper.setValue(message.author.id, 'daily', Date.now(), client.db);
                    }

                });
            });
        } else {
            // User exists in DB

            client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], function (error, rows) {
                if (error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

                const daily = rows[0].daily;
                const money = rows[0].money;

                if (daily !== null && timeout - (Date.now() - daily) > 0) {
                    let time = ms(timeout - (Date.now() - daily));

                    let timeEmbed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`❌ You've already collected your daily reward!\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `)
                        .setColor('#FF0000')
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(timeEmbed);

                } else {
                    let moneyEmbed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`✅ You've collected your daily reward of ${amount} coins!`)
                        .setColor(3447003)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(moneyEmbed);

                    const add = parseInt(money) + amount;
                    economyHelper.updateMoney(message.author.id, add, client.db);
                    economyHelper.setValue(message.author.id, 'daily', Date.now(), client.db);
                }

            });
        }
    });
};


module.exports.help = {
    name: "daily",
    usage: "daily",
    description: "Redeems your daily amount of Coins.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};