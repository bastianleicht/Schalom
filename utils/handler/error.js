/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */

function getDate() {
    let date = new Date();
    let year = date.getYear() + 1900;
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()];
    let day = date.getDate().toString().length < 2 ? "0" + date.getDate() : date.getDate();
    let hour = date.getHours().toString().length < 2 ? "0" + date.getHours() : date.getHours();
    let minute = date.getMinutes().toString().length < 2 ? "0" + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds().toString().length < 2 ? "0" + date.getSeconds() : date.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

module.exports = {
    disconnect: () => {
        console.warn(getDate() + ' | Disconnected!');
    },
    reconnecting: () => {
        console.log(getDate() + " | Bot reconnecting...");
    },
    warn: (warning) => {
        console.warn(getDate() + ' | [WARNING]', warning);
    },
    error: (error) => {
        console.error(`${getDate()} | ERROR: ${error.message}`);
    },
    mysql: (error) => {
        console.log(getDate() + ' | [MYSQL] ERROR:', error);
    },
    DiscordAPIError: (error) => {
        console.log(getDate() + ' | [DiscordAPIError]', error);
    },
    uncaughtException: (error) => {
        console.error(`${getDate()} | [uncaughtException] ${error.stack}`);
        process.exit(1);
    },
    unhandledRejection: (error, promise) => {
        console.log(getDate() + ' | [unhandledRejection]', `Reason: ${error.stack}`);
    },
};