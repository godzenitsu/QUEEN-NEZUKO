const _0x5736db = function () {
  let _0x4d3e45 = true;
  return function (_0x494599, _0x5281a3) {
    const _0x29f3d4 = _0x4d3e45 ? function () {
      if (_0x5281a3) {
        const _0x33f615 = _0x5281a3.apply(_0x494599, arguments);
        _0x5281a3 = null;
        return _0x33f615;
      }
    } : function () {};
    _0x4d3e45 = false;
    return _0x29f3d4;
  };
}();
const _0x4a977d = _0x5736db(this, function () {
  return _0x4a977d.toString().search("(((.+)+)+)+$").toString().constructor(_0x4a977d).search("(((.+)+)+)+$");
});
_0x4a977d();
const util = require("util");
const {
  exec
} = require("child_process");
const {
  updatefullpp
} = require("../lib/spotify.js");
nezuko({
  'name': "fullpp",
  'fromMe': true,
  'category': 'owner',
  'desc': 'fullpp'
}, async ({
  m: _0xdbe815,
  client: _0x42965a,
  args: _0x437af9
}) => {
  try {
    if (!_0xdbe815.quoted || !_0xdbe815.quoted.message.imageMessage) {
      return _0xdbe815.reply("_Reply to an Image_");
    }
    let _0xfd3e89 = await _0xdbe815.quoted.download();
    await updatefullpp(_0xdbe815.user, _0xfd3e89, _0x42965a);
    return await _0xdbe815.reply("_Profile Picture Updated_");
  } catch (_0xd2bd38) {
    console.log(_0xd2bd38);
  }
});
nezuko({
  'name': "eval",
  'fromMe': true,
  'category': "owner",
  'desc': "Runs a server code"
}, async ({}) => {});
nezuko({
  'name': "restart",
  'fromMe': true,
  'desc': "Restart the bot",
  'category': "owner"
}, async ({
  m: _0x1c3dd0,
  args: _0xa7ff2a,
  client: _0x578674
}) => {
  await _0x1c3dd0.reply('_Restarting..._');
  exec("node index.js", (_0x33dc90, _0x5016f8, _0x360911) => {
    if (_0x33dc90) {
      return _0x578674.sendMessage(_0x1c3dd0.jid, "Error: " + _0x33dc90);
    }
    return;
  });
});
nezuko({
  'on': "text",
  'fromMe': true
}, async ({
  client: _0x4531de,
  m: _0x2b53a3,
  args: _0x20f72e
}) => {
  if (_0x20f72e.startsWith('>')) {
    try {
      let _0x25dfe6 = await eval("(async () => { " + _0x20f72e.replace('>', '') + " })()");
      if (typeof _0x25dfe6 !== 'string') {
        _0x25dfe6 = util.inspect(_0x25dfe6);
      }
      await _0x2b53a3.reply("```" + _0x25dfe6 + '```');
    } catch (_0xf40067) {
      await _0x2b53a3.reply('_' + util.format(_0xf40067) + '_');
    }
  }
});
nezuko({
  'name': 'mee',
  'fromMe': true,
  'category': "owner"
}, async ({
  m: _0x44accd,
  client: _0x17f70a,
  args: _0x137634
}) => {
  _0x44accd.sendMsg(_0x44accd.jid, '_@' + _0x44accd.sender.split('@')[0x0] + '_', {
    'mentions': [_0x44accd.sender]
  });
});
