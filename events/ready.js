/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
module.exports = (client) => {
    //  Just for Logging!
    console.log(`Logged in as ${client.user.tag}!`);

    client.db.connect(err => {
        if(err) return console.error('MYSQL: Connection error: ' + err);

        console.log(`MySQL has been connected!`);
    });

    /*  REMOVE: If different activities should be displayed!

    //  The activities
    const activities = ["bastianleicht.de", "bastianleicht.de", `over ${client.channels.cache.size.toLocaleString()} Channels`, `over ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Users`, `in ${client.guilds.cache.size.toLocaleString()} Servers`, `${config.prefix}help`, `${config.prefix}help`, `${config.prefix}help`, "Netflix", "Reddit", "Youtube", "Watch2Gether", `${config.version}`];
    //  Some Code to get them working
    setInterval(async () => {
        let activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity, { type: "WATCHING" });
    }, 15000);

    */

    client.user.setActivity(`${client.config.prefix}help | ${client.config.prefix}invite`, { type: "WATCHING" });
};