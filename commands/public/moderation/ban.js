/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const { MessageEmbed } = require("discord.js");
//TODO: Rework completely

async function promptMessage (message, author, time, validReactions) {
    // We put in the time as seconds, with this it's being transferred to MS
    time *= 1000;

    // For every emoji in the function parameters, react in the good order.
    for (const reaction of validReactions) await message.react(reaction);

    // Only allow reactions from the author, 
    // and the emoji must be in the array we provided.
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

    // And of course, await the reactions
    return message
        .awaitReactions(filter, {
            max: 1,
            time: time
        })
        .then(collected => collected.first() && collected.first().emoji.name);
}

module.exports.run = async (client, message, args) => {
    if (message.deletable) message.delete();

    const toBan = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

    if (!args[0]) {
        return message.reply("Please provide a person to ban.").then(msg => {msg.delete({ timeout: 10000 });}).catch(console.error);
    }

    if (!args[1]) {
        return message.reply("Please provide a reason to ban.").then(msg => {msg.delete({ timeout: 10000 });}).catch(console.error);
    }

    if (!message.member.hasPermission("BAN_MEMBERS")) {
        return message.reply("❌ You do not have permissions to ban members. Please contact a staff member").then(msg => {msg.delete({ timeout: 10000 });}).catch(console.error);
    }

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
        return message.reply("❌ I do not have permissions to ban members. Please contact a staff member").then(msg => {msg.delete({ timeout: 10000 });}).catch(console.error);
    }

    if (!toBan) {
        return message.reply("Couldn't find that member, try again").then(msg => {
            msg.delete({ timeout: 10000 });
        }).catch(console.error);
    }

    if (toBan.id === message.author.id) {
        return message.reply("You can't ban yourself...").then(msg => {
            msg.delete({ timeout: 10000 });
        }).catch(console.error);
    }

    if (!toBan.bannable) {
        return message.reply("I can't ban that person due to role hierarchy, I suppose.").then(msg => {
            msg.delete({ timeout: 10000 });
        }).catch(console.error);
    }

    const promptEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`This verification becomes invalid after 30s.`)
        .setDescription(`Do you want to ban ${toBan}?`);

    // Send the message
    await message.channel.send(promptEmbed).then(async msg => {
        // Await the reactions and the reaction collector
        const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        // Verification stuffs
        if (emoji === "✅") {
            msg.delete();

            toBan.ban(args.slice(1).join(" "))
                .catch(err => {
                    if (err) return message.channel.send(`Well.... the ban didn't work out. Here's the error ${err}`);
                });

        } else if (emoji === "❌") {
            msg.delete();

            message.reply(`ban canceled.`)
                .then(m => m.delete(10000));
        }
    });
};

module.exports.help = {
    name: "ban",
    usage: "ban @user <reason>",
    description: "Ban's the User with the specified reason.",
    permissions: ["BAN_MEMBERS"],
    guildOnly: true,
    nsfw: false,
    ownerOnly: false,
};