/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const sendError = require('./../../../utils/error');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    const baseUrl = "https://corona.lmao.ninja/v2";
    let url, response, corona;

    try {
        url = args[0] ? `${baseUrl}/countries/${args[0]}`:`${baseUrl}/all`;
        response = await axios.get(url);
        corona = response.data;
    } catch (error) {
        return sendError('Corona | Error', `***${args[0]}*** doesn't exist, or data isn't being collected!`, message.channel);
    }

    const embed = new MessageEmbed()
        .setTitle(args[0] ? `${args[0].toUpperCase()} Stats` : 'Total Corona Cases World Wide')
        .setThumbnail(args[0] ? corona.countryInfo.flag : 'https://cdn.bastianleicht.de/etc/schalom/corona.gif')
        .addFields(
            {
                name: 'Total Cases:',
                value: corona.cases.toLocaleString(),
                inline: true
            },
            {
                name: 'Total Deaths:',
                value: corona.deaths.toLocaleString(),
                 inline: true
            },
            {
                name: 'Total Recovered:',
                value: corona.recovered.toLocaleString(),
                inline: true
            },
            {
                name: 'Active Cases:',
                value: corona.active.toLocaleString(),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true
            },
            {
                name: 'Critical Cases:',
                value: corona.critical.toLocaleString(),
                inline: true
            },
            {
                name: 'Today Recoveries:',
                value: corona.todayRecovered.toLocaleString().replace("-", ""),
                inline: true
            },
            {
                name: 'Todays Deaths:',
                value: corona.todayDeaths.toLocaleString(),
                inline: true
            })
        .setColor(3447003)
        .setTimestamp()
        .setFooter(client.config.copyright);
    await message.channel.send(embed);
};

module.exports.help = {
    name: "corona",
    usage: "corona <country>",
    description: "Shows you the current corona numbers.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};