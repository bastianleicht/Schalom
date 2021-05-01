/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

    let user = message.author;
    let member = db.fetch(`money_${message.guild.id}_${user.id}`);

    if (args[0] === 'all') {
        let money = await db.fetch(`money_${message.guild.id}_${user.id}`);

        let embed_all_err = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription("❌ You don't have any money to deposit")
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        if(money === 0) return message.channel.send(embed_all_err);

        db.add(`bank_${message.guild.id}_${user.id}`, money);
        db.subtract(`money_${message.guild.id}_${user.id}`, money);

        let embed5 = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`✅ You have deposited all your coins into your bank`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed5);

    } else {
        let embed_amount = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`❌ Specify an amount to deposit`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        if (!args[0]) return message.channel.send(embed_amount);

        let embed_negative = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`❌ You can't deposit negative money`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        if (message.content.includes('-')) return message.channel.send(embed_negative);

        let embed_poor = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`❌ You don't have that much money`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        if (member < args[0]) return message.channel.send(embed_poor);

        let embed_done = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`✅ You have deposited ${args[0]} coins into your bank`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed_done);

        db.add(`bank_${message.guild.id}_${user.id}`, args[0]);
        db.subtract(`money_${message.guild.id}_${user.id}`, args[0]);
    }
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