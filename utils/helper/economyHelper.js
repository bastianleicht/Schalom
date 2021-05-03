/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const errorHandler = require('./../handler/error');

function checkUser(user_id, connection) {
    try {
        connection.query('SELECT * FROM economy WHERE userID = ?', [user_id], (error, { length }) => {
            if(error) return errorHandler.mysql(`Error while querying for User : "${user_id}"!\n ${error}`);
            if(!length) {
                // User does not exist in DB
                try {
                    connection.query(`INSERT INTO economy ( userid ) values (?)`, [user_id], (error, { insertId }) => {
                        if(error) return errorHandler.mysql(`Error while inserting User : "${user_id}"!\n ${error}`);
                        if(!insertId) return errorHandler.mysql(`Error while inserting User : "${user_id}"!`);
                    });
                } catch (error) {
                    return errorHandler.error(error);

                }
            }
        });
    } catch (error) {
        return errorHandler.error(error);
    }
}

function updateMoney(user_id, amount, connection) {
    try {
        connection.query('UPDATE economy SET money = ? WHERE userID = ?', [amount, user_id], (error) => {
            if(error) return errorHandler.mysql(`Error while updating money to '${amount}' for User : "${user_id}"!\n ${error}`);


        });
    } catch (error) {
        errorHandler.error(error);
    }
}

function setValue(user_id, value, value_to, connection) {
    try {
        connection.query(`UPDATE economy SET ${value} = ? WHERE userID = ?`, [value_to, user_id], (error) => {
            if(error) return errorHandler.mysql(`Error while updating '${value}' to '${value_to}' for User : "${user_id}"!\n ${error}`);

        });
    } catch (e) {
        errorHandler.error(e);
    }
}

module.exports = {
    checkUser,
    updateMoney,
    setValue,
};