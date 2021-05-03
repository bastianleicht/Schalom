/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require("discord.js");
const economyHelper = require('./../../../utils/helper/economyHelper');
const errorHandler = require('./../../../utils/handler/error');

module.exports.run = async (client, message, args) => {

    let user = message.mentions.members.first() || message.author;
    await economyHelper.checkUser(user.id, client.db);

    client.db.query('SELECT * FROM economy WHERE userID = ?', [user.id], function (error, rows) {
        if(error) return errorHandler.mysql(`Error while querying the money for User : "${user_id}"!\n ${error}`);


        const balance = rows[0].money;
        const bank = rows[0].bank;

        let moneyEmbed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`**${user}'s Balance**\n\nPocket: ${balance}\nBank: ${bank}`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(moneyEmbed);

    });
};

module.exports.help = {
    name: "balance",
    usage: "balance (<User>)",
    description: "Shows your Balance or the balance of the mentioned User.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};