/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');
const osu = require('node-osu');
const sendError = require('./../../../utils/error');

module.exports.run = async (client, message, args) => {
    let osuApi = new osu.Api(client.config.api.osu, {
        notFoundAsError: false,
        completeScores: false
    });

    let query = message.content.split(/\s+/g).slice(1).join(" ");
    if (!query) return sendError('OSU | Error','Please provide me a user to search for!', message.channel);

    try {
        osuApi.getUser({
            u: query
        }).then(user => {
            if (!user.name) return sendError('OSU | Error',`The user **${query}** was not found!`, message.channel);

            const embed = new Discord.MessageEmbed()
                .setTitle('OSU | Stats')
                //.setAuthor(user.name, `https://a.ppy.sh/${user.id}`)      // If some more info is needed
                .addField('❯\u2000\Stats', `•\u2000\**Level:** ${user.level}\n\•\u2000\**Play Count:** ${user.counts.plays}\n\•\u2000\**Accuracy:** ${user.accuracyFormatted}`, true)
                .addField('❯\u2000\PP', `•\u2000\**Raw:** ${user.pp.raw} PP\n\•\u2000\**Rank:** ${user.pp.rank}\n\•\u2000\**Country Rank:** ${user.pp.countryRank} ${user.country}`, true)
                .addField('❯\u2000\Scores', `•\u2000\**Ranked:** ${user.scores.ranked}\n\•\u2000\**Total:** ${user.scores.total}`, true)
                .addField('❯\u2000\Map Ranks', `•\u2000\**SS:** ${user.counts.SS}\n\•\u2000\**S:** ${user.counts.S}\n\•\u2000\**A:** ${user.counts.A}`, true)
                .setThumbnail(`https://a.ppy.sh/${user.id}`)
                .setColor('#ff66aa')
                .setImage(`https://lemmmy.pw/osusig/sig.php?colour=bpink&uname=${query}&countryrank&darkheader&darktriangles&avatarrounding=10`)
                .setTimestamp()
                .setFooter(client.config.copyright);
            return message.channel.send(embed);
        }).catch(err => {
            console.log(err);
            return sendError('OSU | Error',`The user **${query}** was not found!`, message.channel);
        });

    } catch (err) {
        return sendError('OSU | Error', 'Something went wrong while executing that function!\n Here is the Error:' + err, message.channel);
    }
};

module.exports.help = {
   name: "osu",
    usage: "osu <username>",
    description: "Sends some API Information of the user.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};