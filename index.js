const fs = require('fs');
const {
  promises: fsPromises
} = fs;
const path = require('path');
const axios = require('axios');
const cron = require('node-cron');
const {
  version
} = require('./package.json');
const {
  makeWASocket,
  useMultiFileAuthState,
  makeInMemoryStore,
  makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");
const web = require('./lib/node.js');
const MsgHandler = require("./lib/handler.js");
const {
  Client
} = require("./lib/client.js");
const P = require("pino");
function logError(_0x12f694) {
  console.error("Error occurred:", _0x12f694);
}
async function createSessionAndWriteCredsToFile(_0xa7a232, _0x425e76, _0x3c024a) {
  try {
    await fsPromises.mkdir(_0x425e76, {
      'recursive': true
    });
    const _0x15ab3a = await axios.post('https://api.lokiser.xyz/mongoose/session/restore', {
      'id': _0xa7a232,
      'mongoUrl': _0x3c024a
    });
    const _0x129858 = _0x15ab3a.data.data;
    const _0x505e86 = path.join(_0x425e76, "creds.json");
    await fsPromises.writeFile(_0x505e86, _0x129858);
    console.log("creds json succesfully created!!");
  } catch (_0x499625) {
    console.error("Aɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ:", _0x499625.message);
  }
}
function start() {
  const _0x11f62c = function () {
    let _0x87e84c = true;
    return function (_0x4b2529, _0xebe6ab) {
      const _0x1443c2 = _0x87e84c ? function () {
        if (_0xebe6ab) {
          const _0x121b05 = _0xebe6ab.apply(_0x4b2529, arguments);
          _0xebe6ab = null;
          return _0x121b05;
        }
      } : function () {};
      _0x87e84c = false;
      return _0x1443c2;
    };
  }();
  const _0x5b5b7d = _0x11f62c(this, function () {
    return _0x5b5b7d.toString().search("(((.+)+)+)+$").toString().constructor(_0x5b5b7d).search("(((.+)+)+)+$");
  });
  _0x5b5b7d();
  try {
    async function _0xa45e9a() {
      try {
        await createSessionAndWriteCredsToFile(SESSION_ID, './lib/session', "mongodb+srv://hunternight691:wfgasSwGcbQnkKD1@cluster0.pvilxll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        const {
          state: _0x2a4576,
          saveCreds: _0x5c60af
        } = await useMultiFileAuthState(path.join(__dirname, "lib", 'session'));
        const _0x53525d = makeWASocket({
          'auth': {
            'creds': _0x2a4576.creds,
            'keys': makeCacheableSignalKeyStore(_0x2a4576.keys, P({
              'level': "fatal"
            }).child({
              'level': "fatal"
            }))
          },
          'browser': ["NEZUKO-MD", "firefox", "1.0.0"],
          'downloadHistory': false,
          'syncFullHistory': false,
          'logger': P({
            'level': 'silent'
          }),
          'printQRInTerminal': true,
          'getMessage': async _0x17e1f2 => (_0x4c1715.loadMessage(_0x17e1f2.id) || {}).message || {
            'conversation': null
          }
        });
        const _0x30c7c9 = new Client(_0x53525d);
        const _0x4c1715 = makeInMemoryStore({
          'logger': P().child({
            'level': "silent",
            'stream': "store"
          })
        });
        _0x4c1715.bind(_0x30c7c9.ev);
        setInterval(() => _0x4c1715.writeToFile(path.join(__dirname, "lib", "database", "store.json")), 30000);
        cron.schedule("0 */5 * * *", () => {
          _0xa45e9a();
        }, {
          'scheduled': false
        }).start();
        _0x30c7c9.ev.on('connection.update', async _0x2d685a => {
          const {
            connection: _0x265f11
          } = _0x2d685a;
          if (_0x265f11 === "open") {
            console.log("ɴᴇᴢᴜᴋᴏ-ᴍᴅ ᴀʟɪᴠᴇ  ✅");
            _0x30c7c9.sendMessage(_0x30c7c9.user.id, {
              'text': "\n╭━━━━◇\n║ *『 𝙉𝙀𝙕𝙐𝙆𝙊-𝙈𝘿 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿 ✅ 』*\n║ _ᴛʜᴇ ʙᴏᴛ ɪs ʀᴜɴɴɪɴɢ ɪɴ ʏᴏᴜʀ ᴀᴄᴄᴏᴜɴᴛ_\n╰━━━━━━━━━━━━━━━━━━━━┈⊷\n╭━━━━━◇\n║  『••• 𝙀𝙭𝙩𝙧𝙖-𝘾𝙤𝙣𝙛𝙞𝙜𝙪𝙧𝙖𝙩𝙞𝙤𝙣𝙨 •••』\n║⌑*ᴠᴇʀsɪᴏɴ:* _" + version + "_\n║⌑ *sᴜᴅᴏ:* _" + INFO.split(';')[0x1] + "_\n║⌑ *ᴍᴏᴅᴇ:* _" + MODE + "_\n║⌑ *ᴘʀᴇꜰɪx:* _" + HANDLERS + "_\n║⌑ *ʙʀᴀɴᴄʜ:* _ᴍᴀɪɴ_\n╰━━━━━━━━━━━━━━━━━━━━┈⊷ ",
              'contextInfo': {
                'externalAdReply': {
                  'title': '𝐐𝐮𝐞𝐞𝐧 𝐍𝐞𝐳𝐮𝐤𝐨',
                  'body': "ʙᴏᴛ ɪꜱ ᴀʟɪᴠᴇ🎗️",
                  'thumbnailUrl': '' + INFO.split(';')[0x2],
                  'mediaType': 0x1,
                  'mediaUrl': "https://whatsapp.com/channel/0029VaHt1710AgWB1B0Lkg0Q",
                  'sourceUrl': 'https://whatsapp.com/channel/0029VaV63w1JENxsHsm43B0h'
                }
              }
            });
            console.log("ʟᴏᴀᴅɪɴɢ ᴩʟᴜɢɪɴꜱ ⏳");
            fsPromises.readdir("./bot_plugin").then(_0x2be822 => {
              _0x2be822.forEach(_0x1e1092 => {
                if (path.extname(_0x1e1092).toLowerCase() == ".js") {
                  require("./plugins/" + _0x1e1092);
                }
              });
            })["catch"](_0x8824 => {
              console.error("Error reading directory:", _0x8824);
            });
            console.log("ᴩʟᴜɢɪɴꜱ ʟᴏᴀᴅᴇᴅ✅");
            console.log("\n======[ ᴡʜᴀᴛsᴀᴘᴘ-ʟᴏɢs ]======\n");
          }
        });
        _0x30c7c9.ev.on("creds.update", _0x5c60af);
        _0x30c7c9.ev.on("messages.upsert", async _0xc0fbaf => {
          await MsgHandler(_0x30c7c9, _0xc0fbaf);
        });
      } catch (_0x5b09d8) {
        logError(_0x5b09d8);
      }
    }
    process.on('uncaughtException', logError);
    setTimeout(() => {
      web("ᴄᴏɴɴᴇᴄᴛᴇᴅ ✅");
      _0xa45e9a();
    }, 0x1388);
  } catch (_0x28f604) {
    logError(_0x28f604);
  }
}
start();
