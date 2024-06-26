const _0x3ccfcc = function () {
  let _0x12e4f0 = true;
  return function (_0x21a620, _0x1de63a) {
    const _0x540b6b = _0x12e4f0 ? function () {
      if (_0x1de63a) {
        const _0x67533c = _0x1de63a.apply(_0x21a620, arguments);
        _0x1de63a = null;
        return _0x67533c;
      }
    } : function () {};
    _0x12e4f0 = false;
    return _0x540b6b;
  };
}();
const _0x4f6632 = _0x3ccfcc(this, function () {
  return _0x4f6632.toString().search("(((.+)+)+)+$").toString().constructor(_0x4f6632).search("(((.+)+)+)+$");
});
_0x4f6632();
const googleTTS = require('google-tts-api');
const info = require('../info.js');
const {
  STICKER_DATA
} = require("../info.js");
const {
  toAudio,
  AudioData,
  toVideo
} = require("../lib/functions.js");
nezuko({
  'name': 'sticker',
  'fromMe': isPublic,
  'desc': "Converts an image to sticker",
  'category': "converter"
}, async ({
  m: _0x113903,
  client: _0x3f7451,
  args: _0x2385e1
}) => {
  if (!_0x113903.quoted || !(_0x113903.quoted.message.imageMessage || _0x113903.quoted.message.videoMessage || _0x113903.quoted.message.stickerMessage)) {
    return await _0x113903.reply("_Reply to photo or video_");
  }
  if (_0x2385e1) {
    let [_0x3a55bf, _0x59f5e3] = _0x2385e1.split(',');
    let _0x223136 = await _0x113903.quoted.download();
    _0x113903.sendMsg(_0x113903.jid, _0x223136, {
      'packname': _0x3a55bf || '',
      'author': _0x59f5e3 || '',
      'quoted': _0x113903
    }, "sticker");
  } else {
    let _0x4f77a1 = await _0x113903.quoted.download();
    _0x113903.sendMsg(_0x113903.jid, _0x4f77a1, {
      'packname': '' + STICKER_DATA.split(';')[0x0],
      'author': '' + STICKER_DATA.split(';')[0x1],
      'quoted': _0x113903
    }, "sticker");
  }
});
nezuko({
  'name': "mp3",
  'fromMe': isPublic,
  'desc': "Converts an Video/Voice to Mp3",
  'category': "converter"
}, async ({
  m: _0x26052b,
  client: _0x4a929e,
  args: _0x1a937b
}) => {
  if (!_0x26052b.quoted || !(_0x26052b.quoted.message.audioMessage || _0x26052b.quoted.message.videoMessage)) {
    return await _0x26052b.reply("_Reply to voice or video_");
  }
  let _0x151d2f = await _0x26052b.quoted.download();
  return _0x26052b.sendMsg(_0x26052b.jid, _0x151d2f, {
    'mimetype': "audio/mpeg"
  }, "audio");
});
nezuko({
  'name': 'tts',
  'fromMe': isPublic,
  'category': 'converter',
  'desc': "text to speech"
}, async ({
  m: _0x372908,
  client: _0x50d2fa,
  args: _0x13a703
}) => {
  if (!_0x13a703) {
    _0x372908.reply("_Enter Query!_");
  } else {
    let [_0x16b38f, _0xcf0653] = _0x13a703.split`:`;
    const _0x22c189 = googleTTS.getAudioUrl('' + _0x16b38f, {
      'lang': _0xcf0653 || 'ml',
      'slow': false,
      'host': "https://translate.google.com"
    });
    _0x50d2fa.sendMessage(_0x372908.jid, {
      'audio': {
        'url': _0x22c189
      },
      'mimetype': "audio/mpeg",
      'ptt': true,
      'fileName': "tts.mp3"
    }, {
      'quoted': _0x372908
    });
  }
});
nezuko({
  'name': "wave",
  'fromMe': isPublic,
  'category': "converter",
  'desc': "audio in wave format"
}, async ({
  m: _0x55fd5c,
  client: _0x304c01,
  args: _0x5829fc
}) => {
  if (!_0x55fd5c.quoted || !(_0x55fd5c.quoted.message.audioMessage || _0x55fd5c.quoted.message.documentMessage)) {
    return await _0x55fd5c.reply("_Reply to Audio Message_");
  }
  let _0x1c0168 = await _0x55fd5c.quoted.download();
  _0x55fd5c.sendMsg(_0x55fd5c.jid, _0x1c0168, {
    'audiowave': Array.from({
      'length': 0x1e
    }, () => Math.floor(Math.random() * 0x64)),
    'ptt': true,
    'mimetype': "audio/mpeg"
  }, 'audio');
});
nezuko({
  'name': "tomp4",
  'fromMe': isPublic,
  'category': "converter",
  'desc': "convert a document video to normal video"
}, async ({
  m: _0x3a81f6,
  client: _0x50cb31,
  args: _0xcb91fb
}) => {
  if (!_0x3a81f6.quoted || !(_0x3a81f6.quoted.message.videoMessage || _0x3a81f6.quoted.message.documentMessage)) {
    return await _0x3a81f6.reply("_Reply to a video_");
  }
  await _0x3a81f6.reply("_Loading..._");
  let _0x3b0e01 = await _0x3a81f6.quoted.download();
  _0x50cb31.sendMessage(_0x3a81f6.jid, {
    'video': _0x3b0e01
  });
});
nezuko({
  'name': 'toimage',
  'fromMe': isPublic,
  'category': "converter",
  'desc': "convert a document image to normal image"
}, async ({
  m: _0x2d2d7e,
  client: _0x36a500,
  args: _0x5e07af
}) => {
  if (!_0x2d2d7e.quoted || !(_0x2d2d7e.quoted.message.imageMessage || _0x2d2d7e.quoted.message.documentMessage)) {
    return await _0x2d2d7e.reply("_Reply to an image_");
  }
  await _0x2d2d7e.reply("_Converting..._");
  let _0xfb01b1 = await _0x2d2d7e.quoted.download();
  _0x36a500.sendMessage(_0x2d2d7e.jid, {
    'image': _0xfb01b1
  });
});
nezuko({
  'name': 'caption',
  'fromMe': isPublic,
  'category': "converter",
  'desc': "give custom captions"
}, async ({
  m: _0x1fffac,
  client: _0x35c4ed,
  args: _0x43545
}) => {
  if (!_0x1fffac.quoted || !(_0x1fffac.quoted.message.imageMessage || _0x1fffac.quoted.message.videoMessage || _0x1fffac.quoted.message.documentMessage)) {
    return await _0x1fffac.reply("_Reply to photo or video_");
  }
  await _0x1fffac.reply("_Please Wait 2 secs...._");
  let _0x300de0 = await _0x1fffac.quoted.download();
  if (_0x1fffac.quoted.message.videoMessage) {
    await _0x35c4ed.sendMessage(_0x1fffac.jid, {
      'video': _0x300de0,
      'mimetype': "video/mp4",
      'caption': _0x43545
    }, {
      'quoted': _0x1fffac
    });
  } else if (_0x1fffac.quoted.message.imageMessage) {
    await _0x35c4ed.sendMessage(_0x1fffac.jid, {
      'image': _0x300de0,
      'mimetype': "image/jpeg",
      'caption': _0x43545
    }, {
      'quoted': _0x1fffac
    });
  }
});
nezuko({
  'name': 'take',
  'fromMe': isPublic,
  'category': "converter",
  'desc': "give custom captions"
}, async ({
  m: _0x1d1d5e,
  client: _0x3bfa7a,
  args: _0x8fa8d
}) => {
  if (!_0x1d1d5e.quoted.message.stickerMessage && !_0x1d1d5e.quoted.message.audioMessage && !_0x1d1d5e.quoted.message.imageMessage && !_0x1d1d5e.quoted.message.videoMessage) {
    return _0x1d1d5e.reply("reply to a sticker/audio");
  }
  if (_0x1d1d5e.quoted.message.stickerMessage || _0x1d1d5e.quoted.message.imageMessage || _0x1d1d5e.quoted.message.videoMessage) {
    _0x8fa8d = _0x8fa8d || info.STICKER_DATA;
    let _0x232697 = await _0x1d1d5e.quoted.download();
    return await _0x1d1d5e.sendMsg(_0x1d1d5e.jid, _0x232697, {
      'packname': _0x8fa8d.split(/[|,;]/)[0x0] || _0x8fa8d,
      'author': _0x8fa8d.split(/[|,;]/)[0x1]
    }, "sticker");
  } else {
    if (_0x1d1d5e.quoted.message.audioMessage) {
      const _0x233519 = {
        'title': _0x8fa8d ? _0x8fa8d.split(/[|,;]/) ? _0x8fa8d.split(/[|,;]/)[0x0] : _0x8fa8d : info.INFO.split(/[|,;]/)[0x0] ? info.INFO.split(/[|,;]/)[0x0] : info.INFO,
        'body': _0x8fa8d ? _0x8fa8d.split(/[|,;]/)[0x1] : info.INFO.split(/[|,;]/)[0x1],
        'image': _0x8fa8d && _0x8fa8d.split(/[|,;]/)[0x2] ? _0x8fa8d.split(/[|,;]/)[0x2] : info.INFO.split(/[|,;]/)[0x2]
      };
      const _0x17f025 = await AudioData(await toAudio(await _0x1d1d5e.quoted.download()), _0x233519);
      return await _0x1d1d5e.sendMsg(_0x1d1d5e.jid, _0x17f025, {
        'mimetype': "audio/mpeg"
      }, "audio");
    }
  }
});
nezuko({
  'name': "black",
  'fromMe': isPublic,
  'category': "converter",
  'desc': "give custom captions"
}, async ({
  m: _0x1de64f,
  client: _0x5d4c6b,
  args: _0x34a06e
}) => {
  if (!_0x1de64f.quoted || !(_0x1de64f.quoted.message.audioMessage || _0x1de64f.quoted.message.documentMessage)) {
    return await _0x1de64f.reply("_Reply to Audio Message_");
  }
  let _0x544da8 = await _0x1de64f.quoted.download();
  const _0x4a26f6 = await toVideo(_0x544da8);
  _0x1de64f.sendMsg(_0x1de64f.jid, _0x4a26f6, {}, "video");
});
