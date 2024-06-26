const fs = require('fs');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const toBool = (x) => x === 'true';
const DATABASE_URL = process.env.DATABASE_URL || './lib/database.db';
if (fs.existsSync('config.env')) {
  dotenv.config({
    path: './config.env'
  });
}


module.exports = {
    SESSION_ID: process.env.SESSION_ID || 'Queen_Nezuko_S5qnVzeJx38qBlGm5S5lT',
    HANDLERS: process.env.HANDLERS || '🧋',
    IG: process.env.IG || 'https://instagram.com/whoois.zenitsu',
    INFO: process.env.INFO || 'ɴᴇᴢᴜᴋᴏ-ᴍᴅ;ᴢᴇɴɪᴛꜱᴜʜʜ🌈;https://imgur.com/D60nScQ.jpg',
    URL: process.env.URL || 'https://zenitsu.vercel.app/',
    SUDO: process.env.SUDO || '917907387121',
    AUTO_STATUS_VIEW: process.env.AUTO_STATUS_VIEW || 'true',
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || 'true',
    MODE: process.env.MODE || 'private',
    STICKER_DATA: process.env.STICKER_DATA || '️ᴍᴀᴅᴇ ʙʏ; ɴᴇᴢᴜᴋᴏ-ᴍᴅ',
    HAPP: process.env.HAPP || '', // ɪꜰ ɴᴏᴛ ʜᴇʀᴏᴋᴜ, ᴛʜᴇɴ ᴋᴇᴇᴘ ɪᴛ ʙʟᴀɴᴋᴇᴅ
    HKEY: process.env.HKEY || '', // ɪꜰ ɴᴏᴛ ʜᴇʀᴏᴋᴜ, ᴛʜᴇɴ ᴋᴇᴇᴘ ɪᴛ ʙʟᴀɴᴋᴇᴅ
    DATABASE_URL: DATABASE_URL
};

const DATABASE = DATABASE_URL === "./lib/database.db" ?
    new Sequelize({
        dialect: "sqlite",
        storage: DATABASE_URL,
        logging: false
    }) :
    new Sequelize(DATABASE_URL, {
        dialect: "postgres",
        ssl: true,
        protocol: "postgres",
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false
    });

module.exports.DATABASE = DATABASE;
