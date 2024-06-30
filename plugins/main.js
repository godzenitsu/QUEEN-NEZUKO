const config = require('../config')
const { nezuko, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
 function genMsgId() {
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

  for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return randomText;
} 





nezuko({
    pattern: "alive",
    react: "👾",
    alias: ["online","test","bot"],
    desc: "Check bot online or no.",
    category: "main",
    use: '.alive',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isZenitsu, isGodzenitsu, isZenitsulord, isZenitsugod, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
const tes = `${config.ALIVE}

🙌 *Hello i am QUEEN-NEZUKO Whatsapp User Bot* 


🎉 *Website:* https://queen-nezuko-web.onrender.com/

👨‍💻 *Owners:* ɢᴏᴅ-ᴢᴇɴɪᴛꜱᴜ*

🪩 *Repo:* https://github.com/godzenitsu/Queen-Nezuko

🌟 *Our WhatsApp Group:* https://chat.whatsapp.com/DcGABEejUwOG8YcgGOcizF

-⭐have a nice day🌻
🔢 Reply below number,

*POWERD BY GOD-ZENITSU*
       
𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝙶𝙾𝙳-𝚉𝙴𝙽𝙸𝚃𝚂𝚄`
await conn.sendMessage(from, { image: { url: config.LOGO }, caption: tes }, { quoted: mek  ,messageId:genMsgId() })

} catch (e) {
reply('*Error !!*\n\n' + e)
l(e)
}
})
nezuko({
        pattern: "restart",
        desc: "To restart bot",
        category: "main",
        filename: __filename
    },
  async(conn, mek, m,{from, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isZenitsu, isZenitsulord, isSadas, isZenitsugod, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner && !isZenitsu && !isZenitsulord && !isZenitsugod && !isGodzenitsu && !isMe)return;
    try{    const { exec } = require("child_process")
            reply('Restarting')
            exec('pm2 restart all')
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
            pattern: "join",
            desc: "joins group by link",
            category: "main",
            use: '<group link.>',
        },
       async(conn, mek, m,{from, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isZenitsu, isZenitsulord, isGodzenitsu, isZenitsugod, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner && !isZenitsulord && !isZenitsu && !isGodzenitsu && !isZenitsugod && !isMe)return;
    try{  if (!q) return reply(`Please give me Query`);
            if (!q.split(" ")[0] && !q.split(" ")[0].includes("whatsapp.com"))
               reply("Link Invalid, Please Send a valid whatsapp Group Link!");
            let result = q.split(" ")[0].split("https://chat.whatsapp.com/")[1];
            await conn.groupAcceptInvite(result)
                .then((res) => reply("🟩Joined Group"))
                .catch((err) => reply("Error in Joining Group"));
} catch (e) {
reply('*Error !!*')
l(e)
}
})
nezuko({
            pattern: "promote",
            desc: "Provides admin role to replied/quoted user",
            category: "main",
            filename: __filename,
            use: '<quote|reply|number>',
        },
              async(conn, mek, m,{from, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isZenitsulord, isZenitsu, isGodzenitsu, isZenitsugod, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
                 try {     if (!m.isGroup) return reply(`only for groups`);
            if (!isBotAdmins) return reply(`I can't do that. give group admin`);

                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? citel.quoted.sender : q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                if (!users) return;
                await conn.groupParticipantsUpdate(m.chat, [users], "promote");
} catch (e) {
reply('*Error !!*')
l(e)
}
})


nezuko({
    pattern: "demote",
    react: "🔖",
    desc: "demote admin to a member",
    category: "main",
    use: '.demote',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {                   
try {     if (!m.isGroup) return reply(`only for groups`);
            if (!isBotAdmins) return reply(`I can't do that. give group admin`);
                                  
         	let users = mek.mentionedJid ? mek.mentionedJid : mek.quoted ? mek.quoted.sender : q.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await conn.groupParticipantsUpdate(mek.chat, [users], 'demote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
l(e)
}
}) 		    


nezuko({
  pattern: "kick",
  alias: [".."],
  desc: "Kicks replied/quoted user from group.",
  category: "main",
  filename: __filename,
  use: '<quote|reply|number>',
},           
    async(conn, mek, m,{from, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isZenitsu, isZenitsulord, isGodzenitsu, isZenitsugod, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
   try {
       if (!m.isGroup) return reply(`only for groups`);
  if (!isBotAdmins) return reply(`I can't do that. give group admin`);


    const user = m.quoted.sender;
    if (!user) return reply(`*Please give me a user to kick ❗*`);
    await conn.groupParticipantsUpdate(m.chat, [user], "remove");
   reply(`${user} *has been kicked out of the group!*`);
  } catch (e) {
reply('*Error !!*')
l(e)
}
})
nezuko({
            pattern: "hidetag",
            alias: ["htag"],
            desc: "Tags everyperson of group without mentioning their numbers",
            category: "group",
            filename: __filename,
            use: '<text>',
        },
      async(conn, mek, m,{from, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isZenitsu, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
   try { if (!m.isGroup) return reply(tlang().group);
       if (!m.isGroup) return reply(`only for groups`);
            conn.sendMessage(m.chat, {
                text: q ? text : "",
                mentions: participants.map((a) => a.id),
            }, {
                quoted: mek ,messageId:genMsgId() 
            });
     } catch (e) {
reply('*Error !!*')
l(e)
}
})
nezuko({
            pattern: "add",
            desc: "Add that person in group",
            fromMe: true,
            category: "group",
            filename: __filename,
            use: '<number>',
        },
         async(conn, mek, m,{from, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isZenitsu, isZenitsulord, isGodzenitsu, isZenitsugod, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
   try {
      
       if (!m.isGroup) return reply(`only for groups`);
            if (!q) return reply("Please provide me number.");
        
            let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            await conn.groupParticipantsUpdate(m.chat, [users], "add");
} catch (e) {
reply('*Error !!*')
l(e)
}
})
        
    
nezuko({
    pattern: "ping",
    react: "📡",
    alias: ["speed"],
    desc: "Check bot\'s ping",
    category: "main",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isZenitsu, isZenitsulord, isZenitsugod, isGodzenitsu, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
var inital = new Date().getTime();
let ping = await conn.sendMessage(from , { text: '```Pinging!!!```'  }, { quoted: mek, messageId:genMsgId() } )
var final = new Date().getTime();
await conn.sendMessage(from, { delete: ping.key })
return await conn.sendMessage(from , { text: '*Pong*\n *' + (final - inital) + ' ms* '  }, { quoted: mek ,messageId:genMsgId()} )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

nezuko({
    pattern: "del",
    react: "⛔",
    alias: [","],
    desc: "delete message",
    category: "main",
    use: '.del',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isZenitsu, isZenitsulord, isGodzenitsu, isZenitsugod, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    const key = {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.quoted.id,
                    participant: m.quoted.sender
                }
                await conn.sendMessage(m.chat, { delete: key })
} catch (e) {
reply('*Error !!*')
l(e)
}
})

nezuko({
    pattern: "menu",
    react: "📂",
    alias: ["panel","list","commands"],
    desc: "Get bot\'s command list.",
    category: "main",
    use: '.menu',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,  isZenitsu, isZenitsulord, isGodzenitsu, isZenitsugod, isMe,isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    let menuc1 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'admin'){
if(!commands[i].dontAddCommandList){
menuc1 += `*│►* .${commands[i].pattern}\n`
}}};

let menuc2 = ``
for (let i=0;i<commands.length;i++) { 
  if(commands[i].category === 'main'){
  if(!commands[i].dontAddCommandList){
  menuc2 += `*│⩥* .${commands[i].pattern}\n`
  }}};

let menuc3 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'convert'){
  if(!commands[i].dontAddCommandList){
    menuc3 += `*│►* .${commands[i].pattern}\n`
}}};

let menuc4 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){
menuc4 += `*│►* .${commands[i].pattern}\n`
}}};

let menuc5 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
  if(!commands[i].dontAddCommandList){
menuc5 += `*│►* .${commands[i].pattern}\n`
}}};

let menuc6 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'owner'){
if(!commands[i].dontAddCommandList){
  menuc6 += `*│⩥* .${commands[i].pattern}\n`
}}};
let menumg = `*Konnichiwa.!!🎗️* ${pushname}

*╭─     ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ*
*│🕵️‍♂️ 𝘙𝘶𝘯 𝘛𝘪𝘮𝘦 -* ${runtime(process.uptime())} 
*│🕵️‍♂️ 𝘙𝘢𝘮 𝘜𝘴𝘦 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*╰──────────●●►*
*⭐ Queen-Nezuko Commands*
*╭──────────●●►*
*│☁️ MAIN COMMANDS*
*│   ───────*

${menuc2}*╰───────────●●►*

*│☁️ DOWNLOAD COMMANDS*
*│   ───────*

${menuc5}*╰───────────●●►*                    

*│☁️ SEARCH COMMANDS*
*│   ───────*

${menuc4}*╰───────────●●►*

*│☁️ CONVERT COMMANDS*
*│   ───────*

${menuc3}*╰───────────●●►*      

*ɴᴇᴢᴜᴋᴏ ᴍᴅ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ•*`
      
