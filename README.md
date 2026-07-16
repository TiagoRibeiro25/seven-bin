# Seven Bin

A minimal pastebin clone where pastes automatically expire after 7 days. Built with Next.js, MongoDB, and Tailwind CSS.

## Features

- **Auto-expiring pastes** — All pastes are automatically deleted after 7 days via MongoDB TTL indexes
- **Language detection** — Auto-detects the language of your paste with manual override
- **Syntax highlighting** — Code is highlighted using Prism in the Night Owl theme
- **My Pastes** — Tracks which pastes you created using localStorage
- **Clone pastes** — Fork any paste into a new one with pre-filled content
- **Copy to clipboard** — One-click copy for any paste

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) for icons
- [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer) for syntax highlighting

## Getting Started

### Prerequisites

- Node.js 26+
- Docker (for MongoDB)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/TiagoRibeiro25/seven-bin.git
cd seven-bin
```

2. Start MongoDB:

```bash
docker compose up -d
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

- **Creating a paste**: Enter a title (optional), paste your code, select a language (or let auto-detect choose), and click "Create Secure Paste"
- **Viewing a paste**: Share the URL with anyone. The paste shows syntax-highlighted code, expiry countdown, and metadata
- **My Pastes**: Your created paste IDs are stored in localStorage so you can quickly find them later
- **Auto-deletion**: MongoDB's TTL index on `expiresAt` automatically removes pastes 7 days after creation

## Project Structure

```
src/
├── app/
│   ├── actions/paste.ts      # Server actions (create, read)
│   ├── paste/[id]/page.tsx   # View paste page
│   ├── pastes/page.tsx       # My Pastes page
│   ├── page.tsx              # Home / create paste page
│   ├── layout.tsx            # Root layout with header/footer
│   └── globals.css           # Global styles
├── components/
│   ├── Header.tsx            # Navigation header
│   └── Footer.tsx            # Site footer
├── lib/
│   ├── detect-language.ts    # Keyword-based language detection
│   ├── localstorage.ts       # localStorage helpers for paste IDs
│   └── mongoose.ts           # MongoDB connection
└── models/
    └── Paste.ts              # Mongoose Paste schema
```

## Environment Variables

| Variable      | Description               | Default                                                           |
| ------------- | ------------------------- | ----------------------------------------------------------------- |
| `MONGODB_URI` | MongoDB connection string | `mongodb://admin:1234@localhost:27017/seven-bin?authSource=admin` |
