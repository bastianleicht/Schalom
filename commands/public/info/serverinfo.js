/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydney: 'Sydeny',
    'eu-central': 'EU Central',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};
function trimArray(arr, maxLen = 10) {
    if (arr.length > maxLen) {
        const len = arr.length - maxLen;
        arr = arr.slice(0, maxLen);
        arr.push(`${len} more...`);
    }
    return arr;
}

module.exports.run = async (client, message, args) => {
    if(message.author.bot) return;
    if (message.channel === 'dm') return;

    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
	const members = message.guild.members.cache;
	const channels = message.guild.channels.cache;
	const emojis = message.guild.emojis.cache;

    const embed = new MessageEmbed()
		.setTitle(`**Guild information for __${message.guild.name}__**`)
		.setThumbnail(message.guild.iconURL({ dynamic: true }))
		.addField('General', [
			`**❯ Name:** ${message.guild.name}`,
			`**❯ ID:** ${message.guild.id}`,
			`**❯ Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
			`**❯ Region:** ${regions[message.guild.region]}`,
            //`**❯ Region:** ${message.guild.region}`,      //DEV if there is a unknown region
            `**❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
            `**❯ Verified:** ${message.guild.verified ? "Server is verified" : "Server isn't verified"}`,
			`**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
			`**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
			`**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')}  (ca. ${moment(message.guild.createdTimestamp).fromNow()})`,
			'\u200b'
		])
		.addField('Statistics', [
			`**❯ Role Count:** ${roles.length}`,
			`**❯ Emoji Count:** ${emojis.size}`,
			`**❯ Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
			`**❯ Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
			`**❯ Member Count:** ${message.guild.memberCount}`,
			`**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
			`**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
			`**❯ Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
			`**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
			`**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
			'\u200b'
		])
		.addField('Presence', [
			`**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
			`**❯ Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
			`**❯ Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
			`**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
			'\u200b'
		])
		.addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? trimArray(roles) : 'None')
		.setColor('BLUE')
        .setTimestamp()
        .setFooter(client.config.copyright);
	message.channel.send(embed);
};

module.exports.help = {
    name: "serverinfo",
    usage: "serverinfo",
    description: "Shows you some infos about the Server.",
    permissions: "",
    guildOnly: true,
    nsfw: false,
    ownerOnly: false,
};