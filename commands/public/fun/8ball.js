/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const { MessageEmbed } = require('discord.js');

const answers = [
    'Maybe.',
    'Certainly not.',
    'I hope so.',
    'Not in your wildest dreams.',
    'There is a good chance.',
    'Quite likely.',
    'I think so.',
    'I hope not.',
    'I hope so.',
    'Never!',
    'Forget about it.',
    'Ahaha! Really?!?',
    'Pfft.',
    'Sorry, bucko.',
    'Hell, yes.',
    'Hell to the no.',
    'The future is bleak.',
    'The future is uncertain.',
    'I would rather not say.',
    'Who cares?',
    'Possibly.',
    'Never, ever, ever.',
    'There is a small chance.',
    'Yes!'
];

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    if (args.join(' ').endsWith('?')) {
        const embed = new MessageEmbed()
            .setTitle('🎱 8ball')
            .setThumbnail('https://cdn.bastianleicht.de/etc/schalom/8ball.png')
            .setDescription(`**${answers[Math.floor(Math.random() * answers.length)]}**`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.channel.send(embed);

    } else {
        await message.delete().catch(O_o => {});
        const embed = new MessageEmbed()
            .setTitle('🎱 8ball')
            .setThumbnail('https://cdn.bastianleicht.de/etc/schalom/8ball.png')
            .setDescription('That doesn\'t seem to be a question, please try again!')
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(client.config.copyright);

        message.channel.send(embed).then(msg => {
            msg.delete({
                timeout: 10000
            });                                     // Deletes Message after 10seconds
        }).catch(console.error);                    // Logs the error if there is one
    }

};

module.exports.help = {
    name: "8ball",
    usage: "8ball",
    description: "Answers your Questions.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: false,
};