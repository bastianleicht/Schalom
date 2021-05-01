/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
// jshint esversion: 8
const Discord = require("discord.js");
const beautify = require("beautify");

module.exports.run = async (client, message, args) => {
    if(message.author.id !== client.config.owner) return;

    if(!args[0]){
        message.channel.send("Give me code to eval!")
            .then(m => m.delete(5000));
    }

    try {
        const toEval = args.join(" ");
        const evaluated = eval(toEval);
        const channel = message.channel;

        let embed = new Discord.MessageEmbed()
            .setTitle("Eval")
            .addField("To evaluate:", `\`\`\`.js\n${beautify(args.join(" "), { format: "js" })}\n\`\`\``)
            .addField("Evaluated:", evaluated)
            .addField("Type of:", typeof(evaluated))
            .setColor("#00FF00")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL);
            
        channel.send(embed);

    } catch (e) {
        const channel = message.channel;
        let embed = new Discord.MessageEmbed()
            .setTitle(":x: Error!")
            .setDescription(e)
            .setColor("#FF0000")
            .setFooter(client.user.username, client.user.displayAvatarURL);

        channel.send(embed);

    }
};

module.exports.help = {
    name: "eval",
    usage: "eval <code>",
    description: "Evaluates Code.",
    permissions: "",
    guildOnly: false,
    nsfw: false,
    ownerOnly: true,
};