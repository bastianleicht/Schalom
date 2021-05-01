/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
// jshint multistr: true 
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports.run = async (client, message, args) => {
    if (message.channel === 'dm') return;

    if(!message.mentions.members.first()) {
        const embed = new MessageEmbed()
            .setTitle(':warning: | Error')
            .addField('**Invalid Command Syntax!** Please use:', `${client.config.prefix}hug <Member>`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        return message.member.send(embed);
    } else {
        const url = 'https://some-random-api.ml/animu/hug';

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error occurred!`);
        }

        const embed = new MessageEmbed()
            .setTitle('Hug ❤')
            .setDescription(`<@${message.author.id}> hugs <@${message.mentions.users.first().id || message.mentions.members.first()}>`)
            .setImage(data.link)
            .setColor(3447003)
            .setTimestamp()
            .setFooter(client.config.copyright);

        await message.channel.send(embed);
    }
    
};

module.exports.help = {
    name: "hug",
    usage: "hug @user",
    description: "Hug's a User for you!",
    permissions: "",
    guildOnly: true,
    nsfw: false,
    ownerOnly: false,
};