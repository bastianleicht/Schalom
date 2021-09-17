/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
global.__BASE__ = process.cwd();

const Discord = require('discord.js');
const config  = require(__BASE__ + '/opt/config');

const shardingManager = new Discord.ShardingManager('./schalom.js', {
    token: config.token
});

shardingManager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

shardingManager.spawn().then(() => {
    console.log(`[ShardManager] Started ${shardingManager.totalShards} shards`);
}).catch((error) => {
    console.error(error);
});
