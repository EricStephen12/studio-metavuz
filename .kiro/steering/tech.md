# Technology Stack & Build System

## Framework & Runtime
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Node.js** - Runtime environment

## Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Animation library for smooth transitions
- **Lucide React 0.542.0** - Icon library
- **Geist Font** - Primary typography (Sans & Mono variants)

## Backend & APIs
- **Next.js API Routes** - Server-side functionality
- **Nodemailer 7.0.6** - Email service for contact/booking forms
- **Gmail SMTP** - Email delivery service

## Development Tools
- **Turbopack** - Fast bundler (enabled for dev and build)
- **ESLint** - Code linting (currently disabled)
- **PostCSS** - CSS processing

## Common Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
```

### Production
```bash
npm run build        # Build for production with Turbopack
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Currently disabled - returns echo message
```

## Environment Configuration
- **`.env.local`** - Local environment variables
- **EMAIL_USER** - Gmail account for sending emails
- **EMAIL_PASS** - Gmail app password (not regular password)

## Key Technical Patterns
- **Client Components** - Use `'use client'` directive for interactive components
- **Server Components** - Default for static content and API calls
- **TypeScript Strict Mode** - Enabled for type safety
- **Path Aliases** - `@/*` maps to `./src/*`
- **Image Optimization** - Next.js Image component with proper sizing
- **SEO Optimization** - Comprehensive metadata in layout.tsx