/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
// jshint multistr: true 
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

const subreddits = [
    'memes',
    'DeepFriedMemes',
    'bonehurtingjuice',
    'surrealmemes',
    'dankmemes',
    'meirl',
    'me_irl',
    'funny'
];

module.exports.run = async (client, message, args) => {
    const reddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    const url = `https://imgur.com/r/${reddit}/hot.json`;

    const data = await fetch(url).then(response => response.json()).then(body => body.data);
    const selected = data[Math.floor(Math.random() * data.length)];

    const embed = new MessageEmbed()
        .setTitle('Random Meme:')
        .setDescription(`[Link if you don't see image](https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')})`)
        .setImage(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`)
        .setColor(3447003)
        .setTimestamp()
        .setFooter(client.config.copyright + ` • From r/${reddit}`);

    await message.channel.send(embed);

};

module.exports.help = {
    name: "meme",
    usage: "meme",
    description: "Sends a random meme.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};