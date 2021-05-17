/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const { MessageEmbed } = require("discord.js");
const IPinfo = require("node-ipinfo");
const sendError = require('./../../../utils/error');

module.exports.run =  async (client, message, args) => {
    let ipinfo = new IPinfo(client.config.api.ipinfo);

    const ip = args.join(" ");
    if(!ip) return sendError(':warning: | Error', '**Invalid Command Syntax!** Please use: \n' + `${client.config.prefix}ipinfo <IP Adress>`, message.channel);

    ipinfo.lookupIp(ip).then((IPresponse) => {
        const embed = new MessageEmbed()
            .setAuthor('IPinfo.io', 'https://ipinfo.io/static/favicon-96x96.png?v3', 'https://ipinfo.io/')
            .setTitle('IPinfo | ' + ip)
            .addField('General:', [
                `**❯ IP Address:** ${IPresponse.ip}`,
                `**❯ Hostname:** ${IPresponse.hostname}`,
                `**❯ City:** ${IPresponse.city}`,
                `**❯ Region:** ${IPresponse.region}`,
                `**❯ Postal:** ${IPresponse.postal}`,
                `**❯ Country:** ${IPresponse.country}`,
                `**❯ Location:** ${IPresponse.loc}`,
                `**❯ Organisation:** ${IPresponse.org}`,
                `**❯ Timezone:** ${IPresponse.timezone}`,
                '\u200b'
            ])
            .addField('ASN:', [
                `**❯ ASN:** ${IPresponse.asn.asn        ? 'N/A' : 'Unknown'}`,
                `**❯ Name:** ${IPresponse.asn.name      ? 'N/A' : 'Unknown'}`,
                `**❯ Domain:** ${IPresponse.asn.domain  ? 'N/A' : 'Unknown'}`,
                `**❯ Route:** ${IPresponse.asn.route    ? 'N/A' : 'Unknown'}`,
                `**❯ Type:** ${IPresponse.asn.type      ? 'N/A' : 'Unknown'}`,
                '\u200b'
            ])
            .setColor("bc2a8d")
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed);
    });
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