# Kungpao Web - Modern Band Website

A modern website for the Kungpao China Rock Revival Band, built with Strapi (headless CMS) and Next.js.

## Features

- 🎵 **Music Library** - Songs with synchronized lyrics (original Chinese + Czech translation)
- 📅 **Event Calendar** - Concert dates with "Add to Calendar" functionality
- 🖼️ **Media Galleries** - Photo and video galleries from performances
- 🛍️ **E-commerce Ready** - Infrastructure for merch store
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🌐 **Bilingual Support** - Czech and Chinese content

## Tech Stack

### Backend
- **Strapi 4.x** - Headless CMS
- **PostgreSQL** - Database
- **Node.js 20+** - Runtime

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components

### DevOps
- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD
- **Dev Containers** - Development environment

## Getting Started

### Prerequisites

- Docker Desktop
- Visual Studio Code with Dev Containers extension
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/musarosro/kungpao-web.git
   cd kungpao-web
   ```

2. **Open in Dev Container**
   - Open VS Code
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
   - Select "Dev Containers: Reopen in Container"
   - Wait for the container to build and install dependencies

3. **Start Strapi Backend**
   ```bash
   cd backend
   npm run develop
   ```
   Backend will be available at http://localhost:1337

4. **Start Next.js Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will be available at http://localhost:3000

### First Time Setup

1. Create your Strapi admin account at http://localhost:1337/admin
2. Configure content types (see Content Structure section)
3. Add some initial content
4. The Next.js frontend will automatically fetch data from Strapi

## Project Structure

```
kungpao-web/
├── .devcontainer/          # Dev container configuration
├── .github/                # GitHub Actions workflows
├── backend/                # Strapi CMS
│   ├── src/
│   │   ├── api/           # Content type APIs
│   │   └── extensions/    # Custom extensions
│   ├── config/            # Strapi configuration
│   ├── database/          # Database files
│   └── public/            # Uploaded media
├── frontend/               # Next.js application
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   ├── lib/               # Utilities and helpers
│   └── public/            # Static assets
└── legacy/                 # Old website (reference)
```

## Content Structure

### Strapi Content Types

- **Song** - Music tracks with audio files, lyrics (original + translation), sync timestamps
- **Event** - Concert dates, venues, descriptions, calendar integration data
- **Band Member** - Member profiles, instruments, bio
- **Gallery Item** - Photos and videos with categories and descriptions
- **News** - Latest updates and announcements
- **Product** (future) - Merchandise items for e-commerce

## Deployment

### Production Build

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

### GitHub Actions

CI/CD workflows are configured for:
- Linting and testing on PR
- Building Docker images
- Deploying to production server

See `.github/workflows/` for details.

## Environment Variables

### Backend (.env)

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=generate-random-keys
API_TOKEN_SALT=generate-random-salt
ADMIN_JWT_SECRET=generate-random-secret
TRANSFER_TOKEN_SALT=generate-random-salt
JWT_SECRET=generate-random-secret

DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=kungpao
DATABASE_USERNAME=kungpao
DATABASE_PASSWORD=your-secure-password
DATABASE_SSL=false

NODE_ENV=development
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token
```

## Contributing

This is a private project for Kungpao band. For suggestions or issues, please contact the repository owner.

## License

© 2025 Kungpao China Rock Revival Band. All rights reserved.
