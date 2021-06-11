/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const {MessageEmbed} = require('discord.js');
const cherio = require('cherio');
const request = require('request');
const sendError = require('./../../../utils/error');

module.exports.run = async (client, message, args) => {
    if (message.channel.type !== 'dm' && !message.channel.nsfw) {
        await message.delete().catch(O_o => {
        });
        return sendError(':underage: | NSFW Command', 'Please switch to NSFW channel in order to use this command.', message.channel);
    }

    //  All the used subreddits
    let reddit = [
        "CumHentai",
        "3DPorncraft",
        "yiff",
        "traphentai",
        "hentaibondage",
        "HentaiSource",
        "thick_hentai",
        "WesternHentai",
        "hentai_irl",
        "funpiece",
        "hentai",
        "AnimeMILFS",
        "futanari",
        "gangbanghentai",
        "IWantToBeHerHentai",
        "FreeuseHentai",
        "HelplessHentai",
        "Hentai4Everyone",
        "hentaihaven",

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
                var img = $(image).attr('src');
                links.push(img);
            });

            //  Getting a random Image and a random Emoji
            let selected = links[Math.floor(Math.random() * links.length)];
            let emoji = emojis[Math.floor(Math.random() * emojis.length)];

            //  The Discord Embed
            const embed = new MessageEmbed()
                .setTitle("Here is your Hentai image ... :eyes:")
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
    name: "hentai",
    usage: "hentai",
    description: "Sends a (nsfw) hentai image.",
    permissions: "",
    guildOnly: false,
    nsfw: true,
    ownerOnly: false,
};