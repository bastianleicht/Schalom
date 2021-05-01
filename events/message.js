/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */

module.exports = (client, message) => {

    //  Check who sends the message and if it has the Prefix
    if(message.author.bot) return;
    if(message.content.indexOf(client.config.prefix) !== 0) return;

    //  Some stupid splitting 
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //  Checking if the Command is a Bot Command
    const cmd = client.commands.get(command);
    if (!cmd) return;

    //  Run the Command
    cmd.run(client, message, args, command);

};