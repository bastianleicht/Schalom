/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
//jshint esversion: 8

//  Discord
const Discord = require("discord.js");
const client = new Discord.Client();

//  Command Handler (public)
const fs = require('fs');
const Enmap = require('enmap');
client.events = new Enmap();
client.commands = new Enmap();
client.commands.fun = new Enmap();
client.commands.info = new Enmap();
client.commands.gameinfo = new Enmap();
client.commands.music = new Enmap();
client.commands.nsfw = new Enmap();
client.commands.moderation = new Enmap();
client.commands.economy = new Enmap();

//  Command Handler (private)
client.commands.team = new Enmap();
client.commands.owner = new Enmap();

//  Music Queue reference
client.queue = new Map();

//  Client Config
const config = require('./opt/config.json');
client.config = config;
const utils = require('./utils/utils.js');
client.utils = utils;

//  GiveawaysManager Settings
const { GiveawaysManager } = require('discord-giveaways');
client.GiveawaysManager = new GiveawaysManager(client, {
    storage: "./opt/giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

console.log('------------------------------------------------');

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
     if (!file.endsWith('.js')) return;
     const evt = require(`./events/${file}`);
     let evtName = file.split('.')[0];
     console.log(`Loaded event '${evtName}'`);
     client.events.set(evtName);
     client.on(evtName, evt.bind(null, client));
    
    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded Help Command '${cmdName}'`);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/owner/', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/owner/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded Owner Command '${cmdName}'`);
        client.commands.owner.set(cmdName, props);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/team/', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/team/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded Team Command '${cmdName}'`);
        client.commands.team.set(cmdName, props);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/public/fun/', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/public/fun/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded Fun Command '${cmdName}'`);
        client.commands.fun.set(cmdName, props);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/public/info', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/public/info/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded Info Command '${cmdName}'`);
        client.commands.info.set(cmdName, props);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/public/gameinfo', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/public/gameinfo/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded GameInfo Command '${cmdName}'`);
        client.commands.gameinfo.set(cmdName, props);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/public/music', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/public/music/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded Music Command '${cmdName}'`);
        client.commands.music.set(cmdName, props);
        client.commands.set(cmdName, props);

     });
     console.log('------------------------------------------------');
 });

    // "@discordjs/opus": "^0.3.3",
    // "ffmpeg": "0.0.4",
    // "ffmpeg-static": "^4.2.7",
    // "node-opus": "^0.3.3",



fs.readdir('./commands/public/nsfw', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/public/nsfw/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded NSFW Command '${cmdName}'`);
        client.commands.nsfw.set(cmdName, props);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/public/moderation', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/public/moderation/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded Moderation Command '${cmdName}'`);
        client.commands.moderation.set(cmdName, props);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/public/economy', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/public/economy/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded Economy Command '${cmdName}'`);
        client.commands.economy.set(cmdName, props);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});


client.login(config.token2 || process.env.TOKEN);