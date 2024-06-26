const { INFO, SUDO, IG } = require('../info.js');
const { nezuko, isPublic } = require("../lib/commands.js");
const { toAudio, getBuffer } = require("../lib/functions.js");

const audios = [
    "https://telegra.ph/file/816cc6a890b000297a561.mp4",
    "https://telegra.ph/file/e322e2b4d7f285f11f888.mp4",
    "https://telegra.ph/file/549b2f05d7ea98d3fe869.mp4"
];


const images = [
    "https://i.imgur.com/imOAWEN.jpeg",
    "https://i.imgur.com/imOAWEN.jpeg"
];

const title = INFO.split(';')[1];
const body = "|| ◁ㅤ❚❚ㅤ▷||ㅤ ↻";
const url = IG;
const ptt = true;

nezuko({ on: "text", fromMe: isPublic }, async ({ m, client, args }) => {
    const sudo = SUDO.split(",");
    if (args.some(arg => sudo.includes(arg))) {
        const randomAudio = audios[Math.floor(Math.random() * audios.length)];
        const randomImage = images[Math.floor(Math.random() * images.length)];

        const audioBuffer = await getBuffer(randomAudio);
        const imageBuffer = await getBuffer(randomImage);

        const audioRes = await toAudio(audioBuffer, 'mp4');

        client.sendMessage(m.jid, {
            audio: audioRes,
            mimetype: 'audio/mpeg',
            ptt: ptt,
            waveform: [0, 99, 0, 99, 0, 99, 0, 99, 0],
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: title,
                    body: body,
                    mediaType: 2,
                    thumbnail: imageBuffer,
                    mediaUrl: url,
                    sourceUrl: url,
                    showAdAttribution: true
                }
            }
        }, { quoted: m });
    }
});
