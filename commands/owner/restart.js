/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const config = require(__BASE__ + '/opt/config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.id !== config.owner) return;

    await message.author.send('Restarting...');
    client.destroy().then(() => client.login(config.token));
};

module.exports.help = {
    name: "restart",
    usage: "restart",
    description: "Restart's the Bot.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: true,
};