/*  
  Message Handler
*/

// Import Module
require('./config')
require('./database/Menu/MainMenu')
require('./database/Menu/StoreMenu')
const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');

// Import Scrape
const Ai4Chat = require('./scrape/Ai4Chat');
const tiktok2 = require('./scrape/Tiktok');

module.exports = async (sock, m) => {
    const msg = m.messages[0];
    if (!msg.message) return;

    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || msg.message.videoMessage?.caption || "";
    const sender = msg.key.remoteJid;
    const pushname = msg.pushName || "User";
    const args = body.slice(1).trim().split(" ");
    const command = args.shift().toLowerCase();
    const q = args.join(" ");

    console.log(chalk.cyan(`[ LOG ] Body: ${body}, Prefix: ${prefix}, Command: ${command}`))
    
    if (!body.startsWith(prefix)) return;

    const reply = (teks) => sock.sendMessage(sender, { text: teks }, { quoted: msg });
    const isGroup = sender.endsWith('@g.us');
    const isAdmin = (admin.includes(sender))
    const menuImage = fs.readFileSync(image);

switch (command) {

// Menu
case "menu": {
    await sock.sendMessage(sender,
        {
            image: menuImage,
            caption: mainmenu,
            mentions: [sender]
        },
    { quoted: msg }
    )
}
break

// Hanya Admin
case "admin": {
    if (!isAdmin) return reply(mess.admin); // COntoh Penerapan Hanya Admin
    lenwyreply("🎁 *Kamu Adalah Admin*"); // Admin Akan Menerima Pesan Ini
}
break

// Hanya Group
case "group": {
    if (!isGroup) return reply(mess.group); // Contoh Penerapan Hanya Group
    lenwyreply("🎁 *Kamu Sedang Berada Di Dalam Grup*"); // Pesan Ini Hanya Akan Dikirim Jika Di Dalam Grup
}
break

// AI Chat
case "ai": {
    if (!q) return lenwyreply("☘️ *Contoh:* !ai Apa itu JavaScript?");
        reply(mess.wait);
    try {
        const lenai = await Ai4Chat(q);
            await reply(`*AI Assistant*\n\n${lenai}`);
                } catch (error) {
            console.error("Error:", error);
        reply(mess.error);
    }
}
break;

case "ttdl": {
    if (!q) return lenwyreply("⚠ *Mana Link Tiktoknya?*");
        reply(mess.wait);
    try {
        const result = await tiktok2(q); // Panggil Fungsi Scraper

            // Kirim Video
            await sock.sendMessage(
                sender,
                    {
                        video: { url: result.no_watermark },
                        caption: `*🎁 Tiktok Downloader*`
                    },
                { quoted: msg }
            );

        } catch (error) {
            console.error("Error TikTok DL:", error);
        reply(mess.error);
    }
}
break;

case "igdl": {
    if (!q) return lenwyreply("⚠ *Mana Link Instagramnya?*");
    try {
        reply(mess.wait);

        // Panggil API Velyn
        const apiUrl = `https://www.velyn.biz.id/api/downloader/instagram?url=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);

        if (!response.data.status || !response.data.data.url[0]) {
            throw new Error("Link tidak valid atau API error");
        }

        const data = response.data.data;
        const mediaUrl = data.url[0];
        const metadata = data.metadata;

        // Kirim Media
        if (metadata.isVideo) {
            await sock.sendMessage(
                sender,
                    {
                        video: { url: mediaUrl },
                        caption: `*Instagram Reel*\n\n` +
                            `*Username :* ${metadata.username}\n` +
                            `*Likes :* ${metadata.like.toLocaleString()}\n` +
                            `*Comments :* ${metadata.comment.toLocaleString()}\n\n` +
                            `*Caption :* ${metadata.caption || '-'}\n\n` +
                            `*Source :* ${q}`
                    },
                    { quoted: msg }
                );
        } else {
            await sock.sendMessage(
                sender,
                    {
                        image: { url: mediaUrl },
                        caption: `*Instagram Post*\n\n` +
                            `*Username :* ${metadata.username}\n` +
                            `*Likes :* ${metadata.like.toLocaleString()}\n\n` +
                            `*Caption :* ${metadata.caption || '-'}`
                    },
                    { quoted: msg }
                );
            }

        } catch (error) {
            console.error("Error Instagram DL:", error);
        reply(mess.error);
    }
}
break;

// Game Tebak Angka
case "tebakangka": {
    const target = Math.floor(Math.random() * 100);
        sock.tebakGame = { target, sender };
    reply("*Tebak Angka 1 - 100*\n*Ketik !tebak [Angka]*");
}
break;

case "tebak": {
    if (!sock.tebakGame || sock.tebakGame.sender !== sender) return;
        const guess = parseInt(args[0]);
    if (isNaN(guess)) return reply("❌ *Masukkan Angka!*");

    if (guess === sock.tebakGame.target) {
        reply(`🎉 *Tebakkan Kamu Benar!*`);
            delete sock.tebakGame;
        } else {
            reply(guess > sock.tebakGame.target ? "*Terlalu Tinggi!*" : "*Terlalu rendah!*");
    }
}
break;

case "quote": {
    const quotes = [
        "Jangan menyerah, hari buruk akan berlalu.",
        "Kesempatan tidak datang dua kali.",
        "Kamu lebih kuat dari yang kamu kira.",
        "Hidup ini singkat, jangan sia-siakan."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    reply(`*Quote Hari Ini :*\n_"${randomQuote}"_`);
}
break

case "store":
case "jualan": {
    try {
        await sock.sendMessage(sender,
            {
                text: storemenu,
                mentions: [sender]
            },
        { quoted: msg }
        )
    } catch (error) {
        console.error("Error Store Menu:", error);
        reply(mess.error);
    }
}
break

case "order": {
    if (!q) return reply("☘️ *Contoh:* !order netflix");
    const orderTemplate = `*Hi Admin, Saya mau order!*
*Produk:* ${q}
*Nama:* ${pushname}
*Metode Bayar:* QRIS/Dana

_Mohon segera diproses ya!_`;
    
    // Kirim wa link ke admin atau kirim pesan ini
    await reply(`*Terima kasih ${pushname}!*
Silakan lanjut chat admin untuk pembayaran:
https://wa.me/6281320962557?text=${encodeURIComponent(orderTemplate)}`);
}
break

        default: { reply(mess.default) }
    }
}