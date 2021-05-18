/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require("discord.js");
const economyHelper = require(__BASE__ + '/utils/helper/economyHelper');
const errorHandler  = require(__BASE__ + '/utils/handler/error');
const ms            = require("parse-ms");

module.exports.run = async (client, message, args) => {

    const timeout = 900000;     //  15min
    const max_amount = 10;      //  Max amount to get when Begging
    const amount = (Math.random() * (max_amount - 1) + 1).toFixed(0);

    client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], (error, { length }) => {
        if (error || !length) {
            // User does not exist in DB
            client.db.query(`INSERT INTO economy (userid) values (?)`, [message.author.id], (error, {insertId}) => {
                if (error) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!\n ${error}`);
                if (!insertId) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!`);

                client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], function (error, rows) {
                    if(error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

                    const beg = rows[0].beg;
                    const money = rows[0].money;

                    if (beg !== null && timeout - (Date.now() - beg) > 0) {
                        let time = ms(timeout - (Date.now() - beg));

                        let timeEmbed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`❌ You've already begged recently!\n\nBeg again in ${time.minutes}m ${time.seconds}s `)
                            .setColor('#FF0000')
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        message.channel.send(timeEmbed);
                    } else {

                        let moneyEmbed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`✅ You've begged and received ${Number(amount)} coins`)
                            .setColor(3447003)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        message.channel.send(moneyEmbed);

                        const add = parseInt(money) + parseInt(amount);
                        economyHelper.updateMoney(message.author.id, add, client.db);
                        economyHelper.setValue(message.author.id, 'beg', Date.now(), client.db);
                    }

                });

            });
        } else {
            // User exists in DB
            client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], function (error, rows) {
                if(error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

                const beg = rows[0].beg;
                const money = rows[0].money;

                if (beg !== null && timeout - (Date.now() - beg) > 0) {
                    let time = ms(timeout - (Date.now() - beg));

                    let timeEmbed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`❌ You've already begged recently!\n\nBeg again in ${time.minutes}m ${time.seconds}s `)
                        .setColor('#FF0000')
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(timeEmbed);
                } else {

                    let moneyEmbed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`✅ You've begged and received ${Number(amount)} coins`)
                        .setColor(3447003)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(moneyEmbed);

                    const add = parseInt(money) + parseInt(amount);
                    economyHelper.updateMoney(message.author.id, add, client.db);
                    economyHelper.setValue(message.author.id, 'beg', Date.now(), client.db);
                }
            });
        }

    });
};

module.exports.help = {
    name: "beg",
    usage: "beg",
    description: "Begs for some money.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};