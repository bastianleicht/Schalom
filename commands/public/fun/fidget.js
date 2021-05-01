/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
// jshint multistr: true 
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    try {
        const embed = new Discord.MessageEmbed()
            .setTitle("Fidget Spinner")
            .setDescription(`<@${message.author.id}> is spinning a fidget spinner...`)
            .setImage('https://cdn.bastianleicht.de/etc/schalom/fidget.gif')
            .setFooter(client.config.copyright);

        let spinning = await message.channel.send(embed);

        let timeout = (Math.random() * (60 - 5 + 1)) + 5;
        const embed2 = new Discord.MessageEmbed()
            .setTitle("Fidget Spinner")
            .setDescription(`<@${message.author.id}>, you spinned the fidget spinner for ${timeout.toFixed(2)} seconds.`)
            .setFooter(client.config.copyright);

        setTimeout(() => {
            spinning.edit(embed2).catch(e => {
                console.log.error(e);
            });
        }, timeout * 1000);
    } catch (e) {
        console.log.error(e);
    }

};

module.exports.help = {
    name: "fidget",
    usage: "fidget",
    description: "Allows you to spin a Fidget Spinner.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};