const { nezuko } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

nezuko({
        pattern: "insta",
        react: "🤝",
        desc: "send instragram url☁️.",
        category: "downloader",
        filename: __filename
    },
    async(conn, mek, m,{from, q}) => {
if(!q) return m.reply('*Please Send Me Instragram link 🐦.*')
let response = await Insta(q)
for (let i=0;i<response.length;i++) {
await conn.sendFileUrl(from, response[i], `*Downloaded Media from instagram.*`, mek)
}
    });
