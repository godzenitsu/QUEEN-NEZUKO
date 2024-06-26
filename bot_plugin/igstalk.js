const {nezuko, isPublic} = require("../lib/commands.js");
const {INFO} = require("../info.js");

nezuko(
    {
        name: "igstalk",
        category: "stalker",
        fromMe: isPublic,
        desc: "stalk  ig account"
    },
    async ({
        client, m, args
    }) => {
if (!args) return await m.reply("_Enter Username, account must be public_");
args = args || m.quoted?.text;
let sample = await fetch(`https://api-aswin-sparky.koyeb.app/api/search/ig?search=${args}`);
var data = await sample.json();
ig = data.data
let venox = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "displayName": `${INFO.split(";")[0]}`,"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
client.sendMessage(m.jid, { image: { url: ig.avatar }, caption: `_Name : ${ig.name}_\n_Username : ${ig.username}_\n\n_Followers : ${ig.followers}_\n_Following : ${ig.following}_\n_Post : ${ig.posts}_\nBio : ${ig.description}` }, { quoted: venox })
  }
);
