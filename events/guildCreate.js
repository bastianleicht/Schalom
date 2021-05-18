/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */

module.exports = async (client, guild) => {
    try {
        client.db.query('SELECT * FROM server WHERE guildID = ?', [guild.id], (err, rows) => {
            if(err) return console.error(`${client.date} | MYSQL: query guildID ERROR: ${err}`);
            if(rows.length > 0) {
                //  Guild already exists in DB
                console.log(`${client.date} | ${client.user.username} just re-joined a guild! \nGuild Name: '${guild.name}' \nGuild ID: '${guild.id}' \nGuild Membercount: '${guild.memberCount}'!`);

                guild.owner.user.send(`***Hey there! Thanks for re-inviting ${client.user.username} to your server. The default prefix is "${client.config.prefix}".`)
                    .catch((err) => console.error('Failed to dm guild owner! ERROR: ' + err));
            } else {
                //  Guild is not in DB
                try {
                    client.db.query('INSERT INTO server ( guildID ) values (?)', [guild.id], (err, { insertId }) => {

                        if (err) return console.error(`${client.date} | MYSQL: guildCreate (id: ${guild.id}) insertion failed! Error: ${err}`);
                        if (!insertId) return console.error(`${client.date} | MYSQL: guildCreate (id: ${guild.id}) insertion failed!`);

                        console.log(`${client.date} | ${client.user.username} just joined a new guild! \nGuild Name: '${guild.name}' \nGuild ID: '${guild.id}' \nGuild Membercount: '${guild.memberCount}'!`);

                        guild.owner.user.send(`***Hey there! Thanks for inviting ${client.user.username} to your server. The default prefix is "${client.config.prefix}".`)
                            .catch((err) => console.error('${client.date} | Failed to dm guild owner! ERROR: ' + err));
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        });
    } catch (e) {
        console.error(`${client.date} | MYSQL: ERROR: ${e}`);
    }

};