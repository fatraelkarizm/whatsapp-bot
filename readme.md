# Digicy Store Fullstack

A modern, high-conversion full-stack application for selling premium APKs and digital products. Integrated with a WhatsApp bot for real-time status and automated management.

## Features

- **Premium Landing Page**: Minimalist design with Blue 600 theme, no gradients, and high-quality UI.
- **Bot Integration**: Real-time "LIVE" status indicator for the WhatsApp bot.
- **Admin Dashboard**: Full CRUD (Create, Read, Update, Delete) to manage products.
- **Fast Backend**: Next.js API Routes with Prisma & SQLite.

## Project Structure

```bash
.
├── frontend/             # Next.js Application
│   ├── app/              # App Router (Pages & APIs)
│   ├── prisma/           # Database Schema & SQLite
│   └── lib/              # Shared Utilities
├── session/              # WhatsApp Bot Session
├── index.js              # WhatsApp Bot Entry Point
├── handler.js            # WhatsApp Bot Message Handler
└── package.json          # Root dependencies (Bot + Database Helpers)
```

## Setup Instructions

### 1. Frontend Setup
```bash
cd frontend
npm install
npx prisma db push
npm run dev
```

### 2. Bot Setup
```bash
# In the root directory
npm install
npm start
```

## Technologies Used
- **Frontend**: Next.js, Tailwind CSS, Lucide Icons, Prisma Client.
- **Backend**: Next.js API Routes, SQLite (shared with bot).
- **Bot**: Baileys (WA Library), better-sqlite3.

## Color Palette
- **Primary**: Blue 600 (#2563eb)
- **Neutral**: Black (#000000), White (#ffffff)
