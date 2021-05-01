/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');
const osu = require('node-osu');
const config = require('../../../opt/config.json');

//TODO: WTF is happening here?

let osuApi = new osu.Api(config.api.osu, {
    notFoundAsError: false,
    completeScores: false
});

module.exports.run = async (client, message, args) => {

    let query = message.content.split(/\s+/g).slice(1).join(" ");

    if (!query) return message.channel.send('Please provide me a user to search for!');

    try {
        osuApi.getUser({
            u: query
        }).then(user => {

            if (!user.name) return message.channel.send(`The user **${query}** was not found!`);

            const embed = new Discord.MessageEmbed()
                .setAuthor(user.name, `https://a.ppy.sh/${user.id}`)
                .addField('❯\u2000\Stats', `•\u2000\**Level:** ${user.level}\n\•\u2000\**Play Count:** ${user.counts.plays}\n\•\u2000\**Accuracy:** ${user.accuracyFormatted}`, true)
                .addField('❯\u2000\PP', `•\u2000\**Raw:** ${user.pp.raw} PP\n\•\u2000\**Rank:** ${user.pp.rank}\n\•\u2000\**Country Rank:** ${user.pp.countryRank} ${user.country}`, true)
                .addField('❯\u2000\Scores', `•\u2000\**Ranked:** ${user.scores.ranked}\n\•\u2000\**Total:** ${user.scores.total}`, true)
                .addField('❯\u2000\Map Ranks', `•\u2000\**SS:** ${user.counts.SS}\n\•\u2000\**S:** ${user.counts.S}\n\•\u2000\**A:** ${user.counts.A}`, true)
                .setThumbnail(`https://a.ppy.sh/${user.id}`)
                .setColor('#ff66aa')
                .setImage(`https://lemmmy.pw/osusig/sig.php?colour=bpink&uname=${query}&countryrank&darkheader&darktriangles&avatarrounding=10`);
            return message.channel.send({
                embed
            });
        }).catch(err => {
            console.log(err);
            return message.channel.send(`The user **${query}** was not found!`);
        });

    } catch (err) {
        return message.channel.send('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658> Something went wrong while executing that function!');
    }
};

module.exports.help = {
   name: "osu",
    usage: "osu <username>",
    description: "Sends some API Informations of the user.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};