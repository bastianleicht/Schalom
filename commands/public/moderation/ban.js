/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
// jshint multistr: true 
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
//TODO: Rework completely

async function promptMessage (message, author, time, validReactions) {
    // We put in the time as seconds, with this it's being transfered to MS
    time *= 1000;

    // For every emoji in the function parameters, react in the good order.
    for (const reaction of validReactions) await message.react(reaction);

    // Only allow reactions from the author, 
    // and the emoji must be in the array we provided.
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

    // And ofcourse, await the reactions
    return message
        .awaitReactions(filter, {
            max: 1,
            time: time
        })
        .then(collected => collected.first() && collected.first().emoji.name);
}

module.exports.run = async (client, message, args) => {

    // const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

    if (message.deletable) message.delete();

    // No args
    if (!args[0]) {
        return message.reply("Please provide a person to ban.").then(msg => {msg.delete({ timeout: 10000 });}).catch(console.error);
    }

    // No reason
    if (!args[1]) {
        return message.reply("Please provide a reason to ban.").then(msg => {msg.delete({ timeout: 10000 });}).catch(console.error);
    }

    // No author permissions
    if (!message.member.hasPermission("BAN_MEMBERS")) {
        return message.reply("❌ You do not have permissions to ban members. Please contact a staff member").then(msg => {msg.delete({ timeout: 10000 });}).catch(console.error);
        
    }
    // No bot permissions
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
        return message.reply("❌ I do not have permissions to ban members. Please contact a staff member").then(msg => {msg.delete({ timeout: 10000 });}).catch(console.error);
    }

    const toBan = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

    // No member found
    if (!toBan) {
        return message.reply("Couldn't find that member, try again").then(msg => {
            msg.delete({
                timeout: 10000
            });
        }).catch(console.error);
    }

    // Can't ban urself
    if (toBan.id === message.author.id) {
        return message.reply("You can't ban yourself...").then(msg => {
            msg.delete({
                timeout: 10000
            });
        }).catch(console.error);
    }

    // Check if the user's banable
    if (!toBan.bannable) {
        return message.reply("I can't ban that person due to role hierarchy, I suppose.").then(msg => {
            msg.delete({
                timeout: 10000
            });
        }).catch(console.error);
    }
        
    const embed = new MessageEmbed()
        .setColor("#ff0000")
        .setThumbnail(toBan.user.displayAvatarURL)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(stripIndents`**- baned member:** ${toBan} (${toBan.id})
        **- baned by:** ${message.member} (${message.member.id})
        **- Reason:** ${args.slice(1).join(" ")}`);

    const promptEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`This verification becomes invalid after 30s.`)
        .setDescription(`Do you want to ban ${toBan}?`);

    // Send the message
    await message.channel.send(promptEmbed).then(async msg => {
        // Await the reactions and the reactioncollector
        const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        // Verification stuffs
        if (emoji === "✅") {
            msg.delete();

            toBan.ban(args.slice(1).join(" "))
                .catch(err => {
                    if (err) return message.channel.send(`Well.... the ban didn't work out. Here's the error ${err}`);
                });

            // logChannel.send(embed);
        } else if (emoji === "❌") {
            msg.delete();

            message.reply(`ban canceled.`)
                .then(m => m.delete(10000));
        }
    });
};

module.exports.help = {
    name: "ban",
    usage: "",
    description: "",
};