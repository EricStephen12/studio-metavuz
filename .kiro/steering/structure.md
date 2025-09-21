# Project Structure & Organization

## Root Directory
```
├── .env.local              # Environment variables (not in git)
├── .eslintignore          # ESLint ignore patterns
├── .gitignore             # Git ignore patterns
├── .kiro/                 # Kiro AI assistant configuration
├── EMAIL_SETUP.md         # Email configuration documentation
├── README.md              # Project documentation
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
└── tailwind.config.js     # Tailwind CSS configuration (implied)
```

## Source Structure (`src/`)
```
src/
├── app/                   # Next.js App Router
│   ├── about/            # About page route
│   ├── api/              # API routes
│   │   ├── booking/      # Booking form handler
│   │   └── contact/      # Contact form handler
│   ├── booking/          # Booking page route
│   ├── contact/          # Contact page route
│   ├── services/         # Services page route
│   ├── favicon.ico       # Site favicon
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
└── components/           # Reusable React components
    ├── Footer.tsx        # Site footer
    ├── LoadingSkeleton.tsx # Loading state component
    └── Navigation.tsx    # Site navigation
```

## Public Assets (`public/`)
```
public/
├── images/               # Studio photos and media
│   ├── IMG_*.jpg        # Studio gallery images
│   ├── mixer.jpeg       # Equipment photos
│   └── recording.jpeg   # Studio environment photos
├── *.svg                # Icon assets (file, globe, next, vercel, window)
└── favicon.ico          # Browser favicon
```

## Naming Conventions
- **Pages**: PascalCase for page components (`page.tsx`)
- **Components**: PascalCase for component files (`Navigation.tsx`)
- **API Routes**: lowercase for route handlers (`route.ts`)
- **Images**: Descriptive names, maintain original format
- **Styles**: kebab-case for CSS classes (following Tailwind)

## File Organization Patterns
- **Co-location**: Related files grouped by feature/route
- **Component Structure**: Single component per file
- **API Routes**: RESTful structure under `/api`
- **Static Assets**: Organized by type in `/public`

## Import Patterns
- **Path Aliases**: Use `@/` for src imports (`@/components/Navigation`)
- **Relative Imports**: For same-directory files
- **External Libraries**: Import from node_modules directly
- **Type Imports**: Use `import type` for TypeScript types

## Component Architecture
- **Layout Components**: Shared UI structure (Navigation, Footer)
- **Page Components**: Route-specific content
- **Utility Components**: Reusable UI elements (LoadingSkeleton)
- **Client Components**: Interactive elements with `'use client'`
- **Server Components**: Static content (default)