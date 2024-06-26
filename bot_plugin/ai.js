/**
Thanks Maher Bro for Apis
**/

const {
  nezuko,
  isPublic
} = require("../lib/commands.js");
const fetch = require("node-fetch");

// AI command: chatgpt
const _0xbc02a1 = function () {
  let _0x51a670 = true;
  return function (_0x5105d9, _0x17acb7) {
    const _0x115afc = _0x51a670 ? function () {
      if (_0x17acb7) {
        const _0xe5139c = _0x17acb7.apply(_0x5105d9, arguments);
        _0x17acb7 = null;
        return _0xe5139c;
      }
    } : function () {};
    _0x51a670 = false;
    return _0x115afc;
  };
}();
const _0x58141c = _0xbc02a1(this, function () {
  return _0x58141c.toString().search("(((.+)+)+)+$").toString().constructor(_0x58141c).search("(((.+)+)+)+$");
});
_0x58141c();
nezuko({
  'name': "gpt",
  'fromMe': isPublic,
  'desc': "an ai",
  'category': 'aimenu'
}, async ({
  m: _0x42d613,
  args: _0x153446,
  reply: _0x262f04
}) => {
  const _0x1b7cd7 = _0x153446.join(" ");
  if (!_0x1b7cd7) {
    return _0x262f04("Please provide a text query. Example:.gpt Hello, ChatGPT!");
  }
  try {
    const _0x2997a0 = 'https://api.maher-zubair.tech/ai/chatgptv4?q=' + encodeURIComponent(_0x1b7cd7);
    const _0x36b447 = await fetch(_0x2997a0);
    const _0x5b997e = await _0x36b447.json();
    if (_0x36b447.ok && _0x5b997e && _0x5b997e.status === true && _0x5b997e.data) {
      const _0x32f959 = _0x5b997e.data;
      const _0x564153 = _0x42d613.sender;
      await iris.sendMessage(_0x42d613.chat, {
        'text': _0x32f959,
        'mentions': [_0x564153]
      }, {
        'quoted': _0x42d613
      });
    } else {
      return _0x262f04("Sorry, I couldn't fetch a response from the API at the moment.");
    }
  } catch (_0x604fb1) {
    console.error(_0x604fb1);
    _0x262f04("An error occurred while fetching the response from the API.");
  }
});

// AI command: dalle
iris({
  'name': "dalle",
  'fromMe': isPublic,
  'desc': "an ai",
  'category': "aimenu"
}, async ({
  m: _0x4e06a3,
  args: _0x254d55,
  reply: _0x5bb063
}) => {
  const _0x398dbc = _0x254d55.join(" ");
  if (!_0x398dbc) {
    return _0x5bb063("Please provide a text query. Example:.dalle Beautiful landscape");
  }
  try {
    const _0x3d2cbd = 'https://api.maher-zubair.tech/ai/dalle?q=' + encodeURIComponent(_0x398dbc);
    const _0x361df7 = await fetch(_0x3d2cbd);
    const _0xcad28a = await _0x361df7.json();
    if (_0x361df7.ok && _0xcad28a && _0xcad28a.status === true && _0xcad28a.data) {
      const _0x10661e = _0xcad28a.data;
      const _0x4b9fcf = _0x4e06a3.sender;
      await iris.sendMessage(_0x4e06a3.chat, {
        'text': _0x10661e,
        'mentions': [_0x4b9fcf]
      }, {
        'quoted': _0x4e06a3
      });
    } else {
      return _0x5bb063("Sorry, I couldn't fetch a response from the API at the moment.");
    }
  } catch (_0x4e48db) {
    console.error(_0x4e48db);
    _0x5bb063("An error occurred while fetching the response from the API.");
  }
});
// AI command: mathai
iris({
  'name': "mathai",
  'fromMe': isPublic,
  'desc': "an ai",
  'category': "aimenu"
}, async ({
  m: _0x1eff9c,
  args: _0x3129ed,
  reply: _0x203214
}) => {
  const _0x4e291f = _0x3129ed.join(" ");
  if (!_0x4e291f) {
    return _0x203214("Please provide a text query.");
  }
  try {
    const _0x1b86d8 = "https://api.maher-zubair.tech/ai/mathssolve?q=" + encodeURIComponent(_0x4e291f);
    const _0x1922e2 = await fetch(_0x1b86d8);
    const _0x523d9f = await _0x1922e2.json();
    if (_0x1922e2.ok && _0x523d9f && _0x523d9f.status === true && _0x523d9f.data) {
      const _0x27bc91 = _0x523d9f.data;
      const _0x59df05 = _0x1eff9c.sender;
      await iris.sendMessage(_0x1eff9c.chat, {
        'text': _0x27bc91,
        'mentions': [_0x59df05]
      }, {
        'quoted': _0x1eff9c
      });
    } else {
      return _0x203214("Sorry, I couldn't fetch a response from the API at the moment.");
    }
  } catch (_0x43509a) {
    console.error(_0x43509a);
    _0x203214("An error occurred while fetching the response from the API.");
  }
});

