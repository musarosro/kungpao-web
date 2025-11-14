# Kungpao Web - Implementation Plan

## Original Request

**User Goal**: Build a new website for Kungpao music band with the following requirements:

### Requirements
1. **CMS**: Easy WYSIWYG or similar editor for static web pages (like WordPress or Bolt CMS)
2. **Calendar**: Visitors can add calendar events to their devices
3. **Multimedia Section**: 
   - Play songs with synchronized lyrics
   - Display original Chinese lyrics + Czech translation
   - Show what part is currently being sung (synchronized)
4. **Media Galleries**: Photo and video galleries
5. **E-commerce**: Integration for merch store (future)

### Technical Decisions Made
- **Backend**: Strapi (headless CMS) - provides WYSIWYG editor through admin panel
- **Frontend**: Next.js 14+ with App Router
- **Database**: PostgreSQL
- **Development**: Docker + DevContainers
- **Deployment**: GitHub Actions + Docker Compose
- **User Context**: Skilled programmer/sysadmin, can handle server setup and coding

### Architecture
```
kungpao-web/
├── backend/     # Strapi CMS (port 1338)
├── frontend/    # Next.js App (port 3456)
└── legacy/      # Old HTML/CSS site (for reference)
```

---

## Current Status
✅ DevContainer configuration complete
✅ Docker Compose with PostgreSQL setup
✅ Volume persistence configured
🔄 Ready to initialize Strapi and Next.js

## Next Steps

### 1. Initialize Strapi Backend (In Progress)
```bash
cd backend
npx create-strapi-app@latest . --quickstart --no-run --typescript
```

### 2. Configure Strapi for PostgreSQL
Update `backend/config/database.ts` to use PostgreSQL instead of SQLite

### 3. Initialize Next.js Frontend
```bash
cd frontend
npx create-next-app@latest . --typescript --tailwind --app --use-npm
```

### 4. Create Strapi Content Types
- **Song** - Audio files, lyrics (original + Czech), sync timestamps
- **Event** - Concert dates, calendar metadata
- **BandMember** - Profiles, instruments, bio
- **GalleryItem** - Photos/videos with categories
- **News** - Updates and announcements

### 5. Build Frontend Features
- Synchronized lyrics player
- Event calendar with "Add to Calendar"
- Photo/video galleries
- Responsive design

### 6. Setup GitHub Actions
- CI/CD workflows for testing and deployment
- Docker image builds
- Automated deployments

## Tech Stack
- **Backend**: Strapi 4.x + PostgreSQL
- **Frontend**: Next.js 14+ (App Router) + TypeScript + Tailwind
- **Development**: Docker + DevContainers
- **Deployment**: Docker Compose + GitHub Actions

## Access Points (After starting services)
- Frontend: http://localhost:3456
- Strapi Admin: http://localhost:1338/admin
- PostgreSQL: localhost:5433

## Commands

### Start Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm run develop

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Database Access
```bash
psql -h localhost -p 5433 -U kungpao -d kungpao
# Password: kungpao_dev_password
```

---

## Chat History & Decisions

### 1. Initial Requirements Discussion
- User wants to modernize legacy HTML/CSS band website
- Existing site has: band info, concerts, songs (with audio), photo galleries, contact
- Key feature: synchronized lyrics display (Chinese original + Czech translation)
- Calendar with "Add to Calendar" functionality needed
- E-commerce for merch (future requirement)

### 2. Tech Stack Selection
**User's Choice**: Strapi + Next.js
- **Strapi**: Provides headless CMS with built-in admin panel (WYSIWYG editing)
- **Next.js**: Modern React framework with excellent performance
- **PostgreSQL**: Robust database for production use
- **Docker**: Containerization for consistent dev/prod environments

### 3. Synchronized Lyrics Implementation Options Discussed
**Option A**: Use `lrc-parser` library + custom React component + `howler.js` for audio
**Option B**: Build custom solution with Web Audio API + JSON timestamps
**Option C**: Integrate third-party service like Musixmatch API

Decision: Will implement custom solution with flexibility for both formats

### 4. Content Migration Strategy
Legacy site contains:
- 30+ songs with audio files (MP3)
- Extensive concert history (100+ events from 2000-2023)
- Photo galleries (China tours 2006/2007, UK tour 2010, various concerts)
- Band member information (current: 4 members, former: 2 members)
- Band history and news

Migration: Will manually enter through Strapi admin (gives opportunity to curate/update content)

### 5. DevContainer Configuration Evolution
**Initial Setup**: Basic Node 20 + PostgreSQL
**Improvements Made**:
- Switched to Microsoft's official devcontainer image (Node 22)
- Changed to standard `/workspaces` folder
- Added Docker-in-Docker feature
- Changed ports to avoid conflicts: 3456 (Next.js), 1338 (Strapi), 5433 (PostgreSQL)
- Added volume persistence for:
  - PostgreSQL data
  - node_modules (backend & frontend)
  - Strapi uploads
  - npm/yarn cache
