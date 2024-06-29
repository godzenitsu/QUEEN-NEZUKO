const _0xd5c7bb = function () {
  let _0x5b28b2 = true;
  return function (_0x20a91b, _0x567eb6) {
    const _0x3fb994 = _0x5b28b2 ? function () {
      if (_0x567eb6) {
        const _0x38a158 = _0x567eb6.apply(_0x20a91b, arguments);
        _0x567eb6 = null;
        return _0x38a158;
      }
    } : function () {};
    _0x5b28b2 = false;
    return _0x3fb994;
  };
}();
const _0x2ded83 = _0xd5c7bb(this, function () {
  return _0x2ded83.toString().search("(((.+)+)+)+$").toString().constructor(_0x2ded83).search("(((.+)+)+)+$");
});
_0x2ded83();
const {
  nezuko,
  commands,
  isPublic
} = require("../lib/commands.js");
const plugins = require("../lib/commands.js");
const {
  INFO,
  HANDLERS,
  MODE,
  URL
} = require('../info.js');
const font = require("@viper-x/fancytext");
const more = String.fromCharCode(0x200e);
const readMore = more.repeat(0xfa1);
nezuko({
  'name': "menu",
  'category': "misc",
  'fromMe': isPublic,
  'desc': "Show All commands"
}, async ({
  client: _0x36315b,
  m: _0x1accab,
  args: _0xf475e1
}) => {
  try {
    if (_0xf475e1) {
      for (let _0x3484a0 of plugins.commands) {
        if (_0x3484a0.name.test(_0xf475e1)) {
          return _0x1accab.reply("*command : " + _0xf475e1.trim() + "*\n*description : " + _0x3484a0.desc.toLowerCase() + '*');
        }
      }
      return _0x1accab.reply(font.tiny("*_Plugin Not :( _*"));
    } else {
      let _0x2ea826 = "┌⟝———ᙍ ɪɴꜰᴏ ᙊ\n│ *ʙᴏᴛ-ɴᴀᴍᴇ* : " + INFO.split(';')[0x0] + "\n│ *ᴘʟᴜɢɪɴs* : " + commands.length + "\n│ *ʜᴀɴᴅʟᴇʀ* : _[ " + HANDLERS + " ]_\n│ *ᴠᴇʀsɪᴏɴ* : 1.2.7\n│ *ᴍᴏᴅᴇ* : " + MODE + "\n│ *ᴜᴘᴛɪᴍᴇ* : " + (await _0x1accab.uptime()) + "\n│ *ᴛʏᴘᴇ-sᴄʀɪᴘᴛ* : ɴᴏᴅᴇ_ᴊs ᴀɴᴅ ᴊᴀᴠᴀꜱᴄʀɪᴩᴛ\n└⟝————ᙍᙊ\n " + readMore + "\n";
      let _0x206c3c = [];
      let _0x801b76;
      let _0x3d893c = [];
      commands.map((_0x212680, _0x15794a) => {
        if (_0x212680.name) {
          let _0x4edd25 = _0x212680.name;
          _0x801b76 = _0x4edd25.source.split("\\s*")[0x1].toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[0x2];
        }
        if (_0x212680.dontAddCommandList || _0x801b76 === undefined) {
          return;
        }
        if (!_0x212680.dontAddCommandList && _0x801b76 !== undefined) {
          let _0x341fd2;
          if (!_0x212680.category) {
            _0x341fd2 = "misc";
          } else {
            _0x341fd2 = _0x212680.category.toLowerCase();
          }
          _0x206c3c.push({
            'nezuko': _0x801b76,
            'category': _0x341fd2
          });
          if (!_0x3d893c.includes(_0x341fd2)) {
            _0x3d893c.push(_0x341fd2);
          }
        }
      });
      _0x206c3c.sort();
      _0x3d893c.sort().forEach(_0x571531 => {
        _0x2ea826 += "\n╭▱╼❲ *" + _0x571531 + "* )\n";
        let _0x5327c2 = _0x206c3c.filter(({
          category: _0x546f66
        }) => _0x546f66 == _0x571531);
        _0x5327c2.sort();
        _0x5327c2.forEach(({
          nezuko: _0x142fc6
        }, _0xf0cb98) => {
          _0x2ea826 += "││◦➛" + _0x142fc6.trim() + "\n";
        });
        _0x2ea826 += "╰───────────┈⊷\n";
      });
      let _0x1ecf33 = {
        'key': {
          'participants': "0@s.whatsapp.net",
          'remoteJid': 'status@broadcast',
          'fromMe': false,
          'id': "Halo"
        },
        'message': {
          'contactMessage': {
            'displayName': '𝐐𝐮𝐞𝐞𝐧 𝐍𝐞𝐳𝐮𝐤𝐨',
            'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=" + _0x1accab.sender.split('@')[0x0] + ':' + _0x1accab.sender.split('@')[0x0] + "\nitem1.X-ABLabel:Ponsel\nEND:VCARD"
          }
        },
        'participant': "0@s.whatsapp.net"
      };
      return await _0x36315b.sendMessage(_0x1accab.jid, {
        'text': font.tiny(_0x2ea826),
        'contextInfo': {
          'externalAdReply': {
            'title': font.tiny("Hey There " + _0x1accab.pushName),
            'body': font.tiny("this is " + INFO.split(';')[0x0]),
            'sourceUrl': URL,
            'mediaUrl': URL,
            'mediaType': 0x1,
            'showAdAttribution': true,
            'renderLargerThumbnail': false,
            'thumbnailUrl': '' + INFO.split(';')[0x2]
          }
        }
      }, {
        'quoted': _0x1ecf33
      });
    }
  } catch (_0x308ba8) {
    _0x1accab.error("hey : " + _0x308ba8);
  }
});
