/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */

//  Initialising Global Variables
global.__BASE__ = process.cwd();

//  Importing Libraries
const Discord       = require("discord.js");
const fs            = require('fs');
const Enmap         = require('enmap');
const mysql         = require('mysql');
const cliProgress   = require('cli-progress');

const DBConfig      = require(__BASE__ + '/opt/database');
const config        = require(__BASE__ + '/opt/config');
const utils         = require(__BASE__ + '/utils/utils');
const error         = require(__BASE__ + '/utils/sendError');
const errorHandler  = require(__BASE__ + '/utils/handler/error');

// Initialising the Client
const client = new Discord.Client({
    disabledEvents: ["RELATIONSHIP_ADD", "RELATIONSHIP_REMOVE", "TYPING_START"]
});

//  Setting up MYSQL and the Pool Cluster
const clusterConfig = {
    canRetry: true,
    removeNodeErrorCount: 1,
    defaultSelector: 'RR'
};

const pool = mysql.createPoolCluster(clusterConfig);
pool.add('MASTER', DBConfig.connection);
pool.add('SLAVE1', DBConfig.connection);
pool.add('SLAVE2', DBConfig.connection);
pool.add('SLAVE3', DBConfig.connection);

client.dbconfig = DBConfig;
client.pool = pool;

/**
 * MySQL Query
 * @type {{query: (function(): {on: function(*, *): this})}}
 */
client.db = {
    query: function () {
        let queryArgs = Array.prototype.slice.call(arguments),
            events = [],
            eventNameIndex = {};

        pool.getConnection(function (err, conn) {
            if (err && eventNameIndex.error) eventNameIndex.error();
            if (conn) {
                let q = conn.query.apply(conn, queryArgs);
                q.on('end', function () {
                    conn.release();
                });

                events.forEach(function (args) {
                    q.on.apply(q, args);
                });
            }
        });

        return {
            on: function (eventName, callback) {
                events.push(Array.prototype.slice.call(arguments));
                eventNameIndex[eventName] = callback;
                return this;
            }
        };
    }
};

//  Client Config, Utils, errorHandler, date
client.config = config;
client.utils = utils;
client.error = error;
client.errorHandler = errorHandler;
client.date = utils.getDate();

//  Command Handler (public)
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
//  Music Queue
client.queue = new Map();

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

//  Setting up the loading Bar's
let events = 0;
let loadedEvents = 0;
let commands = 0;
let loadedCommands = 0;

const loadEvents = new cliProgress.SingleBar({
    format: 'Events   | {bar} | {percentage}% || {value}/{total}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
});

const loadCommands = new cliProgress.SingleBar({
    format: 'Commands | {bar} | {percentage}% || {value}/{total}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
});

//  Counting the Events
const readEvents = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (let file of readEvents) { events++; }

//  Counting the Commands
const count = dirs => {
    const read = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));
    for (let file of read) {
        commands++;
    }
};
['', 'owner', 'public/economy', 'public/fun', 'public/gameinfo', 'public/info', 'public/moderation', 'public/music', 'public/nsfw', 'team'].forEach(dir => count(dir));

console.log("Loading modules:");

//  Start Loading Events
loadEvents.start(events, 0);

const EventReader = fs.readdirSync(`./events/`).filter(file => file.endsWith('.js'));
for (let file of EventReader) {
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    loadedEvents++;
    loadEvents.update(loadedEvents);
    client.events.set(evtName);
    client.on(evtName, evt.bind(null, client));
}
//  Stop Loading Events
loadEvents.stop();

//  Start Loading Commands
loadCommands.start(commands, 0);

const CommandReader = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
for (let file of CommandReader) {
    let props = require(`./commands/${file}`);
    let cmdName = file.split('.')[0];

    loadedCommands++;
    loadCommands.update(loadedCommands);

    client.commands.set(cmdName, props);
}

const CommandOwner = fs.readdirSync(`./commands/owner/`).filter(file => file.endsWith('.js'));
for (let file of CommandOwner) {
    let props = require(`./commands/owner/${file}`);
    let cmdName = file.split('.')[0];

    loadedCommands++;
    loadCommands.update(loadedCommands);

    client.commands.owner.set(cmdName, props);
    client.commands.set(cmdName, props);
}

