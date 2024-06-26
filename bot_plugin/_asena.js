const _0x28f84a = function () {
  let _0x4bc293 = true;
  return function (_0x29895c, _0x52f37c) {
    const _0x59f98b = _0x4bc293 ? function () {
      if (_0x52f37c) {
        const _0x3ece64 = _0x52f37c.apply(_0x29895c, arguments);
        _0x52f37c = null;
        return _0x3ece64;
      }
    } : function () {};
    _0x4bc293 = false;
    return _0x59f98b;
  };
}();
const _0x12d61e = _0x28f84a(this, function () {
  return _0x12d61e.toString().search("(((.+)+)+)+$").toString().constructor(_0x12d61e).search("(((.+)+)+)+$");
});
_0x12d61e();
const simpleGit = require("simple-git");
const git = simpleGit();
const info = require("../info.js");
const Heroku = require("heroku-client");
const heroku = new Heroku({
  'token': info.HKEY
});
nezuko({
  'name': "update",
  'fromMe': true,
  'desc': "updates the bot",
  'category': "owner"
}, async ({
  m: _0x636d3f,
  args: _0x12be76,
  client: _0x1cb139
}) => {
  if (_0x12be76 === 'now') {
    await git.fetch();
    var _0x7e3fe7 = await git.log(["main..origin/main"]);
    if (_0x7e3fe7.total === 0x0) {
      return await _0x636d3f.reply("*_Nezuko is already on updated version_*");
    } else {
      await _0x636d3f.reply("*_Update Started_*");
      try {
        var _0x22f4be = await heroku.get("/apps/" + info.HAPP);
      } catch {
        await _0x636d3f.reply("_Invalid Heroku Details_");
        await new Promise(_0x4c9488 => setTimeout(_0x4c9488, 0x3e8));
      }
      git.fetch("upstream", 'main');
      git.reset("hard", ['FETCH_HEAD']);
      var _0x3cd6e2 = _0x22f4be.git_url.replace("https://", "https://api:" + info.HKEY + '@');
      try {
        await git.addRemote('heroku', _0x3cd6e2);
      } catch {
        console.log("heroku remote error");
      }
      await git.push("heroku", "main");
      await _0x636d3f.reply("*_ɴᴇᴢᴜᴋᴏ ɪꜱ ᴜᴩᴅᴀᴛᴇᴅ_*");
    }
  }
  await git.fetch();
  var _0x7e3fe7 = await git.log(["main..origin/main"]);
  if (_0x7e3fe7.total === 0x0) {
    await _0x636d3f.reply("*_ɴᴇᴢᴜᴋᴏ ɪꜱ ᴜᴩ-ᴛᴏ-ᴅᴀᴛᴇ!!!_*");
  } else {
    var _0x2b9249 = "*ɴᴇᴢᴜᴋᴏ ɪꜱ ᴏᴜᴛ ᴏꜰ ᴅᴀᴛᴇ, ᴩʟᴇᴀꜱᴇ ᴜᴩᴅᴀᴛᴇ* \n\n";
    _0x7e3fe7.all.map((_0x48d3ef, _0x20ea4a) => {
      _0x2b9249 += _0x20ea4a + 0x1 + " ⭙ " + _0x48d3ef.m + "\n";
    });
    return await _0x1cb139.sendMessage(_0x636d3f.jid, {
      'text': _0x2b9249,
      'footer': "ᴄʟɪᴄᴋ ʜᴇʀᴇ ᴛᴏ ᴜᴩᴅᴀᴛᴇ"
    });
  }
});
