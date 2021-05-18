/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord       = require("discord.js");
const errorHandler  = require(__BASE__ + '/utils/handler/error');

module.exports.run = async (client, message, args) => {

    const user = message.mentions.members.first() || message.author;

    client.db.query('SELECT * FROM economy WHERE userID = ?', [user.id], (error, { length }) => {
        if (error || !length) {
            // User does not exist in DB
            client.db.query(`INSERT INTO economy (userid) values (?)`, [user.id], (error, {insertId}) => {
                if (error) return errorHandler.mysql(`Error while inserting User : "${user.id}"!\n ${error}`);
                if (!insertId) return errorHandler.mysql(`Error while inserting User : "${user.id}"!`);

                client.db.query('SELECT * FROM economy WHERE userID = ?', [user.id], function (error, rows) {
                    if (error) return errorHandler.mysql(`Error while querying data for User : "${user.id}"!\n ${error}`);

                    const money = rows[0].money;
                    const bank = rows[0].bank;
                    const house = rows[0].house;
                    const car = rows[0].car;
                    const rank = rows[0].rank;

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`**__${user}'s Profile:__**\nPocket: ${money}\nBank: ${bank}\nRank: ${rank}\n\n**Inventory:**\nCars: ${car}\nMansions: ${house}`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(embed);
                });
            });
        } else {
            // User exists in DB
            client.db.query(`INSERT INTO economy (userid) values (?)`, [user.id], (error, {insertId}) => {
                if (error) return errorHandler.mysql(`Error while inserting User : "${user.id}"!\n ${error}`);
                if (!insertId) return errorHandler.mysql(`Error while inserting User : "${user.id}"!`);

                client.db.query('SELECT * FROM economy WHERE userID = ?', [user.id], function (error, rows) {
                    if (error) return errorHandler.mysql(`Error while querying data for User : "${user.id}"!\n ${error}`);

                    const money = rows[0].money;
                    const bank = rows[0].bank;
                    const house = rows[0].house;
                    const car = rows[0].car;
                    const rank = rows[0].rank;

                    let embed = new Discord.MessageEmbed()
                        .setTitle('💰 Economy')
                        .setDescription(`**__${user}'s Profile:__**\nPocket: ${money}\nBank: ${bank}\nRank: ${rank}\n\n**Inventory:**\nCars: ${car}\nMansions: ${house}`)
                        .setColor(0x8e44ad)
                        .setTimestamp()
                        .setFooter(client.config.copyright);
                    message.channel.send(embed);
                });
            });
        }
    });
};

module.exports.help = {
  name: "profile",
  usage: "profile (<@user>)",
  description: "Shows your Economy Profile.",
  permissions: "",
  guildOnly: false,
  nsfw: false,
  ownerOnly: false,
};