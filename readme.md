# 🤖 WhatsApp Bot Premium Store (Digicy Store)

A comprehensive, full-stack WhatsApp Bot and E-Commerce Dashboard designed to automate digital product sales, provide AI assistance, and offer utility features directly via WhatsApp. 

## 📖 1. Overview
This project is an advanced WhatsApp Bot tailored for digital businesses (such as premium app account stores). It integrates seamlessly with a Next.js frontend dashboard and uses a unified PostgreSQL database via Prisma. Powered by the `@whiskeysockets/baileys` library, the bot operates with secure multi-file authentication and a real-time connection to a store management interface.

## 🎯 2. Problem Statement
Running a digital product store via WhatsApp often requires manual and repetitive tasks:
- **Delayed Customer Service:** Manually answering FAQs and explaining product details takes time.
- **Order Management Inefficiency:** Taking orders, providing payment methods, and tracking user inquiries manually is prone to errors.
- **Lack of Engagement:** Customers often leave the chat if there are no interactive features to keep them engaged while waiting for admin responses.
- **No Centralized Dashboard:** Store owners lack a web-based interface to manage their inventory and view bot status.

## 💡 3. Solution
This application solves the above problems by combining a **WhatsApp Bot** with a **Next.js Web Dashboard**:
- **Automated Storefront:** The bot handles product catalogs (`!store`) and order requests (`!order`), automatically generating pre-filled messages directed to the admin.
- **AI Integration:** Features an AI assistant (`!ai`) to handle general queries automatically, reducing the burden on human admins.
- **Customer Engagement:** Includes media downloaders (`!ttdl`, `!igdl`) and interactive games (`!tebakangka`) to keep the group or chat lively and engaged.
- **Real-time Web Dashboard:** A Next.js frontend with PostgreSQL + Prisma allows the store owner to monitor the bot's live status and manage the business.

## ✨ 4. Key Features & Tech Stack

### Key Features
- **🛍️ Store Management:** `!store`, `!order` commands to list products and automate checkout.
- **🧠 AI Chatbot:** `!ai` command integrated with a custom scraper.
- **📥 Media Downloaders:** `!ttdl` (TikTok) and `!igdl` (Instagram Reels/Posts) downloaders without watermarks.
- **🎮 Interactive Games:** `!tebakangka` (Number guessing game).
- **🛠️ Admin & Group Tools:** Role-based commands exclusive to group chats or administrators.
- **🌐 Web Dashboard:** Full-featured Next.js application (frontend folder) with Prisma ORM to track bot uptime (`BotStatus`) and manage products.

### Tech Stack
- **Backend (Bot):** Node.js, `@whiskeysockets/baileys`, `pg` (PostgreSQL), `axios`, `pino`, `chalk`.
- **Frontend (Web):** Next.js (App Router), React, Tailwind CSS, TypeScript, Prisma ORM.

## 🚀 5. Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) database
- WhatsApp account (for pairing)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd whatsapp-bot
   ```

2. **Setup the Database & Frontend:**
   ```bash
   cd frontend
   npm install
   # Create a .env file and add your DATABASE_URL
   echo "DATABASE_URL=postgresql://user:password@localhost:5432/yourdb" > .env
   # Push the Prisma schema to your database
   npx prisma db push
   cd ..
   ```

3. **Install Bot Dependencies:**
   ```bash
   npm install
   ```

4. **Run the Bot:**
   ```bash
   npm start
   ```
   *Follow the terminal prompt. Enter your WhatsApp number to receive a pairing code and link the bot to your device.*

5. **Run the Frontend Dashboard (Optional):**
   ```bash
   cd frontend
   npm run dev
   ```
   *Access the dashboard at `http://localhost:3000`.*
