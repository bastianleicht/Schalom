/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require('discord.js');
const economyHelper = require(__BASE__ + '/utils/helper/economyHelper');
const errorHandler  = require(__BASE__ + '/utils/handler/error');

module.exports.run = async (client, message, args) => {

    const item = args.join(" ");

    if(!item) {
        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setColor("#FF0000")
            .setDescription('❌ Enter an item to buy')
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.channel.send(embed);
    }

    client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], (error, { length }) => {
        if (error || !length) {
            // User does not exist in DB
            client.db.query(`INSERT INTO economy (userid) values (?)`, [message.author.id], (error, {insertId}) => {
                if (error) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!\n ${error}`);
                if (!insertId) return errorHandler.mysql(`Error while inserting User : "${message.author.id}"!`);

                client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], function (error, rows) {
                    if (error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

                    const money = rows[0].money;
                    const house = rows[0].house;
                    const car   = rows[0].car;

                    if(item === 'house') {
                        if(parseInt(house) < 1) {
                            let embed = new Discord.MessageEmbed()
                                .setTitle('💰 Economy')
                                .setColor("#FF0000")
                                .setDescription(`❌ You don't have a Car to sell!`)
                                .setTimestamp()
                                .setFooter(client.config.copyright);
                            return message.channel.send(embed);
                        }

                        const remove = parseInt(house) - 1;
                        const add = parseInt(money) + 2000;
                        economyHelper.updateMoney(message.author.id, add, client.db);
                        economyHelper.setValue(message.author.id, 'house', remove, client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`✅ Sold a House for 2000 Coins.`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);

                    } else if(item === 'car') {
                        if(parseInt(car) < 1) {
                            let embed = new Discord.MessageEmbed()
                                .setTitle('💰 Economy')
                                .setColor("#FF0000")
                                .setDescription(`❌ You don't have a Car to sell!`)
                                .setTimestamp()
                                .setFooter(client.config.copyright);
                            return message.channel.send(embed);
                        }

                        const remove = parseInt(car) - 1;
                        const add = parseInt(money) + 1000;
                        economyHelper.updateMoney(message.author.id, add, client.db);
                        economyHelper.setValue(message.author.id, 'car', remove, client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setColor(0x8e44ad)
                            .setDescription(`✅ Sold a Car For 1000 Coins.`)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    }
                });
            });
        } else {
            // User exists in DB
            client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], function (error, rows) {
                if (error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

                const money = rows[0].money;
                const house = rows[0].house;
                const car   = rows[0].car;

                if(item === 'house') {
                    if(parseInt(house) < 1) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setColor("#FF0000")
                            .setDescription(`❌ You don't have a Car to sell!`)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    }

                    const remove = parseInt(house) - 1;
                    const add = parseInt(money) + 2000;
                    economyHelper.updateMoney(message.author.id, add, client.db);
                    economyHelper.setValue(message.author.id, 'house', remove, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`✅ Sold a House for 2000 Coins.`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    return message.channel.send(embed);

                } else if(item === 'car') {
                    if(parseInt(car) < 1) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setColor("#FF0000")
                            .setDescription(`❌ You don't have a Car to sell!`)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    }

                    const remove = parseInt(car) - 1;
                    const add = parseInt(money) + 1000;
                    economyHelper.updateMoney(message.author.id, add, client.db);
                    economyHelper.setValue(message.author.id, 'car', remove, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setColor(0x8e44ad)
                        .setDescription(`✅ Sold a Car For 1000 Coins.`)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    return message.channel.send(embed);
                }
            });
        }
    });
};
  
module.exports.help = {
    name: "sell",
    usage: "sell <nikes, car, mansion>",
    description: "",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};