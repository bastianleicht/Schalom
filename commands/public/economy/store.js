/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    if (args[0] === 'house') {
        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription("🏠 **House**\n\nBenefits: Nothing\nPrice: 3500 Coins")
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed);

    } else if (args[0] === 'car') {
        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription("🚗 **Car**\n\nBenefits: Nothing\nPrice: 2000 Coins")
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed);
    } else if (args[0] === 'rank') {
        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription("**VIP**\n\nBenefits: Nothing\nPrice: 30000 Coins")
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed);
    } else {
        let embed = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(" **Store**\n\nItems:\nHouse: 30000 Coins\nCar: 2000 Coins\nRank: 30000 Coins")
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed);
    }

};


module.exports.help = {
    name: "store",
    usage: "store <product>",
    description: "Economy Store",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};