const CommandTeam = fs.readdirSync(`./commands/team/`).filter(file => file.endsWith('.js'));
for (let file of CommandTeam) {
    let props = require(`./commands/team/${file}`);
    let cmdName = file.split('.')[0];

    loadedCommands++;
    loadCommands.update(loadedCommands);

    client.commands.team.set(cmdName, props);
    client.commands.set(cmdName, props);
}

const CommandFun = fs.readdirSync(`./commands/public/fun/`).filter(file => file.endsWith('.js'));
for (let file of CommandFun) {
    let props = require(`./commands/public/fun/${file}`);
    let cmdName = file.split('.')[0];

    loadedCommands++;
    loadCommands.update(loadedCommands);

    client.commands.fun.set(cmdName, props);
    client.commands.set(cmdName, props);
}

const CommandInfo = fs.readdirSync(`./commands/public/info/`).filter(file => file.endsWith('.js'));
for (let file of CommandInfo) {
    let props = require(`./commands/public/info/${file}`);
    let cmdName = file.split('.')[0];

    loadedCommands++;
    loadCommands.update(loadedCommands);

    client.commands.info.set(cmdName, props);
    client.commands.set(cmdName, props);
}

const CommandGameInfo = fs.readdirSync(`./commands/public/gameinfo/`).filter(file => file.endsWith('.js'));
for (let file of CommandGameInfo) {
    let props = require(`./commands/public/gameinfo/${file}`);
    let cmdName = file.split('.')[0];

    loadedCommands++;
    loadCommands.update(loadedCommands);

    client.commands.gameinfo.set(cmdName, props);
    client.commands.set(cmdName, props);
}

const CommandMusic = fs.readdirSync(`./commands/public/music/`).filter(file => file.endsWith('.js'));
for (let file of CommandMusic) {
    let props = require(`./commands/public/music/${file}`);
    let cmdName = file.split('.')[0];

    loadedCommands++;
    loadCommands.update(loadedCommands);

    client.commands.music.set(cmdName, props);
    client.commands.set(cmdName, props);
}

const CommandNSFW = fs.readdirSync(`./commands/public/nsfw/`).filter(file => file.endsWith('.js'));
for (let file of CommandNSFW) {
    let props = require(`./commands/public/nsfw/${file}`);
    let cmdName = file.split('.')[0];

    loadedCommands++;
    loadCommands.update(loadedCommands);

    client.commands.nsfw.set(cmdName, props);
    client.commands.set(cmdName, props);
}

const CommandModeration = fs.readdirSync(`./commands/public/moderation/`).filter(file => file.endsWith('.js'));
for (let file of CommandModeration) {
    let props = require(`./commands/public/moderation/${file}`);
    let cmdName = file.split('.')[0];

    loadedCommands++;
    loadCommands.update(loadedCommands);

    client.commands.moderation.set(cmdName, props);
    client.commands.set(cmdName, props);
}

const CommandEconomy = fs.readdirSync(`./commands/public/economy/`).filter(file => file.endsWith('.js'));
for (let file of CommandEconomy) {
    let props = require(`./commands/public/economy/${file}`);
    let cmdName = file.split('.')[0];

    loadedCommands++;
    loadCommands.update(loadedCommands);

    client.commands.economy.set(cmdName, props);
    client.commands.set(cmdName, props);
}
//  Stop Loading Commands
loadCommands.stop();

//  Error handling
client.on('DiscordAPIError', error => errorHandler.DiscordAPIError(error));
client.on('error', error => errorHandler.error(error));
client.on('warn', warning => errorHandler.warn(warning));
client.on('disconnected', () => errorHandler.disconnect());
client.on('reconnecting', () => errorHandler.reconnecting());

process.on('unhandledRejection', error => errorHandler.unhandledRejection(error));
process.on('uncaughtException', error => errorHandler.uncaughtException(error));

pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

pool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

// JS garbage collection
if(global.gc) global.gc();

client.login(config.token2 || process.env.TOKEN);