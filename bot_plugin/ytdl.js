const _0x4f10a0 = function () {
  let _0x415ea0 = true;
  return function (_0xb5c78c, _0x51becc) {
    const _0x255825 = _0x415ea0 ? function () {
      if (_0x51becc) {
        const _0x17d9db = _0x51becc.apply(_0xb5c78c, arguments);
        _0x51becc = null;
        return _0x17d9db;
      }
    } : function () {};
    _0x415ea0 = false;
    return _0x255825;
  };
}();
const _0x7dfc2d = _0x4f10a0(this, function () {
  return _0x7dfc2d.toString().search("(((.+)+)+)+$").toString().constructor(_0x7dfc2d).search("(((.+)+)+)+$");
});
_0x7dfc2d();
const fetch = require("node-fetch");
const yts = require("yt-search");
const axios = require("axios");
const {
  AddMp3Meta
} = require("../lib/functions.js");
nezuko({
  'name': 'xv',
  'fromMe': isPublic,
  'desc': "Instagram downloader",
  'category': "downloader"
}, async ({
  m: _0x175c4f,
  client: _0x1e5761,
  args: _0x16412c
}) => {
  let _0x43da56 = await fetch("https://api-aswin-sparky.koyeb.app/api/search/xvideos?search=" + _0x16412c);
  var _0x578917 = await _0x43da56.json();
  let _0xa68dbe = "xv search results\n\n";
  for (let _0x347348 = 0x1; _0x347348 < 0xb; _0x347348++) {
    _0xa68dbe += "\nTITLE : " + _0x578917.data[_0x347348].title + "\nDURATION : " + _0x578917.data[_0x347348].duration + "\nURL : " + _0x578917.data[_0x347348].url + "\n";
  }
  return _0x175c4f.adreply('' + _0xa68dbe);
});
nezuko({
  'name': 'yt',
  'fromMe': isPublic,
  'category': "downloader",
  'desc': "To download yt vid/aud"
}, async ({
  m: _0x570db9,
  client: _0x299473,
  args: _0x200800
}) => {
  if (!_0x200800) {
    return _0x570db9.reply("_Enter a Query !_");
  }
  let _0x520d1d = await _0x299473.sendMessage(_0x570db9.jid, {
    'text': "_Searching..._"
  }, {
    'quoted': _0x570db9
  });
  let _0x3eccca = "_Youtube Downloader_\n\n";
  let _0x18542f = await yts('' + _0x200800);
  let _0x1c5384 = _0x18542f.all;
  for (let _0x13be2b = 0x1; _0x13be2b < 0xb; _0x13be2b++) {
    _0x3eccca += '_' + _0x13be2b + " ." + _0x1c5384[_0x13be2b].title + "_\n";
  }
  return _0x299473.sendMessage(_0x570db9.jid, {
    'text': '' + _0x3eccca,
    'edit': _0x520d1d.key
  });
});
nezuko({
  'name': 'play',
  'fromMe': isPublic,
  'category': "downloader",
  'desc': "To download song"
}, async ({
  m: _0x56ec1e,
  client: _0x321e2b,
  args: _0x30c0d5
}) => {
  _0x30c0d5 = _0x30c0d5 || _0x56ec1e.quoted?.['text'];
  if (!_0x30c0d5) {
    return _0x56ec1e.reply("_Enter a Query !_");
  }
  let _0x4996be = await _0x321e2b.sendMessage(_0x56ec1e.jid, {
    'text': "_Searching..._"
  }, {
    'quoted': _0x56ec1e
  });
  const _0x4b8a44 = await axios.get("https://api-viper-x.koyeb.app/api/song?name=" + _0x30c0d5);
  let _0x334936 = await _0x4b8a44.data;
  let _0x16cbb4 = await (await fetch('' + _0x334936.data.thumbnail)).buffer();
  _0x321e2b.sendMessage(_0x56ec1e.jid, {
    'text': "_Downloading : " + _0x334936.data.title + '_',
    'edit': _0x4996be.key
  });
  const _0x111c8f = await (await fetch('' + _0x334936.data.downloadUrl)).buffer();
  const _0x51fcb1 = await AddMp3Meta(_0x111c8f, _0x16cbb4, {
    'title': _0x334936.data.title,
    'artist': _0x334936.data.channel.name
  });
  return await _0x321e2b.sendMessage(_0x56ec1e.jid, {
    'audio': _0x51fcb1,
    'mimetype': 'audio/mpeg'
  }, {
    'quoted': _0x56ec1e
  });
});