await conn.sendMessage(from, { image: { url: config.LOGO }, caption: menumg }, { quoted: mek, messageId:genMsgId() })
} catch (e) {
reply('*Error !!*')
l(e)
}
})

nezuko({
    pattern: "system",
    react: "🚀",
    alias: ["device","ofcc","truth"],
    desc: "Get bot\'s system..",
    category: "main",
    use: '.system',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,  isZenitsu, isZenitsulord, isGodzenitsu, isZenitsugod, isMe,isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

  try{
const tes = `┌───────────────────────
├ 🧬 *Uptime:-*  ${runtime(process.uptime())}
├ 🎲 *Ram usage:-*  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
├ 🖥️ *Owners:-* * ɢᴏᴅ-ᴢᴇɴɪᴛꜱᴜ*
├🕹️ *Version:-* 1.0.0
└───────────────────────`

 
await conn.sendMessage(from, { image: { url: config.LOGO }, caption: tes }, { quoted: mek, messageId:genMsgId() })
} catch (e) {
reply('*Error !!*')
l(e)
}
})

nezuko({
        pattern: "support",
        react: "☁️",
        desc: "Sends official support group link.",
        category: "group",
        filename: __filename,
    },
    async(conn, mek, m,{from, l, quoted, body, isNezuko, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,  isZenitsu, isZenitsulord, isGodzenitsu, isZenitsugod, isMe,isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
            const tes = `*🎗️qᴜᴇᴇɴ-ɴᴇᴢᴜᴋᴏ ꜱᴜᴩᴩᴏʀᴛ* *Group Link:* https://chat.whatsapp.com/DcGABEejUwOG8YcgGOcizF*`
        await conn.sendMessage(from, { image: { url: config.LOGO }, caption: tes }, { quoted: mek, messageId:genMsgId() })

  } catch (e) {
reply('*Error !!*')
l(e)
}
})
