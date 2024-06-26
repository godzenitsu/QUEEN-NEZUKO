const _0x21948b = function () {
  let _0x4358eb = true;
  return function (_0x27624d, _0x1021cf) {
    const _0x5f30b6 = _0x4358eb ? function () {
      if (_0x1021cf) {
        const _0x4b5c89 = _0x1021cf.apply(_0x27624d, arguments);
        _0x1021cf = null;
        return _0x4b5c89;
      }
    } : function () {};
    _0x4358eb = false;
    return _0x5f30b6;
  };
}();
const _0x3e2e01 = _0x21948b(this, function () {
  return _0x3e2e01.toString().search("(((.+)+)+)+$").toString().constructor(_0x3e2e01).search('(((.+)+)+)+$');
});
_0x3e2e01();
const axios = require('axios');
const fetch = require("node-fetch");
const {
  AddMp3Meta
} = require('../lib/functions.js');
nezuko({
  'on': "text",
  'fromMe': isPublic
}, async ({
  m: _0x1ca361,
  client: _0x14c989,
  args: _0x91dd67
}) => {
  try {
    if (!_0x1ca361.quoted) {
      return;
    }
    const _0x552ddf = _0x1ca361.quoted.sender.split('@')[0x0];
    if (_0x14c989.user.id.split(':')[0x0] !== _0x552ddf || !parseInt(_0x1ca361.text)) {
      return;
    }
    const _0x2321ec = parseInt(_0x1ca361.text);
    if (_0x2321ec < 0x1 || _0x2321ec > 0xb) {
      return;
    }
    if (_0x1ca361.quoted.text.includes("Yᴏᴜᴛᴜʙᴇ Dᴏᴡɴʟᴏᴀᴅᴇʀ")) {
      const _0x471994 = _0x1ca361.quoted.text.split("\n");
      const _0x129d84 = _0x471994[_0x2321ec + 0x1].split(" .")[0x1].trim();
      const _0x1e871d = {
        'text': "Searching..."
      };
      const _0x187026 = await _0x14c989.sendMessage(_0x1ca361.jid, _0x1e871d, {
        'quoted': _0x1ca361
      });
      const _0x11de41 = await axios.get("https://api-viper-x.koyeb.app/api/song?name=" + _0x129d84);
      const _0x3b932f = _0x11de41.data.data;
      const _0x37380d = {
        'text': "ꜱᴇʟᴇᴄᴛ ᴛʏᴩᴇ\n\n_ᴛɪᴛɪʟᴇ : " + _0x3b932f.title + "\n_Url: " + _0x3b932f.url + "\n\n_1 .Audio_\n_2 .Video_\n\n_ʀᴇᴩʟᴀʏ ᴡɪᴛʜ ᴀ ɴᴜᴍʙᴇʀ_",
        'edit': _0x187026.key
      };
      await _0x14c989.sendMessage(_0x1ca361.jid, _0x37380d, {
        'quoted': _0x1ca361
      });
    }
    if (_0x1ca361.quoted.text.includes("Total Stories")) {
      const _0x454664 = _0x1ca361.quoted.text.match(/Url : (.+)/);
      if (!_0x454664 || !_0x454664[0x1]) {
        return _0x1ca361.sendMsg(_0x1ca361.jid, "No URL found in the text.", {
          'quoted': _0x1ca361
        });
      }
      const _0x56d521 = _0x454664[0x1].trim();
      const _0x38de48 = await axios.get("https://api-viper-x.koyeb.app/api/insta?url=" + _0x56d521);
      const _0x43fd2a = _0x38de48.data;
      if (_0x43fd2a.data && _0x43fd2a.data.length >= _0x2321ec) {
        _0x1ca361.sendMsg(_0x1ca361.jid, _0x43fd2a.data[_0x2321ec - 0x1].url, {}, _0x43fd2a.data[_0x2321ec - 0x1].type);
      } else {
        _0x1ca361.sendMsg(_0x1ca361.jid, "Invalid story number or error fetching data.", {
          'quoted': _0x1ca361
        });
      }
    }
    if (_0x1ca361.quoted.text.includes("Select Type")) {
      const _0x55b68f = _0x1ca361.quoted.text.split("\n");
      const _0x3ef0d9 = _0x55b68f[_0x2321ec + 0x4].trim().replace(/^\d+\s*\./, '');
      const _0x39eb19 = _0x1ca361.quoted.text.match(/Url: (https?:\/\/[^\s]+)/);
      const _0x1623e7 = _0x39eb19 && _0x39eb19[0x1];
      const _0xd1f198 = {
        'text': "Downloading..."
      };
      const _0x535b29 = await _0x14c989.sendMessage(_0x1ca361.jid, _0xd1f198, {
        'quoted': _0x1ca361
      });
      const _0x1d4f77 = await axios.get('https://api-viper-x.koyeb.app/api/song?name=' + _0x1623e7);
      const _0x57dbc4 = _0x1d4f77.data.data;
      if (_0x3ef0d9.includes("Audio")) {
        const _0x5c6562 = await (await fetch(_0x57dbc4.thumbnail)).buffer();
        const _0x2cbb0b = await (await fetch(_0x57dbc4.downloadUrl)).buffer();
        const _0x2a3549 = {
          'text': "Downloading : " + _0x57dbc4.title,
          'edit': _0x535b29.key
        };
        await _0x14c989.sendMessage(_0x1ca361.jid, _0x2a3549, {
          'quoted': _0x1ca361
        });
        const _0x10668e = {
          'title': _0x57dbc4.title,
          'artist': _0x57dbc4.channel.name
        };
        const _0x59cfe8 = await AddMp3Meta(_0x2cbb0b, _0x5c6562, _0x10668e);
        const _0x57ecd3 = {
          'audio': _0x59cfe8,
          'mimetype': "audio/mpeg"
        };
        _0x14c989.sendMessage(_0x1ca361.jid, _0x57ecd3, {
          'quoted': _0x1ca361
        });
      }
      if (_0x3ef0d9.includes("Video")) {
        const _0x3b34b8 = await (await fetch("https://api-viper-x.koyeb.app/api/ytdl?video360p=" + _0x57dbc4.url)).buffer();
        _0x1ca361.sendMsg(_0x1ca361.jid, _0x3b34b8, {}, "video");
      }
    }
  } catch (_0x1a98c5) {
    console.error('Error:', _0x1a98c5);
    _0x1ca361.sendMsg(_0x1ca361.jid, "An error occurred while processing your request.", {
      'quoted': _0x1ca361
    });
  }
});