// AI command: bardai
iris({
  name: "bardai",
  fromMe: isPublic,
  desc: "an ai",
  category: "aimenu"
}, async ({
  m,
  args,
  reply
}) => {
  const q = args.join(" ");
  if (!q) {
    return reply(`What is your Question?`);
  }
  try {
    const response = await fetch(`https://api.maher-zubair.tech/ai/bard?q=${encodeURIComponent(q)}`);
    const responseData = await response.json();
    if (response.ok && responseData && responseData.status === true && responseData.data) {
      const message = responseData.data;
      const me = m.sender;
      await iris.sendMessage(m.chat, {
        text: message,
        mentions: [me]
      }, {
        quoted: m
      });
    } else {
      return reply("Sorry, I couldn't fetch a response from the API at the moment.");
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while fetching the response from the API.");
  }
});

// AI command: blackboxai
iris({
  'name': "blackboxai",
  'fromMe': isPublic,
  'desc': "an ai",
  'category': "aimenu"
}, async ({
  m: _0x36a7fc,
  args: _0x5a4b3a,
  reply: _0x15dfc8
}) => {
  const _0xd0e417 = _0x5a4b3a.join(" ");
  if (!_0xd0e417) {
    return _0x15dfc8("What is your Question?");
  }
  try {
    const _0x3b6c5d = "https://api.maher-zubair.tech/ai/blackboxv4?q=" + encodeURIComponent(_0xd0e417);
    const _0x4b400d = await fetch(_0x3b6c5d);
    const _0x23c5f9 = await _0x4b400d.json();
    if (_0x4b400d.ok && _0x23c5f9 && _0x23c5f9.status === true && _0x23c5f9.data) {
      const _0x50b75f = _0x23c5f9.data;
      const _0x22835c = _0x36a7fc.sender;
      await iris.sendMessage(_0x36a7fc.chat, {
        'text': _0x50b75f,
        'mentions': [_0x22835c]
      }, {
        'quoted': _0x36a7fc
      });
    } else {
      return _0x15dfc8("Sorry, I couldn't fetch a response from the API at the moment.");
    }
  } catch (_0x23a999) {
    console.error(_0x23a999);
    _0x15dfc8("An error occurred while fetching the response from the API.");
  }
});
// AI command: photoleapai
iris({
  name: "photoleapai",
  fromMe: isPublic,
  desc: "an ai",
  category: "aimenu"
}, async ({
  m,
  args,
  reply
}) => {
  const q = args.join(" ");
  if (!q) {
    return reply(`What is your Question?`);
  }
  try {
    const response = await fetch(`https://api.maher-zubair.tech/ai/photoleap?q=${encodeURIComponent(q)}`);
    const responseData = await response.json();
    if (response.ok && responseData && responseData.status === true && responseData.data) {
      const message = responseData.data;
      const me = m.sender;
      await iris.sendMessage(m.chat, {
        text: message,
        mentions: [me]
      }, {
        quoted: m
      });
    } else {
      return reply("Sorry, I couldn't fetch a response from the API at the moment.");
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while fetching the response from the API.");
  }
});

// AI command: lamaai
iris({
  name: "lamaai",
  fromMe: isPublic,
  desc: "an ai",
  category: "aimenu"
}, async ({
  m,
  args,
  reply
}) => {
  const q = args.join(" ");
  if (!q) {
    return reply(`What is your Question?`);
  }
  try {
    const response = await fetch(`https://api.maher-zubair.tech/ai/llama-2?q=${encodeURIComponent(q)}`);
    const responseData = await response.json();
    if (response.ok && responseData && responseData.status === true && responseData.data) {
      const message = responseData.data;
      const me = m.sender;
      await iris.sendMessage(m.chat, {
        text: message,
        mentions: [me]
      }, {
        quoted: m
      });
    } else {
      return reply("Sorry, I couldn't fetch a response from the API at the moment.");
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while fetching the response from the API.");
  }
});

// AI command: gemini
iris({
  'name': "gemini",
  'fromMe': isPublic,
  'desc': "an ai",
  'category': "aimenu"
}, async ({
  m: _0x53c040,
  args: _0x5e67c4,
  reply: _0x282c2e
}) => {
  const _0xe51a19 = _0x5e67c4.join(" ");
  if (!_0xe51a19) {
    return _0x282c2e("What is your Question?");
  }
  try {
    const _0x21d6e1 = 'https://api.maher-zubair.tech/ai/gemini?q=' + encodeURIComponent(_0xe51a19);
    const _0x1c43b = await fetch(_0x21d6e1);
    const _0x38a97d = await _0x1c43b.json();
    if (_0x1c43b.ok && _0x38a97d && _0x38a97d.status === true && _0x38a97d.data) {
      const _0x399ca2 = _0x38a97d.data;
      const _0x341e89 = _0x53c040.sender;
      await iris.sendMessage(_0x53c040.chat, {
        'text': _0x399ca2,
        'mentions': [_0x341e89]
      }, {
        'quoted': _0x53c040
      });
    } else {
      return _0x282c2e("Sorry, I couldn't fetch a response from the API at the moment.");
    }
  } catch (_0x2466b7) {
    console.error(_0x2466b7);
    _0x282c2e("An error occurred while fetching the response from the API.");
  }
});
