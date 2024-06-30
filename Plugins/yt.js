const config = require('../config')
const puppeteer = require('puppeteer');
const fs = require('fs')
const {
    getBuffer,
    getGroupAdmins,
    getRandom,
    getsize,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson
} = require('../lib/functions')
const {
    cmd,
    commands
} = require('../command')
const yts = require("yt-search")
const ytdl = require("ytdl-core")


async function youtube720(url) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://en.y2mate.is/');
      await page.waitForSelector('#txtUrl');
      await page.type('#txtUrl', url);
      await page.click('#btnSubmit'),
      await page.waitForSelector('#tabVideo .tableVideo');
      await page.click('#tabVideo tr:nth-child(2) td .btn')
      await page.waitForSelector('#tabVideo tr:nth-child(2) td .btn a');
      const p720 = await page.$eval('#tabVideo tr:nth-child(2) td .btn a', link => link.href);
      await browser.close();
  
      return p720;
    } catch (error) {
      console.error('Error occurred:', error);
      return null;
    }
  }


cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts lelena',
    react: "🔎",
    desc: 'Search videos from youtube',
    category: "search",
    filename: __filename

},

    async (conn, mek, m, { from, q, reply }) => {
        try {
            if (!q) return await reply('*Please enter a query to search!*')
            var result = await yts(q);
            var msg = '';
            result.videos.map((video) => {
                msg += ' *🖲️' + video.title + '*\n🔗 ' + video.url + '\n\n'
            });
            await conn.sendMessage(from, { text: msg }, { quoted: mek })
        } catch (e) {
            console.log(e)
            reply('*Error !!*')
        }
    });

cmd({
    pattern: "video",
    alias: ["ytmp4"],
    use: '.video lelena',
    react: "🎥",
    desc: 'Download videos from youtube',
    category: "download",
    filename: __filename

},

    async (conn, m, mek, { from, q, reply }) => {
        try {
            if (!q) return await reply('*Please enter a query or a url!*')
            const url = q.replace(/\?si=[^&]*/, '');
            var results = await yts(url);
            var result = results.videos[0]
            const msg = `\`ʏᴏᴜᴛᴜʙᴇ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ᴍᴇɴᴜ🎗️\`
    
> *\`➤ ᴛɪᴛʟᴇ\` :* ${result.title}
    
> *\`➤ ᴠɪᴇᴡꜱ\` :* ${result.views}
    
> *\`➤ ᴅᴜʀᴀᴛɪᴏɴ\` :* ${result.duration}
    
> *\`➤ ᴜʀʟ\` :* ${result.url}
    `

            let buttons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "360p",
                    id: ".yt360 " + result.url
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "720p",
                    id: ".yt720 " + result.url
                }),
            }
            ]
            let message = {
                image: result.thumbnail,
                header: '',
                footer: config.FOOTER,
                body: msg

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
        } catch (e) {
            console.log(e)
            reply('*Error !!*')
        }
    });

cmd({
    pattern: "yt360",
    react: "🎥",
    dontAddCommandList: true,
    filename: __filename
},

    async (conn, mek, m, { from, q, reply }) => {
        try {
            if (!q) return await reply('*Need a youtube url!*')
            let info = await ytdl.getInfo(q);
            let title = info.videoDetails.title;
            let randomName = getRandom(".mp4");
            const stream = ytdl(q, {
                filter: (info) => info.container == 'mp4' && info.itag == '18',
            }).pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });
            if (!stream) return reply('*360p quality not found please try another!*')
            let stats = fs.statSync(`./${randomName}`);
            let size = stats.size / (1024 * 1024);
            if (size <= 1024) { 
                if (size <= 100) {
                    const video = await conn.sendMessage(from, { video: fs.readFileSync(`./${randomName}`)}, { quoted: mek })
                    await conn.sendMessage(from, { react: { text: '🎼', key: video.key } })
                    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })
                    return fs.unlinkSync(`./${randomName}`);
                } else {
                    const document = await conn.sendMessage(from, { document: fs.readFileSync(`./${randomName}`), mimetype: 'video/mp4', fileName: title + '.mp4' }, { quoted: mek })
                    await conn.sendMessage(from, { react: { text: '🎼', key: document.key } })
                    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })
                    return fs.unlinkSync(`./${randomName}`);
                }
            } else {
                fs.unlinkSync(`./${randomName}`);
                return reply('*File size is too big!*') 
            }     
        } catch (e) {
            reply('*Error !!*')
            console.log(e)
        }
    })

    cmd({
        pattern: "yt720",
        react: "🎥",
        dontAddCommandList: true,
        filename: __filename
    },
    
        async (conn, mek, m, { from, q, reply }) => {
            try {
                if (!q) return await reply('*Need a youtube url!*')
                let info = await ytdl.getInfo(q);
                let title = info.videoDetails.title;
                const result = await youtube720(q)
                let size = await getsize(result)
                if (size.includes('MB')) {
                   size = size.replace(' MB','')
                } else if (size.includes('GB')) {
                    size = size.replace(' GB','') * 1024
                }
                if (size <= 1024) {
                    if (size <= 100) {
                        const video = await conn.sendMessage(from, { video: {url: result}}, { quoted: mek })
                        await conn.sendMessage(from, { react: { text: '🎼', key: video.key } })
                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })
                    } else {
                        const document = await conn.sendMessage(from, { document: {url: result}, mimetype: 'video/mp4', fileName: title + '.mp4' }, { quoted: mek })
                        await conn.sendMessage(from, { react: { text: '🎼', key: document.key } })
                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })
                    }
    
                } else {
                    reply('*File size is too big!*')
                }
            } catch (e) {
                reply('*Error !!*')
                console.log(e)
            }
        })


