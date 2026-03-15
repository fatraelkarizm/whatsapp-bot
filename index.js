/*  
  WhatsApp Bot Premium Store
  Customized for Business
*/

// Import Module 
const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require("baileys")
const { Boom } = require("@hapi/boom")
const pino = require("pino")
const chalk = require("chalk")
const readline = require("readline")
const { resolve, join } = require("path")
const { version } = require("os")
const { Pool } = require('pg')
require('dotenv').config({ path: join(__dirname, 'frontend', '.env') })

// Database Setup for Sharing with Frontend (PostgreSQL)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

async function updateBotStatus(isLive) {
    try {
        const now = new Date().toISOString()
        const query = `
            INSERT INTO "BotStatus" (id, "isLive", "lastSeen", "updatedAt")
            VALUES ('singleton', $1, $2, $3)
            ON CONFLICT(id) DO UPDATE SET
                "isLive" = EXCLUDED."isLive",
                "lastSeen" = EXCLUDED."lastSeen",
                "updatedAt" = EXCLUDED."updatedAt"
        `
        await pool.query(query, [isLive, now, now])
    } catch (err) {
        console.error('Failed to update bot status in DB:', err)
    }
}

// Metode Pairing
const usePairingCode = true

// Promt Input Terminal
async function question(promt) {
    process.stdout.write(promt)
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve) => r1.question("", (ans) => {
        r1.close()
        resolve(ans)
    }))
    
}

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  
  // Versi Terbaru
  const { version, isLatest } = await fetchLatestBaileysVersion()
  console.log(`Using WA v${version.join('.')}, isLatest: ${isLatest}`)

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !usePairingCode,
    auth: state,
    browser: ['Ubuntu', 'Chrome', '20.0.04'],
    version: version,
    syncFullHistory: false,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id)
        return msg?.message || undefined
      }
      return proto.Message.fromObject({})
    }
  })

  // Handle Pairing Code
  if (usePairingCode && !sock.authState.creds.registered) {
    try {
      const phoneNumber = await question('☘️ Masukan Nomor Yang Diawali Dengan 62 :\n')
      const code = await sock.requestPairingCode(phoneNumber.trim())
      console.log(`🎁 Pairing Code : ${code}`)
    } catch (err) {
      console.error('Failed to get pairing code:', err)
    }
  }
    // Menyimpan Sesi Login
    sock.ev.on("creds.update", saveCreds)

    // Informasi Koneksi
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update
        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
            if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red("❌ Koneksi Keluar, Silakan Hapus Folder session Dan Scan Ulang"))
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(chalk.yellow("🔄 Restart Diperlukan, Menghubungkan Kembali..."))
                connectToWhatsApp()
            } else if (reason === DisconnectReason.timedOut) {
                console.log(chalk.red("⏳ Koneksi Timeout, Mencoba Menyambung Ulang..."))
                connectToWhatsApp()
            } else {
                console.log(chalk.red(`❌ Koneksi Terputus: ${reason}, Mencoba Menyambung Ulang...`))
                connectToWhatsApp()
            }
        } else if (connection === "open") {
            console.log(chalk.green("✔ Bot Berhasil Terhubung Ke WhatsApp"))
            updateBotStatus(true)
            
            // Periodically update lastSeen every minute
            setInterval(() => {
                updateBotStatus(true)
            }, 60000)
        }
    })

    // Respon Pesan Masuk
    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0]

        if (!msg.message) return

        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
        const sender = msg.key.remoteJid
        const pushname = msg.pushName || "User"

        // Log Pesan Masuk Terminal
        const listColor = ["red", "green", "yellow", "magenta", "cyan", "white", "blue"]
        const randomColor = listColor[Math.floor(Math.random() * listColor.length)]

        console.log(
            chalk.yellow.bold("Digicy Store"),
            chalk.green.bold("[ WhatsApp ]"),
            chalk[randomColor](pushname),
            chalk[randomColor](" : "),
            chalk.white(body)
            
        )

        delete require.cache[require.resolve("./handler")]
        require("./handler")(sock, m)
    })
    
}

// Jalankan Koneksi WhatsApp
connectToWhatsApp()