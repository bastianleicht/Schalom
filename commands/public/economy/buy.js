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
                    const bank  = rows[0].bank;
                    const house = rows[0].house;
                    const car   = rows[0].car;
                    const rank  = rows[0].rank;

                    if(money === 0 && bank === 0) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription("❌ You don't have any money to buy something!")
                            .setColor('#FF0000')
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    }

                    if(item === 'house') {
                        if(parseInt(money) < 3500) {
                            let embed = new Discord.MessageEmbed()
                                .setTitle('💰 Economy')
                                .setDescription(`❌ You need 3500 coins to purchase a House!`)
                                .setColor(0x8e44ad)
                                .setTimestamp()
                                .setFooter(client.config.copyright);
                            return message.channel.send(embed);
                        }

                        const remove = parseInt(money) - 3500;
                        const add = parseInt(house) + 1;
                        economyHelper.updateMoney(message.author.id, remove, client.db);
                        economyHelper.setValue(message.author.id, 'house', add, client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`✅ Purchased a House for 3500 Coins`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    } else if(item === 'car') {
                        if(parseInt(money) < 2000) {
                            let embed = new Discord.MessageEmbed()
                                .setTitle('💰 Economy')
                                .setDescription(`❌ You need 2000 coins to purchase a Car!`)
                                .setColor(0x8e44ad)
                                .setTimestamp()
                                .setFooter(client.config.copyright);
                            return message.channel.send(embed);
                        }

                        const remove = parseInt(money) - 2000;
                        const add = parseInt(car) + 1;
                        economyHelper.updateMoney(message.author.id, remove, client.db);
                        economyHelper.setValue(message.author.id, 'car', add, client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`✅ Purchased a Car for 2000 Coins`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    } else if(item === 'rank') {
                        if(parseInt(money) < 30000) {
                            let embed = new Discord.MessageEmbed()
                                .setTitle('💰 Economy')
                                .setDescription(`❌ You need 30000 coins to purchase VIP!`)
                                .setColor(0x8e44ad)
                                .setTimestamp()
                                .setFooter(client.config.copyright);
                            return message.channel.send(embed);
                        }

                        if(rank === 'VIP') {
                            let embed = new Discord.MessageEmbed()
                                .setTitle('💰 Economy')
                                .setDescription(`❌ You already bought VIP!`)
                                .setColor(0x8e44ad)
                                .setTimestamp()
                                .setFooter(client.config.copyright);
                            return message.channel.send(embed);
                        }

                        const remove = parseInt(money) - 30000;
                        economyHelper.updateMoney(message.author.id, remove, client.db);
                        economyHelper.setValue(message.author.id, 'rank', 'VIP', client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`✅ Purchased VIP for 30000 Coins`)
                            .setColor(0x8e44ad)
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
                const bank  = rows[0].bank;
                const house = rows[0].house;
                const car   = rows[0].car;
                const rank  = rows[0].rank;

                if(money === 0 && bank === 0) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription("❌ You don't have any money to buy something!")
                        .setColor('#FF0000')
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    return message.channel.send(embed);
                }

                if(item === 'house') {
                    if(parseInt(money) < 3500) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`❌ You need 3500 coins to purchase a House!`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    }

                    const remove = parseInt(money) - 3500;
                    const add = parseInt(house) + 1;
                    economyHelper.updateMoney(message.author.id, remove, client.db);
                    economyHelper.setValue(message.author.id, 'house', add, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`✅ Purchased a House for 3500 Coins`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    return message.channel.send(embed);
                } else if(item === 'car') {
                    if(parseInt(money) < 2000) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`❌ You need 2000 coins to purchase a Car!`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    }

                    const remove = parseInt(money) - 2000;
                    const add = parseInt(car) + 1;
                    economyHelper.updateMoney(message.author.id, remove, client.db);
                    economyHelper.setValue(message.author.id, 'car', add, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`✅ Purchased a Car for 2000 Coins`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    return message.channel.send(embed);
                } else if(item === 'rank') {
                    if(parseInt(money) < 30000) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`❌ You need 30000 coins to purchase VIP!`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    }

                    if(rank === 'VIP') {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`❌ You already bought VIP!`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    }

                    const remove = parseInt(money) - 30000;
                    economyHelper.updateMoney(message.author.id, remove, client.db);
                    economyHelper.setValue(message.author.id, 'rank', 'VIP', client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`✅ Purchased VIP for 30000 Coins`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    return message.channel.send(embed);
                }
            });
        }
    });
};

module.exports.help = {
    name: "buy",
    usage: "buy <item>",
    description: "Buys the specified Item.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};