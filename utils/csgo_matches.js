/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const axios = require('axios');
const config = require('../opt/config.json');

const GetStatBySteamId = steam_id => {
    return axios
        .get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${config.api.csgo}&steamid=${steam_id}`)
        .then(response => response.data);
};
module.exports = {
    GetStatBySteamId,
};