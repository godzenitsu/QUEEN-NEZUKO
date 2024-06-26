const { nezuko, isPublic } = require("../lib/commands.js");
const axios = require('axios');
const { dare, truth, random_question } = require('../lib/truth-dare.js');
const info = require('../info.js');
//---------------------------------------------------------------------------
iris(
    {
        name: "question",
        fromMe: isPublic,
        desc: "random questions",
        category: "fun",
    },
    async ({
        m, client 
    }) => {
        return await m.reply(`${random_question()}`);
    }
);

//---------------------------------------------------------------------------
nezuko(
    {
        name: "truth",
        fromMe: isPublic,
        desc: "random truth",
        category: "fun",
    },
    async ({
        m, client 
    }) => {
        return await m.reply(`${truth()}`);
    }
);

//---------------------------------------------------------------------------
nezuko(
    {
        name: "dare",
        fromMe: isPublic,
        desc: "random dare",
        category: "fun",
    },
    async ({
        m, client 
    }) => {
        return await m.reply(`${dare()}`);
    }
);

//---------------------------------------------------------------------------
nezuko(
    {
        name: "fact",
        fromMe: isPublic,
        desc: "sends random facts",
        category: "fun",
    },
    async ({
        m, client 
    }) => {
        try {
            const { data } = await axios.get(`https://nekos.life/api/v2/fact`);
            return m.reply(`*Fact:* ${data.fact}\n\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɴᴇᴢᴜᴋᴏ-ʙᴏᴛ*`);
        } catch (error) {
            console.error("Error fetching random fact:", error);
            return m.reply("Sorry, couldn't fetch a random fact at the moment.");
        }
    }
);

//---------------------------------------------------------------------------
nezuko(
    {
        name: "quotes",
        fromMe: isPublic,
        desc: "sends random quotes",
        category: "fun",
    },
    async ({
        m, client 
    }) => {
        try {
            const { data } = await axios.get(`https://favqs.com/api/qotd`);
            const replyf = `
                ╔════◇
                ║ *⭐Content:* ${data.quote.body}
                ║ *👤Author:* ${data.quote.author}
                ║    
                ╚════════════╝ `;
            return m.reply(replyf);
        } catch (error) {
            console.error("Error fetching random quote:", error);
            return m.reply("Sorry, couldn't fetch a random quote at the moment.");
        }
    }
);
