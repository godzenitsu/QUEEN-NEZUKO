const config = require('../config')
const { nezuko, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')	
const fs = require('fs')
const fg = require('api-dylux');


nezuko({
  pattern: "fb",
  react: "🔓",
  category: "download",
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!args[0]) {
        throw ` Please send the link of a Facebook video\n\nEXAMPLE :\n *${prefix + command}* https://fb.watch/7B5KBCgdO3`;
    }

    const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
    if (!urlRegex.test(args[0])) {
        throw '⚠️ PLEASE GIVE A VALID URL.';
    }
     await reply(`Please wait...`);
    
        const result = await fg.fbdl(args[0]);
        const tex = `
  *Video Details* 
📽️ *Title*: ${result.title}
`;


        const response = await fetch(result.videoUrl);
        const arrayBuffer = await response.arrayBuffer();
        const videoBuffer = Buffer.from(arrayBuffer);

        // Save the videoBuffer to a temporary file
        const randomName = `temp_${Math.floor(Math.random() * 10000)}.mp4`;
        fs.writeFileSync(`./${randomName}`, videoBuffer);

        // Send the video using client.sendMessage
        await conn.sendMessage(
            from,
            {
                video: fs.readFileSync(`./${randomName}`),
                caption: tex,
            },
            { quoted: mek }
        );

        fs.unlinkSync(`./${randomName}`);
    } catch (e) {
        console.log(e);
        reply('⚠️ An error occurred while processing the request. Please try again later.');
l(e)
}
})
