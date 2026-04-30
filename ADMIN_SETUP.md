# Admin Dashboard Setup Guide

## Overview

The admin dashboard has been successfully implemented with full CRUD capabilities for:
- Services
- Blog Posts
- Case Studies
- Testimonials
- Locations
- Static Pages
- Site Settings

## Quick Start

### 1. Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
# Database
DATABASE_URL=postgresql://user:password@host.neon.tech/database

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-key
ADMIN_PASSWORD=your-admin-password

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2. Database Setup

```bash
# Install Prisma CLI globally (optional)
npm install -g prisma

# Push schema to Neon
npx prisma db push

# Seed with existing data
npx prisma db seed
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Access Admin Dashboard

- Navigate to: `http://localhost:3000/admin`
- Sign in with your admin email and `ADMIN_PASSWORD`

## Architecture

### Database Schema

The schema includes all models with relationships:
- **User, Account, Session** - NextAuth authentication
- **Service** with ServiceBenefit, ServiceProcess, ServiceFAQ
- **BlogPost** - Markdown content
- **CaseStudy** with CaseStudyMetric
- **Testimonial** - Customer quotes
- **Location** with LocationSection, LocationStat, LocationFAQ
- **StaticPage** - Custom pages (About, Team, etc.)
- **SiteSettings** - Global configuration
- **NavigationItem** - Menu items
- **TrustBadge, FooterRating** - Social proof

All models support soft deletes via `deletedAt` field.

### API Endpoints

All endpoints require authentication and return JSON:

- `GET/POST /api/admin/services`
- `GET/PUT/DELETE /api/admin/services/:id`
- `GET/POST /api/admin/blog`
- `GET/PUT/DELETE /api/admin/blog/:id`
- `GET/POST /api/admin/case-studies`
- `GET/PUT/DELETE /api/admin/case-studies/:id`
- `GET/POST /api/admin/testimonials`
- `GET/PUT/DELETE /api/admin/testimonials/:id`
- `GET/POST /api/admin/locations`
- `GET/PUT/DELETE /api/admin/locations/:id`
- `GET/POST /api/admin/static-pages`
- `GET/PUT/DELETE /api/admin/static-pages/:id`
- `GET/PUT /api/admin/site-settings`
- `POST /api/admin/upload` (Cloudinary)
- `GET /api/admin/stats`

### Authentication

- Uses NextAuth.js with Credentials provider
- Protected routes via middleware (`/admin/*`)
- Sessions stored in Neon database
- Custom signin page at `/auth/signin`

## Next Steps

### 1. Connect Frontend to Database

Update `src/lib/*-data.ts` files to fetch from Prisma instead of hardcoded arrays. Example:

```typescript
// src/lib/services-data.ts
import { prisma } from "@/lib/db";

export async function getServices() {
  return prisma.service.findMany({
    where: { deletedAt: null },
    include: { benefits: true, process: true, faqs: true },
  });
}
```

### 2. Add Edit Pages

Create edit pages for each content type (e.g., `/admin/services/[id]/page.tsx`) that fetch existing data and update via API.

### 3. Add Cache Invalidation

Use `revalidatePath()` in API routes to bust Next.js ISR cache after mutations:

```typescript
import { revalidatePath } from "next/cache";

// After updating service
revalidatePath("/services");
revalidatePath("/services/[slug]", "page");
```

### 4. Multi-User Support

Extend NextAuth config to support multiple admin users with roles:

```typescript
// Add role field to User model
role: "admin" | "editor"

// Add role checks in API routes
if (session?.user?.role !== "admin") {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

### 5. Audit Logging

Add audit trail for all content changes:

```typescript
model AuditLog {
  id String @id @default(cuid())
  userId String
  action String // "create" | "update" | "delete"
  model String // "Service", "BlogPost", etc.
  changes Json
  createdAt DateTime @default(now())
}
```

## Cloudinary Setup

### Get API Credentials

1. Sign up at https://cloudinary.com
2. Go to Dashboard → Settings → API Keys
3. Copy Cloud Name, API Key, and API Secret
4. Add to `.env.local`

### Upload Handling

The `/api/admin/upload` endpoint:
- Accepts form-data with `file` field
- Uploads to Cloudinary folder `search-modifiers-admin`
- Returns JSON with `secure_url`

Usage in forms:

```typescript
const response = await fetch("/api/admin/upload", {
  method: "POST",
  body: formData,
});
const { secure_url } = await response.json();
```

## Troubleshooting

### Database Connection Error

```
Error: ECONNREFUSED - Could not connect to database
```

**Solution:** Check `DATABASE_URL` in `.env.local` is correct and Neon instance is running.

### NextAuth Session Error

```
Error: NEXTAUTH_SECRET is not set
```

**Solution:** Generate and set `NEXTAUTH_SECRET`:

```bash
npx auth secret
```

### Upload Fails

```
Error: Cloudinary upload failed
```

**Solution:** Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_API_SECRET` are correct.

## File Structure

```
src/
├── app/
│   ├── admin/                  # Admin dashboard pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── services/
│   │   ├── blog/
│   │   ├── case-studies/
│   │   ├── testimonials/
│   │   ├── locations/
│   │   ├── static-pages/
│   │   └── site-settings/
│   ├── api/admin/             # CRUD API endpoints
│   │   ├── stats/
│   │   ├── services/
│   │   ├── blog/
│   │   ├── case-studies/
│   │   ├── testimonials/
│   │   ├── locations/
│   │   ├── static-pages/
│   │   ├── site-settings/
│   │   └── upload/
│   └── auth/signin/           # Sign in page
├── components/
│   └── admin/                 # Admin form components
│       ├── form-layout.tsx
│       ├── markdown-editor.tsx
│       ├── nested-field-array.tsx
│       └── image-upload-field.tsx
├── auth.ts                    # NextAuth configuration
└── middleware.ts              # Route protection

prisma/
├── schema.prisma              # Database schema
├── seed.ts                    # Database seeding
└── migrations/                # Auto-generated
```

## Features Completed

✅ Prisma ORM with Neon PostgreSQL  
✅ NextAuth.js authentication  
✅ Middleware-based route protection  
✅ Full CRUD API endpoints (all 7 content types)  
✅ Admin dashboard UI with sidebar navigation  
✅ Reusable form components  
✅ Markdown editor with live preview  
✅ Nested field arrays for complex data  
✅ Image upload with Cloudinary integration  
✅ Soft deletes for data recovery  
✅ Type-safe Zod validation  
✅ Responsive design matching brand theme  

## Next Major Features

- [ ] Multi-user admin accounts with role-based access
- [ ] Audit logging for content changes
- [ ] Content versioning/drafts
- [ ] Bulk import/export
- [ ] Search and filtering
- [ ] Analytics dashboard
- [ ] SEO preview generator
- [ ] Content scheduling
