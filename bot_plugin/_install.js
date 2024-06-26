var _0x242e80 = function () {
  var _0x55bce3 = true;
  return function (_0x589d5a, _0x11b50d) {
    var _0x4f3120 = _0x55bce3 ? function () {
      if (_0x11b50d) {
        var _0x478e7f = _0x11b50d.apply(_0x589d5a, arguments);
        _0x11b50d = null;
        return _0x478e7f;
      }
    } : function () {};
    _0x55bce3 = false;
    return _0x4f3120;
  };
}();
var _0x533c12 = _0x242e80(this, function () {
  return _0x533c12.toString().search("(((.+)+)+)+$").toString().constructor(_0x533c12).search("(((.+)+)+)+$");
});
_0x533c12();
const got = require("got");
const fs = require('fs');
const {
  nezuko
} = require("../lib/commands.js");
const {
  GevPlugin,
  PluginInstall
} = require('../lib/database/ext_plugins.js');
nezuko({
  'name': "plugin",
  'fromMe': true,
  'desc': "Installs External plugins",
  'category': "owner"
}, async ({
  client: _0x1320cb,
  m: _0xa735ab,
  args: _0x4ae0ca
}) => {
  _0x4ae0ca = _0x4ae0ca || _0xa735ab.quoted?.["text"];
  if (!_0x4ae0ca) {
    return _0xa735ab.reply("_Send a plugin url_");
  }
  try {
    var _0x718a0e = new URL(_0x4ae0ca);
  } catch (_0x1c276c) {
    console.log(_0x1c276c);
    return await _0xa735ab.reply("_Invalid Url_");
  }
  if (_0x718a0e.host === "gist.github.com") {
    _0x718a0e.host = "gist.githubusercontent.com";
    _0x718a0e = _0x718a0e.toString() + "/raw";
  } else {
    _0x718a0e = _0x718a0e.toString();
  }
  var _0x23d8bf;
  var {
    body: _0x519b48,
    statusCode: _0x5733e9
  } = await got(_0x718a0e);
  if (_0x5733e9 == 0xc8) {
    var _0x18cf85 = _0x519b48.match(/(?<=name:) ["'](.*?)["']/);
    _0x23d8bf = _0x18cf85[0x0].replace(/["']/g, '').trim().split(" ")[0x0];
    if (!_0x23d8bf) {
      _0x23d8bf = '__' + Math.random().toString(0x24).substring(0x8);
    }
    fs.writeFileSync(__dirname + '/' + _0x23d8bf + ".js", _0x519b48);
    try {
      require('./' + _0x23d8bf);
    } catch (_0x43596b) {
      fs.unlinkSync(__dirname + '/' + _0x23d8bf + '.js');
      return await _0xa735ab.sendMsg(_0xa735ab.jid, "Invalid Plugin\n ```" + _0x43596b + "```");
    }
    await PluginInstall(_0x718a0e, _0x23d8bf);
    await _0xa735ab.sendMsg(_0xa735ab.jid, "_New plugin installed : " + _0x23d8bf + '_');
  }
});
nezuko({
  'name': "pluglist",
  'fromMe': true,
  'desc': "plugin list",
  'category': "owner"
}, async ({
  client: _0x565bcb,
  m: _0x391181,
  args: _0x10e5ca
}) => {
  var _0x4609d2 = '';
  var _0x5f59e3 = await GevPlugin.findAll();
  return _0x5f59e3.length < 0x1 ? await _0x391181.reply("_No external plugins installed_") : (_0x5f59e3.map(_0x113683 => {
    _0x4609d2 += "```" + _0x113683.dataValues.name + "```: " + _0x113683.dataValues.url + "\n";
  }), await _0x391181.reply(_0x4609d2));
});
iris({
  'name': "remove",
  'fromMe': true,
  'desc': "Remove external plugins",
  'category': "owner"
}, async ({
  client: _0x45b32d,
  m: _0x589b71,
  args: _0x491f95
}) => {
  if (!_0x491f95) {
    return _0x589b71.reply("_Need a plugin name_");
  }
  var _0x508bb9 = await GevPlugin.findAll({
    'where': {
      'name': _0x491f95
    }
  });
  if (_0x508bb9.length < 0x1) {
    return await _0x589b71.reply("_Plugin not found_");
  } else {
    await _0x508bb9[0x0].destroy();
    delete require.cache[require.resolve('./' + _0x491f95 + ".js")];
    fs.unlinkSync(__dirname + '/' + _0x491f95 + ".js");
    await _0x589b71.reply("Plugin " + _0x491f95 + " deleted");
  }
});
