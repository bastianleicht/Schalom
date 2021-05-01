/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const COLOR = require(`chalk`);

exports.warn = (...message) => {
    console.log(COLOR.yellow(`<warn>`));
    console.warn(...message);
    console.log(COLOR.yellow(`</warn>`));
};

exports.error = (...message) => {
    console.log(COLOR.red(`<error>`));
    console.warn(...message);
    console.log(COLOR.red(`</error>`));
};

exports.info = (...message) => {
    console.log(COLOR.cyan(`[INFO] > ` + COLOR.yellow(...message)));
};

exports.chat = (...message) => {
    console.log(COLOR.green(`[CHAT] ` + COLOR.cyan(...message)));
};

exports.message = message => {
    console.log(COLOR.cyan(`[APP] > ` + COLOR.yellow(...message)));
};

exports.console = (...message) => {
    console.log(...message);
};
