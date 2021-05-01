/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const Discord = require('discord.js');
const _ = require('lodash');
const { GetStatBySteamId } = require('../../../utils/csgo_matches');
//TODO: Rework with that weird "_"

module.exports.run = async (client, message, args) => {

  const steam_id = args[0];
  if (!/^[0-9]/.test(steam_id)) {
    const embed = new Discord.MessageEmbed()
      .setTitle('CSGO Stats | Error')
      .setDescription(`This is not a valid Steam ID!`)
      .setColor('#FF0000')
      .setTimestamp()
      .setFooter(client.config.copyright);
    return message.channel.send(embed);

  } else {
    return GetStatBySteamId(steam_id)
      .then(data => {
        const { stats, achievements, steamID } = data.playerstats;

        const total_wins = _.find(stats, { name: 'total_matches_won' }).value;
        const total_kills_headshot = _.find(stats, { name: 'total_kills_headshot' }).value;
        const total_mvp = _.find(stats, { name: 'total_mvps' }).value;
        const total_planted_bombs = _.find(stats, { name: 'total_planted_bombs' }).value;
        const total_rescued_hostages = _.find(stats, { name: 'total_rescued_hostages' }).value;
        const total_weapons_donated = _.find(stats, { name: 'total_weapons_donated' }).value;
        const total_time_played = _.find(stats, { name: 'total_time_played' }).value;
        const total_matches_played = _.find(stats, { name: 'total_matches_played' }).value;
        const total_matches_won = _.find(stats, { name: 'total_matches_won' }).value;
        // total_kills_ak47
        // total_shots_ak47 / total_hits_ak47
        const total_ak = _.find(stats, { name: 'total_kills_ak47' }).value;
        const total_ak_accuracy = (_.find(stats, { name: 'total_hits_ak47' }).value / _.find(stats, { name: 'total_shots_ak47' }).value) * 100;
        const total_m4a1 = _.find(stats, { name: 'total_kills_m4a1' }).value;
        const total_m4a1_accuracy = (_.find(stats, { name: 'total_hits_m4a1' }).value / _.find(stats, { name: 'total_shots_m4a1' }).value) * 100;
        const total_aug = _.find(stats, { name: 'total_kills_aug' }).value;
        const total_aug_accuracy = (_.find(stats, { name: 'total_hits_aug' }).value / _.find(stats, { name: 'total_shots_aug' }).value) * 100;
        

        const embed = new Discord.MessageEmbed()
        .setTitle('CSGO Stats for ' + steamID)
        .addFields(
            {
                name: 'K/D',
                value: stats[0].value + "/" + stats[1].value,
                inline: true
            },
            {
                name: 'Ratio:',
                value: ((stats[1].value / stats[0].value) * 100).toFixed(2),
                 inline: true
            },
            {
                name: 'WinRate:',
                value: ((total_wins / _.find(stats, { name: 'total_matches_played' }).value) * 100 ).toFixed(2) + "%",
                inline: true
            },
            {
                name: 'HeadShot:',
                value: ((total_kills_headshot / stats[0].value) * 100).toFixed(2) + "%",
                inline: true
            },
            {
                name: 'MVP:',
                value: total_mvp + " times",
                inline: true
            },
            {
                name: 'Planted Bombs:',
                value: total_planted_bombs + " times",
                inline: true
            },
            {
                name: 'Rescued Hostages:',
                value: total_rescued_hostages + " times",
                inline: true
            },
            {
                name: 'Weapons donated:',
                value: total_weapons_donated + " times",
                inline: true
            },
            {
              name: 'Time played:',
              value: total_time_played + " minutes",
              inline: true
            },
            {
              name: 'Won matches:',
              value: total_matches_won + " times",
              inline: true
            },
            {
              name: 'Played matches:',
              value: total_matches_played + " times",
              inline: true
            }
            )
        .setColor(3447003)
        .setTimestamp()
        .setFooter(client.config.copyright);

        message.channel.send(embed);
      })
      .catch(error => {
        const embed = new Discord.MessageEmbed()
        .setTitle('CSGO Stats | Error')
        .setDescription(`This Profile is private or has never played CSGO!`)
        .setColor('#FF0000')
        .setTimestamp()
        .setFooter(client.config.copyright);

        message.channel.send(embed);
      });
  }
};


module.exports.help = {
    name: "csgo",
    usage: "csgo <SteamID64>",
    description: "Shows you some infos.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};