cmd({
    pattern: "song",
    alias: ["ytmp3"],
    use: '.song lelena',
    react: "🎧",
    desc: 'Download audios from youtube',
    category: "download",
    filename: __filename

},

    async (conn, m, mek, { from, q, reply }) => {
        try {
            if (!q) return await reply('*Please enter a query or a url!*')
            const url = q.replace(/\?si=[^&]*/, '');
            var results = await yts(url);
            var result = results.videos[0]
            const msg = `\`ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ᴍᴇɴᴜ🎗️\`

> *\`➤ ᴛɪᴛʟᴇ\` :* ${result.title}

> *\`➤ ᴠɪᴇᴡꜱ\` :* ${result.views}

> *\`➤ ᴅᴜʀᴀᴛɪᴏɴ\` :* ${result.duration}

> *\`➤ ᴜʀʟ\` :* ${result.url}
`

            let buttons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Audio",
                    id: ".audsong " + result.url
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Document",
                    id: ".docsong " + result.url
                }),
            }
            ]
            let message = {
                image: result.thumbnail,
                header: '',
                footer: config.FOOTER,
                body: msg

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
        } catch (e) {
            console.log(e)
            reply('*Error !!*')
        }
    });

cmd({
    pattern: "audsong",
    react: "🎧",
    dontAddCommandList: true,
    filename: __filename
},

    async (conn, mek, m, { from, q, reply }) => {
        try {
            if (!q) return await reply('*Need a youtube url!*')
            let info = await ytdl.getInfo(q);
            let title = info.videoDetails.title;
            let randomName = getRandom(".mp3");
            const stream = ytdl(q, {
                filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
            })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./${randomName}`);
            let fileSize = stats.size / (1024 * 1024);
            if (fileSize <= 1024) {
                let audio = await conn.sendMessage(from, { audio: fs.readFileSync(`./${randomName}`), mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: mek })
                await conn.sendMessage(from, { react: { text: '🎼', key: audio.key } })
                await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })
                return fs.unlinkSync(`./${randomName}`);
            } else {
                reply('*File size is too big!*')
            }
            fs.unlinkSync(`./${randomName}`);
        } catch (e) {
            reply('*Error !!*')
            console.log(e)
        }
    })

cmd({
    pattern: "docsong",
    react: "🎧",
    dontAddCommandList: true,
    filename: __filename
},

    async (conn, mek, m, { from, q, reply }) => {
        try {
            if (!q) return await reply('*Need a youtube url!*')
            let info = await ytdl.getInfo(q);
            let title = info.videoDetails.title;
            let randomName = getRandom(".mp3");
            const stream = ytdl(q, {
                filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
            })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./${randomName}`);
            let fileSize = stats.size / (1024 * 1024);
            if (fileSize <= 1024) {
                let document = await conn.sendMessage(from, { document: fs.readFileSync(`./${randomName}`), mimetype: 'audio/mpeg', fileName: title + '.mp3' }, { quoted: mek })
                await conn.sendMessage(from, { react: { text: '🎼', key: document.key } })
                await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })
                return fs.unlinkSync(`./${randomName}`);
            } else {
                reply('*File size is too big!*')
            }
            fs.unlinkSync(`./${randomName}`);
        } catch (e) {
            reply('*Error !!*')
            console.log(e)
        }
    })
