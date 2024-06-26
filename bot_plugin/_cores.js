const {
    nezuko,
    commands,
    isPublic
} = require("../lib/commands.js");
const { performance } = require('perf_hooks');
const font = require("@viper-x/fancytext");
let venox = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "displayName": "𝐐𝐮𝐞𝐞𝐧 𝐍𝐞𝐳𝐮𝐤𝐨","vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=917907387121:917907387121\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

nezuko(
    {
        name: "jid",
        fromMe: isPublic,
        category: "misc",
    },
    async ({
        m, client, args
    }) => {
m.reply(`${m.jid}`)
    })

nezuko(
    {
        name: "runtime",
        fromMe: isPublic,
        category: "misc",
        desc: "To check bot runtime"
    },
    async ({
        m, client 
    }) => {
        return m.reply(`☁️ *ʀᴜɴᴛɪᴍᴇ* : ${await m.runtime()}_`)
    });


nezuko(
    {
        name: "ping",
        fromMe: isPublic,
        category: "misc",
        desc: "To check ping"
    },
    async ({
        m, client 
    }) => {
        
        const start = new Date().getTime();
    
  let pong = await client.sendMessage(m.jid , { text : "_Checking Ping..._" } , { quoted : venox })
  const end = new Date().getTime();

  await client.sendMessage(m.jid, { text : `_Pong : ${end - start} ms_` , edit : pong.key })
    /*
      const start = new Date().getTime();
    
  let pong = await client.sendMessage(m.jid , { text : "*❮ ᴛᴇꜱᴛɪɴɢ ᴩɪɴɢ ❯*" } , { quoted : m })
  const end = new Date().getTime();
        */
        const start1 = new Date().getTime();
  await client.sendMessage(m.jid, { text : ` *ʟᴀᴛᴇɴᴄʏ : ${end - start} ᴍꜱ📡*` , edit : pong.key })
    
        const end1 = new Date().getTime();
       const start2 = new Date().getTime();
  await client.sendMessage(m.jid, { text : ` *ʟᴀᴛᴇɴᴄʏ : ${end1 - start1} ᴍꜱ📡*` , edit : pong.key })
        const end2 = new Date().getTime();
        const start3 = new Date().getTime();
 
  await client.sendMessage(m.jid, { text : ` *ʟᴀᴛᴇɴᴄʏ : ${end2 - start2} ᴍꜱ📡*` , edit : pong.key })
        const end3 = new Date().getTime();
        const start4 = new Date().getTime();
  await client.sendMessage(m.jid, { text : ` *ʟᴀᴛᴇɴᴄʏ : ${end3 - start3} ᴍꜱ📡*` , edit : pong.key })
        const end4 = new Date().getTime();
        const start5 = new Date().getTime();
  await client.sendMessage(m.jid, { text : ` *ʟᴀᴛᴇɴᴄʏ : ${end4 - start4} ᴍꜱ📡*` , edit : pong.key })
        const end5 = new Date().getTime();
  await client.sendMessage(m.jid, { text : ` *ʟᴀᴛᴇɴᴄʏ : ${end5 - start5} ᴍꜱ📡*` , edit : pong.key })
    });


nezuko(
    {
        name: "wame",
        fromMe: true,
        desc: "sends users number",
        category: "owner"
    },
    async ({
        m, client, args
    }) => {
let data = m.quoted.sender.split("@")[0]
return m.reply(`https://wa.me/${data}?text=${args}`)
    }
    );
