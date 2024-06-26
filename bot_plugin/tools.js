const _0x371b75 = function () {
  let _0x4c9660 = true;
  return function (_0x26b9dd, _0x188bf2) {
    const _0x35f603 = _0x4c9660 ? function () {
      if (_0x188bf2) {
        const _0x44796d = _0x188bf2.apply(_0x26b9dd, arguments);
        _0x188bf2 = null;
        return _0x44796d;
      }
    } : function () {};
    _0x4c9660 = false;
    return _0x35f603;
  };
}();
const _0x592544 = _0x371b75(this, function () {
  return _0x592544.toString().search('(((.+)+)+)+$').toString().constructor(_0x592544).search("(((.+)+)+)+$");
});
_0x592544();
const {
  nezuko,
  isPublic
} = require("../lib/commands.js");
const {
  MusicFind
} = require("../lib/spotify.js");
nezuko({
  'name': 'vo',
  'fromMe': true,
  'category': 'tools',
  'desc': "Resends the view Once message"
}, async ({
  m: _0x5e2a0a,
  client: _0xf72689
}) => {
  try {
    if (!_0x5e2a0a.quoted) {
      return _0x5e2a0a.reply("_Reply to ViewOnce Message !_");
    }
    if (_0x5e2a0a.quoted.message.viewOnceMessageV2) {
      let _0x579b7e = _0x5e2a0a.quoted.message.viewOnceMessageV2;
      if (_0x579b7e.message.imageMessage) {
        let _0x34b05b = await _0x5e2a0a.downloadAndSaveMedia(_0x579b7e.message.imageMessage, 'vo', true);
        await _0xf72689.sendMessage(_0x5e2a0a.jid, {
          'image': {
            'url': _0x34b05b
          },
          'caption': _0x579b7e.message.imageMessage.caption
        }, {
          'quoted': _0x5e2a0a
        });
      } else {
        if (_0x579b7e.message.videoMessage) {
          let _0x27a654 = await _0x5e2a0a.downloadAndSaveMedia(_0x579b7e.message.videoMessage, 'vo', true);
          await _0xf72689.sendMessage(_0x5e2a0a.jid, {
            'video': {
              'url': _0x27a654
            },
            'caption': _0x579b7e.message.videoMessage.caption
          }, {
            'quoted': _0x5e2a0a
          });
        }
      }
    } else {
      if (_0x5e2a0a.quoted.message.viewOnceMessageV2Extension.message.audioMessage) {
        let _0x44d480 = await _0x5e2a0a.downloadAndSaveMedia(_0x5e2a0a.quoted.message.viewOnceMessageV2Extension.message.audioMessage, 'vo', true);
        await _0xf72689.sendMessage(_0x5e2a0a.jid, {
          'audio': {
            'url': _0x44d480
          }
        }, {
          'quoted': _0x5e2a0a
        });
      } else {
        _0x5e2a0a.reply("_Not a ViewOnce Message !_");
      }
    }
  } catch {
    _0x5e2a0a.reply("_Error !_");
  }
});
nezuko({
  'name': "find",
  'fromMe': isPublic,
  'category': 'tools',
  'desc': "Finds music from replied Audio"
}, async ({
  m: _0x52cb64,
  client: _0x550e9e
}) => {
  if (!_0x52cb64.quoted || !(_0x52cb64.quoted.message.audioMessage || _0x52cb64.quoted.message.videoMessage)) {
    return _0x52cb64.reply("_Reply to Audio/Video Message !_");
  }
  let _0x2d2e25 = await _0x52cb64.sendMsg(_0x52cb64.jid, "*_Please wait..._*", {
    'quoted': _0x52cb64
  });
  try {
    return await MusicFind(_0x52cb64, _0x550e9e);
  } catch (_0xb92103) {
    await _0x52cb64.sendMsg(_0x52cb64.jid, "_*No result found!*_", {
      'edit': _0x2d2e25.key
    });
  }
});
nezuko({
  'name': 'ss',
  'fromMe': isPublic,
  'category': 'tools',
  'desc': "Finds music from replied Audio"
}, async ({
  m: _0x25f200,
  client: _0x444960,
  args: _0x404d7f
}) => {
  _0x404d7f = _0x404d7f || _0x25f200.quoted?.["text"];
  if (!_0x404d7f) {
    return await _0x25f200.reply("_Enter Or Reply to a link_");
  }
  let _0xaab97 = "https://toxicdevilapi.vercel.app/other/screenshot?url=" + _0x404d7f;
  _0x444960.sendMessage(_0x25f200.jid, {
    'image': {
      'url': _0xaab97
    },
    'caption': "𝐐𝐮𝐞𝐞𝐧 𝐍𝐞𝐳𝐮𝐤𝐨_"
  }, {
    'quoted': _0x25f200
  });
});
nezuko({
  'name': "save",
  'fromMe': true,
  'category': "tools",
  'desc': "Finds music from replied Audio"
}, async ({
  m: _0x48ab0e,
  client: _0x42422a,
  args: _0x2f39ff
}) => {
  if (!_0x48ab0e.quoted) {
    return _0x48ab0e.adreply("_Reply to Anyone's Status!_");
  }
  let _0x80fc07 = await _0x48ab0e.quoted.download();
  if (_0x48ab0e.quoted.message.videoMessage) {
    await _0x42422a.sendMessage(_0x48ab0e.jid, {
      'video': _0x80fc07,
      'mimetype': "video/mp4"
    }, {
      'quoted': _0x48ab0e
    });
  } else if (_0x48ab0e.quoted.message.imageMessage) {
    await _0x42422a.sendMessage(_0x48ab0e.jid, {
      'image': _0x80fc07,
      'mimetype': "image/jpeg"
    }, {
      'quoted': _0x48ab0e
    });
  }
});
