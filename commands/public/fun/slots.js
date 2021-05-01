/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8
const Discord = require("discord.js");
//TODO: Fix compliance with the Economy System

module.exports.run = async (client, message, args) => {
    const slots = ['🍇', '🍒', '🍋'];
    const slotOne = slots[Math.floor(Math.random() * slots.length)];
    const slotTwo = slots[Math.floor(Math.random() * slots.length)];
    const slotThree = slots[Math.floor(Math.random() * slots.length)];
    const slotfour = slots[Math.floor(Math.random() * slots.length)];
    const slotfive = slots[Math.floor(Math.random() * slots.length)];
    const slotsix = slots[Math.floor(Math.random() * slots.length)];
    const slotseven = slots[Math.floor(Math.random() * slots.length)];
    const sloteight = slots[Math.floor(Math.random() * slots.length)];
    const slotnine = slots[Math.floor(Math.random() * slots.length)];
    if (slotOne === slotTwo && slotOne === slotThree || slotfour === slotfive && slotfour === slotsix || slotseven === sloteight && slotseven === slotnine) {
        
        const won = new Discord.MessageEmbed()
        .setTitle("🎰 | Slot machine")
        .setDescription("Wow, you won🎉 Great job!" + `\n\n\
        ⬜⬜⬜⬜⬜⬜⬜
        ⬜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⬜
        ⬜⠀${slotfour} | ${slotfive} | ${slotsix}⠀⬜
        ⬜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⬜
        ⬜⠀${slotOne} | ${slotTwo} | ${slotThree}⠀⬜
        ⬜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⬜
        ⬜⠀${slotseven} | ${sloteight} | ${slotnine}⠀⬜
        ⬜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⬜
        ⬜⬜⬜⬜⬜⬜⬜
        `)
        .setColor(0x00A2E8)
        .setFooter(client.config.copyright);
        
        message.channel.send(won);
    } else {
        const lost = new Discord.MessageEmbed()
        .setTitle("🎰 | Slot machine")
        .setDescription("Lost that sucks!" + `\n\n\
        ⬜⬜⬜⬜⬜⬜⬜
        ⬜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⬜
        ⬜⠀${slotfour} | ${slotfive} | ${slotsix}⠀⬜
        ⬜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⬜
        ⬜⠀${slotOne} | ${slotTwo} | ${slotThree}⠀⬜
        ⬜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⬜
        ⬜⠀${slotseven} | ${sloteight} | ${slotnine}⠀⬜
        ⬜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⬜
        ⬜⬜⬜⬜⬜⬜⬜
        `)
        .setColor(0x00A2E8)
        .setFooter(client.config.copyright);
        
        message.channel.send(lost);
    }
};

module.exports.help = {
    name: "slots",
    usage: "slots",
    description: "Allows you to play a Slot machine.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};