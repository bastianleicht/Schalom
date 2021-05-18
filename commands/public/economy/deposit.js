/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require("discord.js");
const economyHelper = require(__BASE__ + '/utils/helper/economyHelper');
const errorHandler  = require(__BASE__ + '/utils/handler/error');

module.exports.run = async (client, message, args) => {

    const amount = args.join(" ");

    if (!amount) {
        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`❌ Specify an amount to deposit!`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.channel.send(embed);
    }

    if (message.content.includes('-')) {
        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`❌ You can't deposit negative money!`)
            .setColor('#FF0000')
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

                    if(money === 0) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription("❌ You don't have any money to deposit!")
                            .setColor('#FF0000')
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    }

                    if(amount === 'all') {
                        const add = parseInt(money) + parseInt(bank);
                        economyHelper.updateMoney(message.author.id, '0', client.db);
                        economyHelper.updateBank(message.author.id, add, client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`✅ You have deposited all your coins into your bank.`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        message.channel.send(embed);
                    } else {
                        if (parseInt(money) < amount) {
                            let embed = new Discord.MessageEmbed()
                                .setTitle('💰 Economy')
                                .setDescription(`❌ You don't have that much money!`)
                                .setColor('#FF0000')
                                .setTimestamp()
                                .setFooter(client.config.copyright);
                            return message.channel.send(embed);
                        }

                        const remove = parseInt(money) - amount;
                        const add = parseInt(bank) + parseInt(amount);
                        economyHelper.updateMoney(message.author.id, remove, client.db);
                        economyHelper.updateBank(message.author.id, add, client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`✅ You have deposited ${amount} coins into your bank.`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        message.channel.send(embed);
                    }
                });
            });

        } else {
            // User exists in DB
            client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], function (error, rows) {
                if (error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

                const money = rows[0].money;
                const bank  = rows[0].bank;

                if(money === 0) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription("❌ You don't have any money to deposit!")
                        .setColor('#FF0000')
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    return message.channel.send(embed);
                }

                if(amount === 'all') {
                    const add = parseInt(money) + parseInt(bank);
                    economyHelper.updateMoney(message.author.id, '0', client.db);
                    economyHelper.updateBank(message.author.id, add, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`✅ You have deposited all your coins into your bank.`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(embed);
                } else {
                    if (parseInt(money) < amount) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`❌ You don't have that much money!`)
                            .setColor('#FF0000')
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    }

                    const remove = parseInt(money) - amount;
                    const add = parseInt(bank) + parseInt(amount);
                    economyHelper.updateMoney(message.author.id, remove, client.db);
                    economyHelper.updateBank(message.author.id, add, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`✅ You have deposited ${amount} coins into your bank.`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(embed);
                }
            });
        }
    });
};

module.exports.help = {
    name: "deposit",
    usage: "deposit <all, amount>",
    description: "",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};