/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require("discord.js");
const economyHelper = require('./../../../utils/helper/economyHelper');
const errorHandler = require('./../../../utils/handler/error');
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {

    let timeout = 604800000;
    let amount = 500;

    client.db.query('SELECT * FROM economy WHERE userID = ?', [message.author.id], function (error, rows) {
        if (error) return errorHandler.mysql(`Error while querying data for User : "${message.author.id}"!\n ${error}`);

        const weekly = rows[0].weekly;
        const money = rows[0].money;

        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = ms(timeout - (Date.now() - weekly));
            let timeEmbed = new Discord.MessageEmbed()
                .setTitle('💰 Economy')
                .setDescription(`❌ You have already collected your weekly reward!\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s.`)
                .setColor("#FF0000")
                .setTimestamp()
                .setFooter(client.config.copyright);
            message.channel.send(timeEmbed);

        } else {
            let moneyEmbed = new Discord.MessageEmbed()
                .setTitle('💰 Economy')
                .setDescription(`✅ You've collected your weekly reward of ${amount} coins!`)
                .setColor(0x8e44ad)
                .setTimestamp()
                .setFooter(client.config.copyright);
            message.channel.send(moneyEmbed);

            const add = parseInt(money) + amount;
            economyHelper.updateMoney(message.author.id, add, client.db);
            economyHelper.setValue(message.author.id, 'weekly', Date.now(), client.db);
        }
    });
};


module.exports.help = {
    name: "weekly",
    usage: "weekly",
    description: "Redeems your weekly Coins.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};