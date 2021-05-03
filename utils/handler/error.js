/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */

module.exports = {
    disconnect: () => {
        console.warn('Disconnected!');
    },
    reconnecting: () => {
        console.log("Bot reconnecting...");
    },
    warn: (warning) => {
        console.warn('[WARNING]', warning);
    },
    error: (error) => {
        console.error(`ERROR: ${error.message}`);
    },
    DiscordAPIError: (error) => {
        console.log('[DiscordAPIError]', error);
    },
    uncaughtException: (error) => {
        console.error(`[uncaughtException] ${error.stack}`);
        process.exit(1);
    },
    unhandledRejection: (error, promise) => {
        console.log('[unhandledRejection]', `Reason: ${error.stack}`);
    },
};