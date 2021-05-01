/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    if (message.author.bot) return;
    if (message.channel === 'dm') return;

    if (message.member.id === client.config.owner || message.member.hasPermission('ADMINISTRATOR')) {
        if(args[0] === "de") {
            await message.delete().catch(O_o => {});
            const embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name}` + ' - Regeln')
            .addField('§1 Spam', 'Spamming in Text-Channels jeglicher Form, darunter auch Tag-/ Chatspamming und PN Spamming, ist verboten.')
            .addField('§2 Earrape', 'Earrape, d.h. bewusst extrem laute Geräusche zu machen oder abzuspielen, ist in sämtlichen Channels verboten.')
            .addField('§3 Leaks', 'Es dürfen weder Bilder einer Person, noch die Adresse oder andere private Daten, ohne ihre Einverständnis, geleakt werden. Dies ist auch über PN verboten.')
            .addField('§4 Hierachie', 'Anweisungen der Teammitglieder sind ohne Widerspruch Folge zu leisten.')
            .addField('§5 Bots und Raids', 'Die Benutzung von Bot-Accounts und das Durchführen von Raids sind strengstens verboten.')
            .addField('§6 Werbung', `Werbung für andere Discord-Server ist in allen Text- und Voicechannels, sowie auch über PN, verboten.`)
            .addField('§7 Aufnehmen', 'Das Aufnehmen von Audio oder Video in Voice-Channels ist strengstens verboten.')
            .addField('§8 Beleidigungen', 'Das Beleidigen von Usern ist verboten.')
            .addField('§9 Tierquälerei und Blutinhalte', 'Das Verbreiten von Videos und Bildern, welche Tierquälerei oder Blutinhalte zeigen, ist verboten.')
            .addField('§10 Kinderpornographie', 'Das Verbreiten von Pornographie Minderjähriger ist strengstens verboten und kann zur Anzeige gebracht werden!')
            .addField('§11 Drohung und Erpressung', 'Das Drohen und Erpressen von Usern, beispielsweise mit einem Leak, ist verboten.')
            .addField('§12 Namensgebung', 'Jeder Nutzer ist dazu verpflichtet seinen Name so zu wählen, das er nicht beleidigend ist. Das Faken eines Nutzers ist verboten.')
            .addField('§13 Channel-hopping', 'Das ständige betreten und verlassen eines Channels ist untersagt.')
            .addField('§14 Unwissenheit', 'Unwissenheit schützt vor Strafe nicht.')
            .addField('Generell', 'Es gelten die ToS (https://discordapp.com/terms),\ndie Guidelines (https://discord.com/guidelines),\n sowie die Privacy (https://discord.com/privacy) von Discord!\n\nVerstöße gegen das Regelwerk werden mit Tempmutes, Permamutes und Bans bestraft. Bei einem Mute wird einem nur noch der Zugang zum Jailbereich gestattet, wo dieses Regelwerk ebenso Anwendung findet. Das Serverteam hat das Recht die Regeln zu jeder Zeit anzupassen!')
            .setColor(0xdf5824)
            .setTimestamp()
            .setFooter(client.config.copyright + " | Zuletzt geändert:");
            message.channel.send(embed);     //.then(n => n.react('✋')).catch(console.error);

        } else if(args[0] === "en") {
            await message.delete().catch(O_o => {});
            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name}` + ' - Rules')
                .addField('§1 Spam', 'Spamming in text channels of any form, including tag / chat spamming and PN spamming, is prohibited.')
                .addField('§2 Earrape', 'Earrape, which means playing extreme loud or low-quality audio as well as music, is forbidden in all Voice Channels.')
                .addField('§3 Leaks', 'Neither pictures of a person nor the address or other private data may be leaked without their consent. This is also prohibited via PN.')
                .addField('§4 Hierachie', 'Instructions from team members must be followed without objection.')
                .addField('§5 Bots and Raids', 'Using bot accounts and conducting raids is strictly prohibited.')
                .addField('§6 Advertisement', `Advertising for other Discord servers is prohibited in all text and voice channels, as well as via PN.`)
                .addField('§7 Recording', 'Recording audio or video in voice channels is strictly prohibited.')
                .addField('§8 Insulting', 'Insulting of users is prohibited.')
                .addField('§9 Cruelty to animals and blood content','The distribution of videos and pictures that show animal cruelty or blood content is prohibited.')
                .addField('§10 Child pornography', 'The distribution of pornography by minors is strictly forbidden and could end with an police report!')
                .addField('§11 Threats and extortion', 'Threatening and blackmailing users, for example with a leak, is prohibited.')
                .addField('§12 Naming', 'Every user is obliged to choose his name in such a way that it is not offensive. Faking a user is prohibited.')
                .addField('§13 Channel-hopping', 'Constantly entering and leaving a channel is prohibited.')
                .addField('§14 Ignorance', 'Ignorance does not protect you from getting a punishment.')
                .addField('Generell', 'All Discord Terms of Service and Guidelines apply! (https://discordapp.com/terms)\n\nViolations of the rules are punished with tempmutes, permamutes and bans. With a mute, you are only allowed access to the jail area, where this set of rules also applies. The server team has the right to adjust the rules at any time!')
                .setColor(0xdf5824)
                .setTimestamp()
                .setFooter(client.config.copyright + " | Last updated:");
            message.channel.send(embed);     //.then(n => n.react('✋')).catch(console.error);

        } else if (args[0] !== 'de' || args[0] !== 'en') {
            await message.delete().catch(O_o => {});
            const embed = new Discord.MessageEmbed()
                .setTitle(':warning: | Error')
                .addField('**Invalid Command Syntax!** Please use:', `${client.config.prefix}setrules <Language>`)
                .addField('__Available Languages:__', 'de, en')
                .setColor(0x8e44ad)
                .setTimestamp()
                .setFooter(client.config.copyright);
            message.member.send(embed).then(msg => {
                msg.delete({
                    timeout: 10000
                }); // Deletes Message after 10seconds
            }).catch(console.error); // Logs the error if there is one 
        }
    } else {
        await message.delete().catch(O_o => {});
        const embed = new Discord.MessageEmbed()
            .setTitle('Missing Permission')
            .setDescription(`I'm sorry but you don't have the **ADMINISTRATOR** Permission`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(client.config.copyright);
        message.member.send(embed).then(msg => {
            msg.delete({
                timeout: 10000
            }); // Deletes Message after 10seconds
        }).catch(console.error); // Logs the error if there is one
    }

};
module.exports.help = {
    name: 'setrules',
    usage: "setrules <de/en>",
    description: "Sends premade rules.",
    permissions: ["ADMINISTRATOR"],
    guildOnly: true,
    nsfw: false,
    ownerOnly: false,
};