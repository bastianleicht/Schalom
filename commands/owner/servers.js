/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');
const ReactionMenu = require('../../utils/ReactionMenu.js');

module.exports.run = async (client, message, args) => {

    if (message.author.id !== client.config.owner) return;

    const servers = client.guilds.cache.array().map(guild => {
      return `\`${guild.id}\` - **${guild.name}** - \`${guild.memberCount}\` members`;
    });

    const embed = new Discord.MessageEmbed()
        .setTitle('Server List')
        .setColor(3447003)
        .setTimestamp()
        .setFooter(client.config.copyright);

    if (servers.length <= 10) {
      const range = (servers.length === 1) ? '[1]' : `[1 - ${servers.length}]`;
      message.channel.send(embed.setTitle(`Server List ${range}`).setDescription(servers.join('\n')));
    } else {
      new ReactionMenu(message.client, message.channel, message.author, embed, servers);
    }

};

module.exports.help = {
  name: "servers",
  usage: "servers",
  description: "Show's you an overview of the Servers this Bot is in.",
  permissions: "",
  guildOnly: false,
  nsfw: false,
  ownerOnly: true,
};