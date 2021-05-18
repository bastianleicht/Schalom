/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');
const errorHandler = require(__BASE__ + '/utils/handler/error');

function updateMoney(user_id, amount, connection) {
    try {
        connection.query('UPDATE economy SET money = ? WHERE userID = ?', [amount, user_id], (error) => {
            if (error) return errorHandler.mysql(`Error while updating money to '${amount}' for User : "${user_id}"!\n ${error}`);

        });
    } catch (error) {
        errorHandler.error(error);
    }
}

function updateBank(user_id, amount, connection) {
    try {
        connection.query('UPDATE economy SET bank = ? WHERE userID = ?', [amount, user_id], (error) => {
            if (error) return errorHandler.mysql(`Error while updating bank to '${amount}' for User : "${user_id}"!\n ${error}`);

        });
    } catch (error) {
        errorHandler.error(error);
    }
}

function setValue(user_id, value, value_to, connection) {
    try {
        connection.query(`UPDATE economy SET ${value} = ? WHERE userID = ?`, [value_to, user_id], (error) => {
            if (error) return errorHandler.mysql(`Error while updating '${value}' to '${value_to}' for User : "${user_id}"!\n ${error}`);

        });
    } catch (e) {
        errorHandler.error(e);
    }
}

function errorEmbed() {
    let embed = new Discord.MessageEmbed()
        .setTitle('💰 Economy | Error')
        .setDescription(`Seems like there was a Database error!`)
        .setColor(0x8e44ad)
        .setTimestamp();

    return embed;
}

module.exports = {
    updateMoney,
    updateBank,
    setValue,
    errorEmbed,
};