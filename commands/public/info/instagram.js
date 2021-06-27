/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const fetch = require("node-fetch");

module.exports.run =  async (client, message, args) => {

    const name = args.join(" ");
    if(!name) return client.sendError(':warning: | Error', '**Invalid Command Syntax!** Please use: \n' + `${client.config.prefix}instagram <username>`, message.channel);

    const url = `https://instagram.com/${name}/?__a=1`;
    let res;

    try {
        res = await fetch(url).then(url => url.json());
    } catch (e) {
        return client.sendError(':warning: | Error', 'I couldn\'t find that account... :(', message.channel);
    }

    const account = res.graphql.user;

    const embed = new MessageEmbed()
        .setTitle(account.full_name)
        .setURL(`https://instagram.com/${name}`)
        .setThumbnail(account.profile_pic_url_hd)
        .addField(
            "Profile information",
            stripIndents`**- Username:** ${account.username}
            **- Full name:** ${account.full_name}
            **- Biography:** ${account.biography.length == 0 ? "none" : account.biography}
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Followers:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Private account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`
        )
        .setColor("bc2a8d")
        .setTimestamp()
        .setFooter(client.config.copyright);
    message.channel.send(embed);
};

module.exports.help = {
    name: "instagram",
    usage: "instagram <username>",
    description: "Shows you some info about the User's Profile.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};