/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');
const db = require('quick.db');

//TODO: Huge bugfixes with the DB. Maybe change to MYSQL?

module.exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setDescription(`**Input a Leaderboard Option**\n\nCoin Leaderboard: m!leaderboard coins\nFresh Nikes Leaderboard: m!leaderboard nikes\nCar Leaderboard: m!leaderboard car\nMansion Leaderboard: m!leaderboard mansion`)
      .setColor("#FFFFFF");

  if(!args[0]) return message.channel.send(embed);

    if (args[0] === 'coins') {
    let money = db.startsWith(`money_${message.guild.id}`, { sort: '.data'});
    let content = "";

    for (let i = 0; i < money.length; i++) {
        let user = client.users.get(money[i].ID.split('_')[2]).username;
        content += `${i+1}. ${user} ~ ${money[i].data}\n`;
      }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Coin Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF");

    message.channel.send(embed);
  } else if(args[0] === 'nikes') {
    let nike = db.startsWith(`nikes_${message.guild.id}`, { sort: '.data'});
    let content = "";

    for (let i = 0; i < nike.length; i++) {
        let user = client.users.get(nike[i].ID.split('_')[2]).username;
        content += `${i+1}. ${user} ~ ${nike[i].data}\n`;
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Fresh Nikes Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF");

    message.channel.send(embed);
  } else if(args[0] === 'car') {
    let cars = db.startsWith(`car_${message.guild.id}`, { sort: '.data'});
    let content = "";

    for (let i = 0; i < cars.length; i++) {
        let user = client.users.get(cars[i].ID.split('_')[2]).username;

        content += `${i+1}. ${user} ~ ${cars[i].data}\n`;
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Car Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF");

    message.channel.send(embed);
  } else if(args[0] === 'mansion') {
    let mansions = db.startsWith(`house_${message.guild.id}`, { sort: '.data'});
    let content = "";

    for (let i = 0; i < mansions.length; i++) {
        let user = client.users.get(mansions[i].ID.split('_')[2]).username;

        content += `${i+1}. ${user} ~ ${mansions[i].data}\n`;
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Mansion Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF");

    message.channel.send(embed);
  }

};

module.exports.help = {
  name: "leaderboard",
  usage: "leaderboard <board>",
  description: "",
  permissions: "",
  guildOnly: false,
  nsfw: false,
  ownerOnly: false,
};