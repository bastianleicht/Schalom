/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../../../opt/config.json');

//TODO: Complete recode needed! Update to MYSQL!

module.exports.run = async (client, message, args) => {

    if (args[0] === 'bronze') {
      let embed = new Discord.MessageEmbed()
      .setTitle('💰 Economy')
      .setDescription("**Bronze Rank**\n\nBenefits: Nothing")
      .setColor(0x8e44ad)
      .setTimestamp()
      .setFooter(client.config.copyright);
      message.channel.send(embed);

    } else if(args[0] === 'nikes') {
      let embed = new Discord.MessageEmbed()
      .setTitle('💰 Economy')
      .setDescription("👟 **Fresh Nikes**\n\nBenefits: More stats at the leaderboard.")
      .setColor(0x8e44ad)
      .setTimestamp()
      .setFooter(config.copyright);
      message.channel.send(embed);
    } else if(args[0] === 'car') {
      let embed = new Discord.MessageEmbed()
      .setTitle('💰 Economy')
      .setDescription("🚗 **Car**\n\nBenefits: More stats at the leaderboard.")
      .setColor(0x8e44ad)
      .setTimestamp()
      .setFooter(config.copyright);
      message.channel.send(embed);
    } else if(args[0] === 'mansion') {
      let embed = new Discord.MessageEmbed()
      .setTitle('💰 Economy')
      .setDescription("🏠 **Mansion**\n\nBenefits: More stats at the leaderboard.")
      .setColor(0x8e44ad)
      .setTimestamp()
      .setFooter(config.copyright);
      message.channel.send(embed);
    } else {
      let embed = new Discord.MessageEmbed()
      .setTitle('💰 Economy')
      .setDescription("**VIP Ranks**\n\nBronze: 3500 Coins \n\n**Lifestyle Items**\n\nFresh Nikes: 600\nCar: 800\nMansion: 1200")
      .setColor(0x8e44ad)
      .setTimestamp()
      .setFooter(config.copyright);
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