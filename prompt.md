# Digicy Store Development Prompt

When updating this codebase, maintain these core principles:

## 1. Design Language
- **Colors**: Strictly use Blue 600 (`#2563eb`), Black (`#000000`), and White (`#ffffff`).
- **Gradients**: NO GRADIENTS. Use solid backgrounds or subtle blurs for depth.
- **Typography**: Bold, high-contrast headings with ample whitespace.
- **Feel**: Premium, trustworthy, and minimal.

## 2. Technical Standards
- **Component Style**: Tailwind CSS inside Next.js App Router.
- **Database**: Prisma with SQLite (`dev.db`).
- **Bot Integration**: Shared database. Any bot activity should update the `BotStatus` table to keep the "Live" indicator accurate.
- **CRUD Operations**: All product management must go through the `/admin` dashboard.

## 3. Communication Pattern
- Always show empathy and helpfulness.
- Maintain a proactive approach in fixing UI inconsistencies.
- Use Lucide Icons for all visual cues.
