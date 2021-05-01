/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const cherio = require('cherio');
const request = require('request');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

    const notNSFW = new MessageEmbed()
    .setTitle(':underage: | NSFW Command')
    .setDescription(`Please switch to NSFW channel in order to use this command.`)
    .setColor(0x8e44ad)
    .setTimestamp()
    .setFooter(client.config.copyright);

    if (message.channel.type !== 'dm' && !message.channel.nsfw) {
        await message.delete().catch(O_o => {});
        return message.reply(notNSFW).then(msg => {
            msg.delete({ timeout: 15000});
        }).catch(console.error);
    }

    //  All the used subreddits
    let reddit = [
        "HighResNSFW",
        "closeup",
        "NSFW_Wallpapers",
        "4k_porn",
        "4kboomer",
        "UHDnsfw",
        "nsfw_hd",
        "HighResNSFW",
        "SexyWallpapers",
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
                .setTitle("Here is your 4k image ... :eyes:")
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
            const embed = new MessageEmbed()
                .setTitle(':warning: | Error')
                .addField('**Request Failed**', `Please ask <@${client.config.owner}> to check the logs!`)
                .setColor(0x8e44ad)
                .setTimestamp()
                .setFooter(client.config.copyright);
            message.channel.send(embed);
        }

    });
};

module.exports.help = {
    name: "4k",
    usage: "4k",
    description: "Sends a (nsfw) 4k image.",
    permissions: "",
    guildOnly: false,
    nsfw: true,
    ownerOnly: false,
};