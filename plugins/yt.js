const config = require('../config')
const fg = require('api-dylux');
const l = console.log
const { nezuko, commands } = require('../command')
const dl = require('@bochilteam/scraper')  
const ytdl = require('youtubedl-core');
const fs = require('fs-extra')
var videotime = 60000 // 1000 min
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
nezuko({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts lelena',
    react: "🔎",
    desc: "Search and get details from youtube.",
    category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('*Please give me words to search*')
try {
let yts = require("yt-search")
var arama = await yts(q);
} catch(e) {
    l(e)
return await conn.sendMessage(from , { text: '*Error !!*' }, { quoted: mek } )
}
var mesaj = '';
arama.all.map((video) => {
mesaj += ' *🖲️' + video.title + '*\n🔗 ' + video.url + '\n\n'
});
await conn.sendMessage(from , { text:  mesaj }, { quoted: mek } )
} catch (e) {
    l(e)
  reply('*Error !!*')
}
})

nezuko({
    pattern: "video",
    alias: ["ytvideo"],
    use: '.video lelena',
    react: "📽️",
    desc: "Search & download yt videos.",
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('*Please give me quary to download*')
let yts = require("yt-search")
let search = await yts(q)
let anu = search.videos[0]
const cap = `*ɴᴇᴢᴜᴋᴏ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ☁️*
*🫧Title:* ${anu.title}
*❄️Views:* ${anu.views}
*🎯Duration:* ${anu.timestamp}

*🪄Url:* ${anu.url}

*ɴᴇᴢᴜᴋᴏ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ*`
await conn.sendMessage(from, { image: { url: anu.thumbnail }, caption: cap}, { quoted: mek })
const yt = await dl.youtubedl(anu.url).catch(async () => await dl.youtubedlv2(anu.url)) 
const yt2 = await dl.youtubedlv2(anu.url)
let senda = await conn.sendMessage(from, { video: {url: await yt.video['360p'].download() }, caption: ''}, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '🎥', key: senda.key }})

if (yt2.video['720p'].fileSizeH.includes('MB') && yt2.video['720p'].fileSizeH.replace(' MB','') >= config.MAX_SIZE) return await conn.sendMessage(from, { text: '*This video too big !!*' }, { quoted: mek });
if (yt2.video['720p'].fileSizeH.includes('GB')) return await conn.sendMessage(from, { text: '*This video too big !!*' }, { quoted: mek });
let senda1 = await conn.sendMessage(from, { video: {url: await yt.video['720p'].download() }, caption: ''}, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '🎥', key: senda1.key }})
} catch (e) {
  reply("*Not Found !*")
  l(e)
}
})

nezuko({
    pattern: "song",
    alias: ["ytsong"],
    use: '.song lelena',
    react: "🎧",
    desc: "Search & download yt song.",
    category: "download",
    filename: __filename
},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('*Please give me quary to download*')
let yts = require("yt-search")
let search = await yts(q)
let anu = search.videos[0]
const cap = `*ɴᴇᴢᴜᴋᴏ ᴍᴅ ʏᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ☁️*
*🫧Title:* ${anu.title}
*❄️Views:* ${anu.views}
*🎯Duration:* ${anu.timestamp}

*🪄Url:* ${anu.url}

* ɴᴇᴢᴜᴋᴏ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ*`
await conn.sendMessage(from, { image: { url: anu.thumbnail }, caption: cap}, { quoted: mek })
let infoYt = await ytdl.getInfo(anu.url);
if (infoYt.videoDetails.lengthSeconds >= videotime) {
    reply("❌ ```Unable to upload this file according to your Platform Upload Size```❗ \n\n *_Please update your MAX_SIZE var on the Upload Size on your platform_* ❗🧑‍💻");
    return;
}
let titleYt = infoYt.videoDetails.title;
let randomName = getRandom(".mp3");
const stream = ytdl(anu.url, {
        filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
    })
    .pipe(fs.createWriteStream(`./${randomName}`));
await new Promise((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", resolve);
});

let stats = fs.statSync(`./${randomName}`);
let fileSizeInBytes = stats.size;
let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    let sendaE = await conn.sendMessage(from, { document : fs.readFileSync(`./${randomName}`)  ,caption: anu.title ,mimetype: 'audio/mpeg', fileName: `${titleYt}.mp3` }, { quoted: mek })
    await conn.sendMessage(from, { react: { text: '📁', key: sendaE.key }})
await conn.sendMessage(from, { react: { text: '✔️', key: mek.key }})
return fs.unlinkSync(`./${randomName}`);
fs.unlinkSync(`./${randomName}`);
} catch (e) {
  reply("🚫 *Request incompleted !* ```EROR:YTDL```\n\n 🔄 *_Solution - Try Again Little Movement_* 🧑‍💻")
  l(e)
}
})
