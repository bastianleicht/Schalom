/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require('discord.js');
const economyHelper = require(__BASE__ + '/utils/helper/economyHelper');
const errorHandler  = require(__BASE__ + '/utils/handler/error');
const slotItems     = ["🍇", "🍉", "🍊", "🍎", "🍓", "🍒"];

module.exports.run = async (client, message, args) => {

    let amount = parseInt(args[0]);
    let win = false;

    if (!amount) {
        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`❌ Specify an amount`)
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

                    let number = [];
                    let i;
                    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

                    if (number[0] === number[1] && number[1] === number[2]) {
                        amount *= 9;
                        win = true;
                    } else if (number[0] === number[1] || number[0] === number[2] || number[1] === number[2]) {
                        amount *= 2;
                        win = true;
                    }
                    if (win) {
                        const add = parseInt(money) + parseInt(amount);
                        economyHelper.updateMoney(message.author.id, add, client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`\n${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${amount} coins`)
                            .setColor(0x8e44ad)
                            .setTimestamp()
                            .setFooter(client.config.copyright);
                        message.channel.send(embed);

                    } else {
                        const remove = parseInt(money) - parseInt(amount);
                        economyHelper.updateMoney(message.author.id, remove, client.db);

                        let embed = new Discord.MessageEmbed()
                            .setTitle('💰 Economy')
                            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${amount} coins`)
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

                let number = [];
                let i;
                for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

                if (number[0] === number[1] && number[1] === number[2]) {
                    amount *= 9;
                    win = true;
                } else if (number[0] === number[1] || number[0] === number[2] || number[1] === number[2]) {
                    amount *= 2;
                    win = true;
                }
                if (win) {
                    const add = parseInt(money) + parseInt(amount);
                    economyHelper.updateMoney(message.author.id, add, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`\n${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${amount} coins`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(embed);

                } else {
                    const remove = parseInt(money) - parseInt(amount);
                    economyHelper.updateMoney(message.author.id, remove, client.db);

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${amount} coins`)
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
    name: "slots",
    usage: "slots <amount>",
    description: "Just a Economy Slot game",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};