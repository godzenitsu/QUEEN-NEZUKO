const {
    iris,
    commands,
    isPublic
} = require("../lib/commands.js");
const font = require("@viper-x/fancytext");


// Type 1: Group Management Commands
//───────────────────────────────────

iris({
    name: "mute",
    fromMe: isPublic,
    desc: "Mutes the group.",
    category: "group"
}, async ({ m, client, args }) => {
    if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
    await client.groupSettingUpdate(m.jid, 'announcement');
    return await m.reply("_Group messages restricted to admins._");
});

iris({
    name: "unmute",
    fromMe: isPublic,
    desc: "Unmutes the group",
    category: "group"
}, async ({ m, client, args }) => {
    if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
    await client.groupSettingUpdate(m.jid, 'not_announcement');
    return await m.reply("_Group messages unrestricted._");
});

iris({
    name: "promote",
    fromMe: isPublic,
    desc: "Promotes a user to admin",
    category: "group"
}, async ({ m, client, args }) => {
    try {
        if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
        if (!(args || m.quoted)) return m.reply("_Mention a user to promote._");

        let user = args ? args.replace("@", "") + '@s.whatsapp.net' : m.quoted.sender;

        if (!m.isAdmin(user)) return m.reply("_The user is already an admin._");

        await client.groupParticipantsUpdate(m.jid, [user], "promote");
        m.sendMsg(m.jid , `_@${user.split("@")[0]} has been promoted to admin._`, { mentions : [user] , quoted : m})
    } catch (e) {
        console.log(e);
    }
});

iris({
    name: "demote",
    fromMe: isPublic,
    desc: "Demotes a user from admin",
    category: "group"
}, async ({ m, client, args }) => {
    try {
        if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
        if (!(args || m.quoted)) return m.reply("_Mention a user to demote._");

        let user = args ? args.replace("@", "") + '@s.whatsapp.net' : m.quoted.sender;

        if (!m.isAdmin(user)) return m.reply("_The user is not an admin._");

        await client.groupParticipantsUpdate(m.jid, [user], "demote");
        m.sendMsg(m.jid , `_@${user.split("@")[0]} has been demoted from admin role._`, { mentions : [user] , quoted : m })
    } catch (e) {
        console.log(e);
    }
});

// Type 2: Group Actions
//────────────────────────

iris({
    name : "left",
    fromMe: true,
    category : "group",
    desc: "Leave the group.",
}, async ({ m, client }) => {
    if (!m.isGroup) {
        return await m.reply("*_This command can only be used in a group!_*");
    }
    await client.groupLeave(m.jid);
});

iris({
    name : "invite",
    fromMe: true,
    category : "group",
    desc: "Generate group invite link.",
}, async ({ m, client }) => {
    if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
    const response = await client.groupInviteCode(m.jid);
    await m.reply(`_Group invite link: https://chat.whatsapp.com/${response}_`);
});

iris({
    name : "revoke",
    fromMe: true,
    category : "group",
    desc: "Revoke group invite link.",
}, async ({ m, client }) => {
    if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
    await client.groupRevokeInvite(m.jid);
    await m.reply("_The group invite link has been revoked._");
});

iris({
    name : "join",
    fromMe: true,
    category : "group",
    desc: "Join a group using invite link.",
}, async ({ m, client, args }) => {
    if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
    const rgx = /^(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22})$/;
    if (!args || !rgx.test(args)) return await m.reply("_Please provide a valid group invite link._");
    const res = await client.groupAcceptInvite(args.split("/")[3]);
    if (!res) return await m.reply("_Invalid group link!_");
    return await m.reply("_Successfully joined the group!_");
});
