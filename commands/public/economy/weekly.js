/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {

    let user = message.author;
    let timeout = 604800000;
    let amount = 500;
    let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

    if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
        let time = ms(timeout - (Date.now() - weekly));
        let timeEmbed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`❌ You have already collected your weekly reward\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `)
            .setColor("#FF0000")
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(timeEmbed);

    } else {
        let moneyEmbed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`✅ You've collected your weekly reward of ${amount} coins`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(moneyEmbed);
        db.add(`money_${message.guild.id}_${user.id}`, amount);
        db.set(`weekly_${message.guild.id}_${user.id}`, Date.now());
    }
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