- Named Docker Compose project: `kungpao_web_development`

### 6. Key Features to Implement
1. **Song Player with Synchronized Lyrics**
   - Audio playback controls
   - Time-synced lyrics display
   - Bilingual display (Chinese + Czech)
   - Highlight current line being sung

2. **Event Calendar**
   - Display upcoming/past concerts
   - "Add to Calendar" button (supports Google Calendar, iCal, Outlook)
   - Library: `add-to-calendar-button`

3. **Media Galleries**
   - Photo galleries with categories
   - Video embed support
   - Responsive grid layout
   - Use Next.js Image optimization

4. **Content Management**
   - Strapi admin panel for content editing
   - Rich text editor for band info, news
   - Media library for uploads
   - API for frontend consumption

5. **E-commerce Foundation**
   - Content type for Products
   - Integration points for Stripe/Snipcart
   - Future implementation

### 7. Strapi Content Types Planned
```typescript
// Song
{
  title: string
  titleChinese: string
  artist: string
  audioFile: Media
  lyricsOriginal: Text (Chinese)
  lyricsCzech: Text
  lyricsTimestamps: JSON // [{time: 0, line: 0}, ...]
  duration: number
  releaseYear: number
}

// Event
{
  title: string
  date: DateTime
  venue: string
  city: string
  description: RichText
  ticketLink: string (optional)
  status: Enum (upcoming, past, cancelled)
}

// BandMember
{
  name: string
  nameChinese: string
  instrument: string
  bio: RichText
  photo: Media
  joinedYear: number
  leftYear: number (optional)
  isActive: boolean
}

// GalleryItem
{
  title: string
  description: Text
  media: Media (photo or video)
  category: string
  date: Date
  eventReference: Relation (Event, optional)
}

// News
{
  title: string
  content: RichText
  publishDate: DateTime
  featured: boolean
}

// Product (future)
{
  name: string
  description: RichText
  price: number
  images: Media[]
  inStock: boolean
  stripeProductId: string
}
```

### 8. Next Steps After Container Start
1. Initialize Strapi in `/workspaces/kungpao-web/backend`
2. Configure database connection to PostgreSQL
3. Create admin user
4. Define content types via Strapi admin
5. Initialize Next.js in `/workspaces/kungpao-web/frontend`
6. Setup Tailwind CSS + shadcn/ui components
7. Create API routes to fetch from Strapi
8. Build page layouts and components
9. Implement synchronized lyrics player
10. Setup GitHub Actions workflows

### 9. GitHub Actions Workflows Planned
- **CI Workflow**: Lint, type-check, test on PR
- **Backend Deploy**: Build Strapi Docker image, push to registry
- **Frontend Deploy**: Build Next.js, deploy to production
- **Database Migrations**: Run on deployment

### 10. Deployment Strategy
**Development**: DevContainer with Docker Compose
**Production**: Docker Compose with nginx reverse proxy
- Frontend: Next.js (SSR/SSG)
- Backend: Strapi API
- Database: PostgreSQL
- Media Storage: Local volumes (or future S3/CDN)
- SSL: Let's Encrypt via nginx

---

## References & Resources

### Libraries to Use
- **Audio Player**: `howler.js` or native Web Audio API
- **Lyrics Parsing**: `lrc-parser` (supports .lrc format)
- **Calendar**: `add-to-calendar-button`
- **Image Gallery**: `react-photo-gallery` or `yet-another-react-lightbox`
- **UI Components**: `shadcn/ui` (built on Radix UI + Tailwind)
- **Forms**: `react-hook-form` + `zod`
- **API Client**: Native `fetch` with Next.js caching

### Strapi Plugins
- `@strapi/plugin-seo` - SEO optimization
- `@strapi/plugin-i18n` - Internationalization (if needed)
- `strapi-plugin-sitemap` - Auto-generate sitemap

### Legacy Site Content to Migrate
**Pages**: Home, About (O nás), History (Historie), Concerts (Koncerty), Songs (Písničky), Gallery (Fotogalerie), Contact (Kontakt)

**Song List** (13 with audio + 19 titles only):
- Alishan, Duimian, Men, Yi kuai hongbu, Wo yao qian, Fengyang huagu, Tibet, Aiqing ni wo ta, Shehuizhuyi hao, Yiwusuoyou, Ni kuaile suoyi wo kuaile, Chiluoluo, Yue ya quan
- Plus 19 more titles (need audio files)

**Concert History**: 100+ events from March 2000 to October 2023
