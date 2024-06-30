const { cmd } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
        pattern: "ig",
        react: "🎉",
        desc: "send instragram url🕊️.",
        category: "downloader",
        filename: __filename
    },
    async(conn, mek, m,{from, q}) => {
if(!q) return m.reply('*Need Link🐦.*')
let response = await Insta(q)
for (let i=0;i<response.length;i++) {
await conn.sendFileUrl(from, response[i], `*Downloaded Media from instagram.*`, mek)
}
    });
