/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require('discord.js');
const ms            = require("parse-ms");
const economyHelper = require(__BASE__ + '/utils/helper/economyHelper');
const errorHandler  = require(__BASE__ + '/utils/handler/error');

module.exports.run = async (client, message, args) => {

    let timeout = 600000;

    client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], (error, { length }) => {
        if (error || !length) {
            // User does not exist in DB
            client.db.query(`INSERT INTO economy (userid) values (?)`, [message.author.id], (error, {insertId}) => {
                if (error) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!\n ${error}`);
                if (!insertId) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!`);

                client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], function (error, rows) {
                    if (error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

                    const work = rows[0].work;
                    const money = rows[0].money;

                    if (work !== null && timeout - (Date.now() - work) > 0) {
                        let time = ms(timeout - (Date.now() - work));

                        let timeEmbed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`❌ You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `)
                            .setColor("#FF0000")
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        message.channel.send(timeEmbed);
                    } else {

                        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic'];
                        let result = Math.floor((Math.random() * replies.length));
                        let amount = Math.floor(Math.random() * 80) + 1;

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`✅ You worked as a **${replies[result]}** and earned ${amount} coins`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        message.channel.send(embed);

                        const add = parseInt(money) + amount;
                        economyHelper.updateMoney(message.author.id, add, client.db);
                        economyHelper.setValue(message.author.id, 'work', Date.now(), client.db);
                    }
                });
            });
        } else {
            // User exists in DB
            client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], function (error, rows) {
                if (error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

                const work = rows[0].work;
                const money = rows[0].money;

                if (work !== null && timeout - (Date.now() - work) > 0) {
                    let time = ms(timeout - (Date.now() - work));

                    let timeEmbed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`❌ You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `)
                        .setColor("#FF0000")
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(timeEmbed);
                } else {

                    let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic'];
                    let result = Math.floor((Math.random() * replies.length));
                    let amount = Math.floor(Math.random() * 80) + 1;

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`✅ You worked as a **${replies[result]}** and earned ${amount} coins`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(embed);

                    const add = parseInt(money) + amount;
                    economyHelper.updateMoney(message.author.id, add, client.db);
                    economyHelper.setValue(message.author.id, 'work', Date.now(), client.db);
                }
            });
        }
    });
};



module.exports.help = {
  name: "work",
  usage: "work",
  description: "Working for Money.",
  permissions: "",
  guildOnly: false,
  nsfw: false,
  ownerOnly: false,
};
