/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require("discord.js");
const economyHelper = require(__BASE__ + '/utils/helper/economyHelper');
const errorHandler  = require(__BASE__ + '/utils/handler/error');

module.exports.run = async (client, message, args) => {

    let color = args[0];
    let amount = parseInt(args[1]);
    const random = Math.floor(Math.random() * 37);
    color = color.toLowerCase();

    function isOdd(num) {
        if ((num % 2) === 0) return false;
        else if ((num % 2) === 1) return true;
    }

    if (!color) {
        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`❌ Specify a color | Red [1.5x] Black [2x] Green [15x]`)
            .setColor("#FF0000")
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.channel.send(embed);
    }

    if (!amount) {
        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`❌ Specify an amount to gamble | ${client.config.prefix}roulette <color> <amount>`)
            .setColor("#FF0000")
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

                    if (amount > money) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`❌ You are betting more than you have`)
                            .setColor("#FF0000")
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    }

                    if (color === "b" || color.includes("black")) color = 0;
                    else if (color === "r" || color.includes("red")) color = 1;
                    else if (color === "g" || color.includes("green")) color = 2;
                    else {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`❌ Specify a color | Red [1.5x] Black [2x] Green [15x]`)
                            .setColor("#FF0000")
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        return message.channel.send(embed);
                    }

                    if (random === 0 && color === 2) {
                        // Green
                        amount *= 15;
                        const add = parseInt(money) + amount;
                        economyHelper.updateMoney(message.author.id, add, client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`🟩 You won ${amount} coins\n\nMultiplier: 15x`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        message.channel.send(embed);

                    } else if (isOdd(random) && color === 1) {
                        // Red
                        amount = money * 1.5;
                        const add = parseInt(money) + parseInt(amount);
                        economyHelper.updateMoney(message.author.id, add, client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`🟥 You won ${amount} coins\n\nMultiplier: 1.5x`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        message.channel.send(embed);

                    } else if (!isOdd(random) && color === 0) {
                        // Black
                        amount = money * 2;
                        const add = parseInt(money) + parseInt(amount);
                        economyHelper.updateMoney(message.author.id, add, client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`⬛ You won ${amount} coins\n\nMultiplier: 2x`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        message.channel.send(embed);

                    } else {
                        // Wrong
                        const remove = parseInt(money) - parseInt(amount);
                        economyHelper.updateMoney(message.author.id, remove, client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`❌ You lost ${amount} coins\n\nMultiplier: 0x`)
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

                if (amount > money) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`❌ You are betting more than you have`)
                        .setColor("#FF0000")
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    return message.channel.send(embed);
                }

                if (color === "b" || color.includes("black")) color = 0;
                else if (color === "r" || color.includes("red")) color = 1;
                else if (color === "g" || color.includes("green")) color = 2;
                else {
                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`❌ Specify a color | Red [1.5x] Black [2x] Green [15x]`)
                        .setColor("#FF0000")
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    return message.channel.send(embed);
                }

                if (random === 0 && color === 2) {
                    // Green
                    amount *= 15;
                    const add = parseInt(money) + amount;
                    economyHelper.updateMoney(message.author.id, add, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`🟩 You won ${amount} coins\n\nMultiplier: 15x`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(embed);

                } else if (isOdd(random) && color === 1) {
                    // Red
                    amount = money * 1.5;
                    const add = parseInt(money) + parseInt(amount);
                    economyHelper.updateMoney(message.author.id, add, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`🟥 You won ${amount} coins\n\nMultiplier: 1.5x`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(embed);

                } else if (!isOdd(random) && color === 0) {
                    // Black
                    amount = money * 2;
                    const add = parseInt(money) + parseInt(amount);
                    economyHelper.updateMoney(message.author.id, add, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`⬛ You won ${amount} coins\n\nMultiplier: 2x`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(embed);

                } else {
                    // Wrong
                    const remove = parseInt(money) - parseInt(amount);
                    economyHelper.updateMoney(message.author.id, remove, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`❌ You lost ${amount} coins\n\nMultiplier: 0x`)
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
  name: "roulette",
  usage: "roulette <color> <amount>",
  description: "Just a Roulette Game",
  permissions: "",
  guildOnly: false,
  nsfw: false,
  ownerOnly: false,
};