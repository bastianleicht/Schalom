/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

    let user = message.author;

    function isOdd(num) {
        if ((num % 2) === 0) return false;
        else if ((num % 2) === 1) return true;
    }

    let colour = args[0];
    let money = parseInt(args[1]);
    let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`);

    let random = Math.floor(Math.random() * 37);

    let moneyhelp = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setDescription(`❌ Specify an amount to gamble | ${client.config.prefix}roulette <color> <amount>`)
        .setColor("#FF0000")
        .setTimestamp()
        .setFooter(client.config.copyright);

    let moneymore = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setDescription(`❌ You are betting more than you have`)
        .setColor("#FF0000")
        .setTimestamp()
        .setFooter(client.config.copyright);

    let bad_color = new Discord.MessageEmbed()
        .setTitle('💰 Economy')
        .setDescription(`❌ Specify a color | Red [1.5x] Black [2x] Green [15x]`)
        .setColor("#FF0000")
        .setTimestamp()
        .setFooter(client.config.copyright);

    if (!colour)  return message.channel.send(bad_color);
    colour = colour.toLowerCase();
    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);

    if (colour === "b" || colour.includes("black")) colour = 0;
    else if (colour === "r" || colour.includes("red")) colour = 1;
    else if (colour === "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(bad_color);

    if (random === 0 && colour === 2) { // Green
        money *= 15;
        db.add(`money_${message.guild.id}_${user.id}`, money);

        let moneyEmbed1 = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`🟩 You won ${money} coins\n\nMultiplier: 15x`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);

        message.channel.send(moneyEmbed1);
        console.log(`${message.author.tag} Won ${money} on green`);
    } else if (isOdd(random) && colour === 1) { // Red

        money = parseInt(money * 1.5);
        db.add(`money_${message.guild.id}_${user.id}`, money);

        let moneyEmbed2 = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`🟥 You won ${money} coins\n\nMultiplier: 1.5x`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(moneyEmbed2);
    } else if (!isOdd(random) && colour === 0) { // Black

        money = parseInt(money * 2);
        db.add(`money_${message.guild.id}_${user.id}`, money);

        let moneyEmbed3 = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`⬛ You won ${money} coins\n\nMultiplier: 2x`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(moneyEmbed3);
    } else { // Wrong

        db.subtract(`money_${message.guild.id}_${user.id}`, money);

        let moneyEmbed4 = new Discord.MessageEmbed()
            .setTitle('💰 Economy')
            .setDescription(`❌ You lost ${money} coins\n\nMultiplier: 0x`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
         message.channel.send(moneyEmbed4);
    }
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