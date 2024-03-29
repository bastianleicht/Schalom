/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const {MessageEmbed} = require('discord.js');
const cherio = require('cherio');
const request = require('request');
const sendError = require(__BASE__ + '/utils/sendError');

module.exports.run = async (client, message, args) => {
    if (message.channel.type !== 'dm' && !message.channel.nsfw) {
        await message.delete().catch(O_o => {
        });
        return sendError(':underage: | NSFW Command', 'Please switch to NSFW channel in order to use this command.', message.channel);
    }

    //  All the used subreddits
    let reddit = [
        "JapaneseUncensored",
        "JapaneseHotties",
        "japanpornstars",
        "AsiansGoneWild",
        "nextdoorasians",

    ];

    //  Just getting a random one
    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    //  Just some logging
    // console.log(subreddit);

    //  Doing the request to the selected subreddit
    request(`https://www.redditery.com/load.php?r=${subreddit}`, (err, resp, html) => {

        if (!err && resp.statusCode === 200) {

            //  Just some logging
            // console.log("Request was success ");

            //  Loading the html of the page
            const $ = cherio.load(html);

            //  Some arrays with Links and emojis
            let links = [];
            let emojis = ['🍆', '💦', '🍑', '😏', '💋', '🍌'];

            //  Searching the html for Images
            $("img").each((index, image) => {
                let img = $(image).attr('src');
                links.push(img);
            });

            //  Getting a random Image and a random Emoji
            let selected = links[Math.floor(Math.random() * links.length)];
            let emoji = emojis[Math.floor(Math.random() * emojis.length)];

            //  The Discord Embed
            const embed = new MessageEmbed()
                .setTitle("Here is your japanese image ... :eyes:")
                .setDescription(`[Link if you don't see image](${selected})`)
                .setImage(selected)
                .setColor(0x8e44ad)
                .setFooter(`Requested by ${message.author.username} ${emoji} • From: r/${subreddit}`);
            message.channel.send(embed);

            //  Just some logging
            // console.log(selected);

        } else {
            //  Just some logging
            // console.log("Request Failed ");

            //  The Discord Embed
            return sendError(':warning: | Error', `**Request Failed**\nPlease ask <@${client.config.owner}> to check the logs!`, message.channel);
        }

    });
};

module.exports.help = {
    name: "japanese",
    usage: "japanese",
    description: "Sends a (nsfw) japanese image.",
    permissions: "",
    guildOnly: false,
    nsfw: true,
    ownerOnly: false,
};