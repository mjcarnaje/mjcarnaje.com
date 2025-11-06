# Geriatric Care Solution - Comprehensive Codebase Summary

**Generated:** November 6, 2025
**Version:** 0.1.0
**Node Version:** >=22.0.0

---

## Table of Contents

1. [Executive Overview](#executive-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Authentication & Authorization](#authentication--authorization)
7. [Core Features](#core-features)
8. [Database Schema](#database-schema)
9. [API Architecture](#api-architecture)
10. [Third-Party Integrations](#third-party-integrations)
11. [Development Workflow](#development-workflow)

---

## Executive Overview

The **Geriatric Care Solution (GCS)** is a sophisticated, production-grade Next.js 14 web application designed to enhance quality of life for older adults through personalized care services, interactive cognitive activities, AI-powered content generation, and family support resources. The platform integrates subscription management, e-commerce, digital content creation, and therapeutic activities specifically designed for geriatric care and dementia support.

### Key Metrics
- **386 React components** organized by feature
- **85 custom hooks** for business logic encapsulation
- **68 shadcn/ui components** for consistent, accessible UI
- **60+ API route groups** for backend integration
- **53 TypeScript type definitions** for type safety
- **77 MongoDB models** for data persistence
- **13 cognitive activity types** with AI generation
- **40+ admin management sections**

### Target Audience
- Seniors (with or without cognitive impairments)
- Family members and caregivers
- Professional care facilities
- Healthcare providers

---

## Technology Stack

### Core Framework
- **Next.js 14.3.0-canary.64** - Full-stack React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type safety with strict mode

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 3.3.3 | Utility-first styling framework |
| **shadcn/ui** | Latest | Component library built on Radix UI |
| **Radix UI** | Various | Accessible component primitives |
| **TanStack Query** | 5.20.2 | Server state management |
| **Zustand** | 5.0.6 | Client state management |
| **React Hook Form** | 7.50.1 | Form state management |
| **Zod** | 3.24.2 | Schema validation |
| **Framer Motion** | 11.18.2 | Animation library |
| **Lucide React** | 0.471.2 | Icon library (471+ icons) |

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **MongoDB** | 5.8.0 | NoSQL database |
| **Mongoose** | 7.4.4 | MongoDB ODM |
| **NextAuth.js** | 4.24.7 | Authentication framework |
| **Stripe** | 19.2.0 | Payment processing |
| **Socket.io Client** | 4.8.1 | Real-time communication |

### AI & ML Services
- **OpenAI** (5.20.1) - GPT-4/3.5 for text generation
- **Google Generative AI** (0.24.1) - Image generation
- **@ai-sdk/openai** (1.3.6) - Unified AI interface

### Media & Storage
- **Cloudinary** (2.0.1) - Image/video hosting and optimization
- **Sharp** (0.33.5) - Image processing
- **Puppeteer Core** (24.22.0) - PDF generation

### Communication Services
- **Twilio** (5.0.1) - Phone verification & SMS
- **Resend** (3.2.0) - Transactional emails
- **React Email** (2.1.4) - Email templates
- **Nodemailer** (6.9.13) - Email delivery

### Development Tools
- **ESLint** (8.47.0) - Code linting
- **Prettier** (3.6.2) - Code formatting
- **Husky** (9.1.7) - Git hooks
- **Jest** (30.1.3) - Testing framework
- **tsx** (4.20.3) - TypeScript execution

---

## Project Structure

```
geriatric-care-solution/
├── app/                      # Next.js App Router
│   ├── (admin)/             # Admin dashboard routes
│   ├── (auth)/              # Authentication pages
│   ├── (public)/            # Public marketing pages
│   ├── (user)/              # User dashboard routes
│   ├── (print)/             # Print-specific layouts
│   ├── api/                 # API routes (60+ endpoints)
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
│
├── components/              # React components (386 files)
│   ├── ui/                  # shadcn/ui components (68 files)
│   ├── activities/          # Activity-specific components
│   ├── family-circles/      # Family collaboration
│   ├── ebooks/              # E-book management
│   ├── care-prints/         # Care prints features
│   ├── providers/           # React context providers
│   ├── contexts/            # React contexts
│   └── shared/              # Reusable components
│
├── hooks/                   # Custom React hooks (85 files)
│   ├── use-*-customization.ts    # Activity customization
│   ├── use-*-ai-generation.ts    # AI generation hooks
│   └── use-*.ts             # Utility hooks
│
├── libs/                    # Backend utilities
│   ├── mongoose.ts          # MongoDB connection
│   ├── next-auth.ts         # Authentication config
│   ├── permissions.ts       # RBAC system
│   ├── api-response.ts      # Standardized responses
│   └── utils.ts             # Shared utilities
│
├── models/                  # Mongoose schemas (77 files)
│   ├── User.ts              # User model
│   ├── Role.ts              # Role model
│   ├── FamilyCircle.ts      # Family circle model
│   ├── Activity.ts          # Activity model
│   ├── Product.ts           # Product model
│   └── ...                  # Other models
│
├── types/                   # TypeScript definitions (53 files)
│   ├── activity-*.ts        # Activity types
│   ├── family-circle.ts     # Family circle types
│   ├── ebook-*.ts           # E-book types
│   ├── user.ts              # User types
│   └── ...                  # Other types
│
├── actions/                 # Server actions (18 files)
│   ├── blogs.ts             # Blog operations
│   ├── onboarding.ts        # User onboarding
│   └── ...                  # Other actions
│
├── constant/                # Configuration constants
│   ├── plans.ts             # Subscription tiers
│   ├── question.json        # Questionnaires
│   ├── languages.ts         # Language support
│   └── event-months.ts      # Calendar events
│
├── constants/               # Additional constants
│   └── activity-config.ts   # Activity metadata (365 lines)
│
├── emails/                  # Email templates (16 files)
│   ├── welcome-email.tsx
│   ├── order-confirmation.tsx
│   └── ...
│
├── scripts/                 # Utility scripts (31 files)
│   ├── mongodb-backup.js    # Database backup
│   ├── optimize-images.ts   # Image optimization
│   └── ...
│
├── public/                  # Static assets
│   ├── images/
│   ├── fonts/
│   └── dictionaries/
│
├── docs/                    # Documentation
│   └── ...
│
├── store/                   # Zustand stores
│   └── user-chat-store.ts   # Chat state management
│
├── middleware.ts            # Route protection
├── tailwind.config.ts       # Tailwind configuration
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

---

## Frontend Architecture

### 1. Next.js App Router Structure

#### Route Groups
The application uses Next.js 14's route groups pattern for organization:

```
app/
├── (admin)/           # Admin dashboard with separate auth
├── (auth)/            # Login, signup, password reset, verification
├── (public)/          # Marketing pages (about, blogs, services)
├── (user)/            # Main user dashboard with features
├── (print)/           # Special print layouts for activities
└── api/               # API routes (60+ endpoint directories)
```

**Key Features:**
- Server-side rendering (SSR) for SEO
- Route-based code splitting
- Layout composition with nested layouts
- Middleware-based authentication

#### Root Layout
**File:** `/app/layout.tsx`

- Loads 15+ custom fonts via `next/font/google`
- SEO tags via custom `getSEOTags` utility
- Analytics integration (Vercel + Plausible)
- Theme configuration with CSS custom properties

### 2. Component Architecture

#### Organization Patterns

**Feature-Based Organization:**
Components are organized by domain/feature rather than type:
```
components/
├── family-circles/    # All family circle components
├── activities/        # Activity creation and management
├── ebooks/            # E-book reading and management
└── care-prints/       # Care prints features
```

**Colocation Pattern:**
Page-specific components are colocated with their routes:
```
app/(user)/care-prints/
├── page.tsx
├── _components/       # Page-specific components
└── _hooks/            # Page-specific hooks
```

**Provider Composition:**
**File:** `/components/client-provider.tsx`

Deeply nested provider composition ensures proper context availability:
```typescript
<ReactQueryProvider>
  <SessionProvider>
    <StableSessionProvider>
      <CartContextProvider>
        <ContactUsSheetContextProvider>
          <SignUpProvider>
            <AdminSidebarProvider>
              <ImagePreviewProvider>
                <SocketProvider>
                  {children}
```

### 3. State Management

#### Primary Solutions

**1. TanStack Query (Server State)**
**File:** `/components/providers/ReactQueryProvider.tsx`

- Default stale time: 5000ms
- Automatic background refetching
- Cache invalidation patterns
- Optimistic updates

**Example Pattern:**
```typescript
export const useFamilyCircles = ({ page, limit, search }) => {
  return useQuery<FamilyCirclesResponse>({
    queryKey: ["family-circles", { page, limit, search }],
    queryFn: async () => { /* API call */ },
  });
};

export const useCreateFamilyCircle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => { /* API call */ },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family-circles"] });
    },
  });
};
```

**2. Zustand (Client State)**
**File:** `/store/user-chat-store.ts`

Used for real-time chat state management:
```typescript
export const useUserChatStore = create<UserChatState>((set) => ({
  messages: [],
  conversations: [],
  addMessage: (message) => set((state) => ({ ... })),
  updateConversation: (updated) => set((state) => ({ ... })),
}));
```

**3. React Context API**
**Files:** `/components/contexts/`

- `session-context.tsx` - Stable session data with memoization
- `socket-context.tsx` - WebSocket connection management
- `image-preview-context.tsx` - Global image preview modal
- `sign-up-context.tsx` - Multi-step signup flow state

**4. Next.js Server Actions**
**Directory:** `/actions/`

Server actions for form submissions and server-side operations:
- `blogs.ts` - Blog CRUD operations
- `onboarding.ts` - User onboarding flow
- `franchise.ts` - Franchise inquiry submissions

### 4. Design System

#### shadcn/ui Configuration
**File:** `/components.json`

```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "baseColor": "slate",
    "cssVariables": true
  }
}
```

**68 Components in `/components/ui/`:**
- Form components: input, textarea, select, checkbox, radio-group
- Layout: card, dialog, drawer, popover, accordion, tabs
- Feedback: alert, toast, progress, skeleton
- Navigation: dropdown-menu, menubar, breadcrumb
- Data display: table, badge, avatar, separator

#### Tailwind Configuration
**File:** `/tailwind.config.ts`

**Custom Theme:**
```typescript
theme: {
  extend: {
    fontFamily: {
      sans: ["var(--font-inter)"],
      titilliumWeb: ["var(--font-titillium-web)"],
      // 15 total font families for ebooks and activities
    },
    colors: {
      theme: {
        violet: "hsl(var(--violet))",
        green: "hsl(var(--green))",
        pink: "hsl(var(--pink))",
        // Custom color system
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      fadeIn: "fadeIn 0.4s ease-in-out",
      shimmer: "shimmer 2s infinite",
    },
  }
}
```

**Design Tokens:**
- CSS variables for theming (defined in `globals.css`)
- HSL color system for easy manipulation
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1400px)

#### Utility Functions
**File:** `/lib/utils.ts`

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Combines `clsx` and `tailwind-merge` for:
- Conditional class names
- Tailwind class deduplication
- Type-safe className composition

### 5. Custom Hooks (85 hooks)

#### Categories

**Data Fetching Hooks:**
- `use-family-circles.ts` - Family circle CRUD
- `use-ebooks.ts` - E-book queries
- `use-activities.ts` - Activity queries
- `use-blogs.ts` - Blog post queries

**Activity Customization Hooks:**
- `use-activity-customization.ts` - Base customization (12KB)
- `use-crossword-customization.ts` - Crossword-specific (21KB)
- `use-matching-words-customization.ts` - Matching words (20KB)
- `use-word-search-customization.ts` - Word search (15KB)

**AI Generation Hooks:**
- `use-365days-ai-generation.ts` - Daily activity generation
- `use-crossword-ai-generation.ts` - Crossword puzzle AI
- `use-care-crafter-ai-generation.ts` - Care plan AI

**Utility Hooks:**
- `use-debounce.ts` - Input debouncing
- `use-media-query.ts` - Responsive breakpoints
- `use-current-user.ts` - Current user data
- `use-unsaved-changes-warning.ts` - Navigation warnings

### 6. Performance Patterns

- **Code Splitting:** Dynamic imports for heavy components
- **Image Optimization:** Next.js Image component with multiple CDN support
- **Caching Strategy:** TanStack Query with 5000ms stale time
- **Bundle Optimization:** External packages configuration in `next.config.js`

---

## Backend Architecture

### 1. Database Technology

#### MongoDB with Mongoose
**Connection:** `/libs/mongoose.ts`

```typescript
// Connection caching mechanism
- Global cache to prevent multiple connections in development
- Error handling for missing MONGODB_URI
- Connection options with bufferCommands: false
```

**Features:**
- Connection pooling
- Automatic reconnection handling
- Environment-based configuration

### 2. Data Models (77 models)

#### Core Models

**User Model** (`/models/User.ts`, 197 lines)
```typescript
interface IUser {
  // Identity
  email: string (unique, indexed)
  name: string
  photoURL: string
  password: string

  // Verification
  emailVerified: Date | null
  phoneNumber: string | null
  phoneVerified: Date | null

  // Authorization
  role: ObjectId | null (ref: Role)
  status: "invited" | "accepted" | "pending"

  // Onboarding
  isOnboarded: boolean
  userType: "Senior" | "Family" | "Caregiver"

  // Subscription
  customerId: string (Stripe)
  plan: {
    product: "free" | "plus" | "premium"
    period: "monthly" | "yearly"
    end: Date | null
  }
}
```

**Role Model** (`/models/Role.ts`)
```typescript
interface IRole {
  name: string
  description?: string
  permissions: Permission[]
  image: { url, blurHash }
  isDefault: boolean
}
```

**FamilyCircle Model** (`/models/FamilyCircle.ts`, 78 lines)
```typescript
interface IFamilyCircle {
  name: string (max 100 chars)
  dedicatedTo: string
  dedicatedPersonBirthdate: Date
  dedicatedPersonSex: Enum
  creator: ObjectId (ref: User, indexed)
  inviteToken: string (unique)
  inviteTokenExpires: Date
}
```

**Activity Model** (`/models/Activity.ts`)
```typescript
interface IActivity {
  type: ActivityType (13 types)
  content: Mixed (polymorphic)
  author: ObjectId (ref: User)
  familyCircleId: ObjectId
  customization: ExtensiveCustomization
  language: string
  transformationHistory: Array
  isDraft: boolean
}
```

**Product Model** (`/models/Product.ts`)
```typescript
interface IProduct {
  name: string
  description: string
  slug: string (unique)
  type: ProductType
  price: number
  shippingFee: number
  stockAvailable: number
  group: ProductGroup
  images: Array<{ url, blurHash }>
  sortOrder: number
}
```

### 3. Database Relationships

**Key Relationships:**
1. User → Role: Many-to-One (permission management)
2. FamilyCircle → User: Many-to-One (creator)
3. CircleMembership: Junction table for User ↔ FamilyCircle
4. CircleAnswer → FamilyCircle + User: Many-to-One relationships
5. Activity → User + FamilyCircle: Many-to-One relationships
6. Product → Event/Category: Many-to-One relationships
7. Order → Product: Many-to-Many via embedded array

**Database Indexes:**
- Unique: email (User), inviteToken (FamilyCircle), slug (Product)
- Compound: (circle, user) in CircleMembership
- Performance: creator, createdAt, joinedAt fields

### 4. API Architecture

#### RESTful API Routes

**Family Circles API** (`/app/api/family-circles/`)
```typescript
// POST /api/family-circles/route.ts (Lines 18-80)
- Creates new family circle with transaction support
- Automatic membership creation for creator
- Token generation for invitations

// GET /api/family-circles/route.ts (Lines 82-239)
- Complex aggregation pipeline for circle listing
- Pagination support (limit/offset)
- Search functionality
- Member count and activity tracking
```

**API Response Utilities** (`/libs/api-response.ts`)
```typescript
- unauthorized(): 401 responses
- forbidden(): 403 responses
- notFound(): 404 responses
- badRequest(): 400 with details
- validation(): 400 with validation errors
- internal(): 500 with logging
- success(), created(), noContent(): Success responses
```

#### Server Actions

**Pattern:**
```typescript
// actions/onboarding.ts
"use server"

export async function updateOnboarding(data: OnboardingSchema) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  // Zod validation
  const validated = OnboardingSchema.parse(data);

  // Database operation
  await User.updateOne({ email: session.user.email }, validated);

  return { success: true };
}
```

### 5. Architecture Patterns

**Design Patterns:**
1. **Repository Pattern:** Models encapsulate data access
2. **Service Layer:** Server actions abstract business logic
3. **Factory Pattern:** Activity content generation
4. **Strategy Pattern:** Multiple authentication providers
5. **Singleton Pattern:** Database connection caching

**Security Implementations:**
- Session-based authentication checks
- Role-based permission validation
- Input validation with Zod schemas
- SQL injection prevention via Mongoose
- Token expiration for invitations

---

## Authentication & Authorization

### 1. NextAuth.js Configuration

**File:** `/libs/next-auth.ts`

#### Authentication Providers

**1. Google OAuth (Lines 83-94)**
```typescript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  allowDangerousEmailAccountLinking: true,
  authorization: {
    params: {
      prompt: "select_account",
      access_type: "offline",
    },
  },
})
```

**2. Email Provider (Lines 95-107)**
- Magic link authentication
- Custom verification flow
- SMTP configuration

**3. Credentials - One-Time Token (Lines 109-153)**
- Post-verification auto-login
- Single-use token validation
- Token expiration checking

**4. Credentials - Email/Password (Lines 154-227)**
- Standard authentication
- Email verification requirement
- 2FA via phone OTP (mandatory for verified phones)
- Bcrypt password hashing

#### Session Configuration
```typescript
session: {
  strategy: "jwt",           // Stateless JWT sessions
  maxAge: 30 * 24 * 60 * 60, // 30 days
}
```

### 2. Role-Based Access Control (RBAC)

#### Permission System
**File:** `/libs/permissions.ts`

**Permission Format:** `{ACTION}_{RESOURCE}`

**Actions:**
- CREATE, READ, UPDATE, DELETE

**Resources:**
- User, Role, Article, Material, Ebook, Order, etc.

**Example Permissions:**
- `CREATE_USER`
- `READ_ARTICLE`
- `UPDATE_MATERIAL`
- `DELETE_EBOOK`

#### User Types
**File:** `/types/user.ts`

```typescript
const USER_TYPES = ["Senior", "Family", "Caregiver"] as const;

const userRoleSchema = z.object({
  senior: z.string().nullable().optional(),
  family: z.string().nullable().optional(),
  caregiver: z.string().nullable().optional(),
});
```

### 3. JWT Token Structure

**File:** `/types/next-auth.d.ts`

```typescript
interface JWT {
  id: string
  name: string
  email: string
  photoURL: string
  role: string | null
  roleDetails?: {
    name: string
    permissions: Permission[]
    isDefault: boolean
  }
  emailVerified: string | null
  status: "invited" | "accepted" | "pending"
  isOnboarded: boolean
  userType: "Senior" | "Family" | "Caregiver" | null
  customerId: string | null
  plan: {
    product: "free" | "plus" | "premium"
    period: "monthly" | "yearly"
    end?: Date | null
  }
}
```

### 4. Middleware Protection

**File:** `/middleware.ts`

**Protected Routes:**
```typescript
// Unauthenticated Prevention (Lines 19-29)
if (!token &&
    (path.startsWith("/dashboard") || path.startsWith("/admin/dashboard"))) {
  return redirect to login with callbackUrl
}

// Onboarding Flow (Lines 31-59)
if (token && token.isOnboarded === false) {
  return redirect to /onboarding with callbackUrl
}

// Role-Based Redirects (Lines 61-69)
if (token && !token.role && path.startsWith("/admin/dashboard")) {
  return redirect to /dashboard
}
if (token && token.role && path.startsWith("/dashboard")) {
  return redirect to /admin/dashboard
}
```

### 5. Authorization Helpers

**File:** `/libs/auth-helpers.ts`

```typescript
// Basic authentication check
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { error: null, session };
}

// Admin authorization
export async function requireAdmin() {
  const { error, session } = await requireAuth();
  if (error) return { error, session: null };

  if (session?.user?.roleDetails) {
    const roleName = session.user.roleDetails.name;
    if (roleName === "Super Admin") return { error: null, session };
    if (roleName.toLowerCase().includes("admin")) return { error: null, session };
  }

  return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
}

// Super admin authorization
export async function requireSuperAdmin() {
  const { error, session } = await requireAuth();
  if (error) return { error, session: null };

  if (session?.user?.roleDetails?.name === "Super Admin") {
    return { error: null, session };
  }

  return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
}
```

### 6. Permission Checking

**File:** `/libs/utils.ts`

```typescript
export function hasPermission(
  session: Session | undefined | null,
  requiredPermissions: Permission[]
): boolean {
  if (!session || !session.user.roleDetails) return false;

  const roleDetails = session.user.roleDetails;

  // Super Admin has all permissions
  if (roleDetails.name === "Super Admin") return true;

  if (requiredPermissions.length === 0) return true;

  // Check if user has ANY of the required permissions
  return requiredPermissions.some(permission =>
    roleDetails.permissions.includes(permission)
  );
}
```

---

## Core Features

### 1. Cognitive Activities (13 Types)

**Location:** `/constants/activity-config.ts` (365 lines)

#### Activity Types

**Word-Based Activities:**
1. **Crossword** - Classic word puzzle game
2. **Word Scramble** - Unscramble letters
3. **Word Search** - Find hidden words
4. **Word Grid** - Connect words in grid
5. **Matching Words** - Match related words

**Number-Based:**
6. **Sudoku** - Number placement puzzle

**Visual/Creative:**
7. **Paint by Numbers** - Color artwork with custom/AI images
8. **Maze** - Navigate through puzzles

**Grid-Based:**
9. **Bingo** - Classic grid game

**Content-Based:**
10. **365 Days of Grace** - Daily inspirational content
11. **Riddle** - Brain teasers

**Canvas-Based:**
12. **Stories2Connect** - Interactive storytelling
13. **Care Crafter** - Personalized care activities (NEW)

#### Activity Transformation System

**Bidirectional transformations between compatible activities:**
```typescript
// Example: Crossword can transform to
- word-scramble
- word-search
- matching-words

// Riddle can transform to
- matching-words
- word-search
- word-scramble
- crossword
```

#### AI Generation

**API Endpoints:**
- `/app/api/ai/activities/` - AI-driven content generation
- `/app/api/ai/generate-pbn-images/` - Paint by Numbers images
- `/app/api/ai/validate-pbn-image/` - Image quality validation

**Features:**
- OpenAI GPT models for text generation
- Google Generative AI for image creation
- Prompt engineering for geriatric-appropriate content

### 2. Family Circles

**Location:** `/types/family-circle.ts`, `/app/(user)/dashboard/family-circles/`

#### Core Concepts
- **Family Circles:** Groups dedicated to a specific person (elder)
- **Members:** Family members and caregivers (max 20 per circle)
- **Answers:** Individual questionnaire responses
- **Aggregated Data:** Combined insights from all members

#### Features
```typescript
// Circle Creation
POST /api/family-circles/
- Transaction support for atomic operations
- Automatic membership for creator
- Invite token generation (7-day expiry)

// Invite Members
POST /api/family-circles/[id]/invites/
- Email-based invitations (max 10 per invite)
- Custom invite messages

// Join Circle
POST /api/family-circles/join/
- Token-based joining
- Automatic membership creation

// Answer Questions
POST /api/family-circles/[id]/answers/
- Filler information (relationship, personal details)
- Multi-section questionnaire
- HTML sanitization for security

// View Aggregated Data
GET /api/family-circles/[id]/aggregated/
- Combined family insights
- Member participation stats
- Answer counts per question
```

### 3. E-book System

#### E-book Project Wizard
**Location:** `/types/ebook-project.ts` (662 lines)

**7-Step Workflow:**
1. **Genre Selection** - Choose story genre
2. **Story Setup** - Initial story creation
3. **Story Edit** - Refined story data
4. **Design Preferences** - Aspect ratio, fonts, art style
5. **Visual Theme** - Characters, settings, references
6. **Story Breakdown** - Page generation
7. **Section Cards** - Image generation per page
8. **Preview/Export** - Final review and publishing

**Reading Levels:**
- **Full Story Level 1:** 62 pages, 2000-2500 words
- **Easy Reading Level 2:** 32-40 pages, 1000-1500 words
- **Simple Story Level 3:** 16-24 pages, 500-800 words
- **Picture Story Level 4:** 8-12 pages, 200-400 words

#### E-book Request System
**Location:** `/types/ebook-request.ts`

**Elder Profile Sections:**
1. Getting to Know You (basic info, family)
2. Life Journey (memories, education, life-shaping moments)
3. What Brings Joy (hobbies, cultural favorites)
4. Values and Beliefs (philosophy, influences)
5. Life Today (daily routine, challenges)
6. Special Memories (favorites, advice)

**Payment Integration:**
- Stripe checkout for one-time payments
- Pricing based on reading level
- API: `/app/api/checkout/ebook-request/`

### 4. Care Prints System

**Location:** `/app/(user)/care-prints/`

#### Structure
- **Categories:** Multi-level (General → Category → Sub-category)
- **Products:** Printables and physical items
- **Variations:** Single, Pair, Multiple options
- **Access Tiers:** free, premium, subscriber_gifts

#### Features
```typescript
interface Product {
  type: "printable" | "physical"
  price: number
  shippingFee: number
  stockAvailable: number
  cognitiveSkills: string[] // memory, attention, problem-solving
  conditions: string[] // dementia, Alzheimer's
  conditionStages: string[] // early, moderate, advanced
  readingLevels: string[]
  accessTier: "free" | "premium" | "subscriber_gifts"
}
```

### 5. Memoirs

**Location:** `/types/memoir.ts`

**Memoir Structure:**
- Title, description, thumbnail
- Image gallery with blur hashes
- Category hierarchy
- Like system with counts
- Featured memoir support

**Memoir Request System:**
- Comprehensive questionnaire (13,729+ lines)
- Payment integration ($49.99)
- Admin fulfillment workflow
- API: `/app/api/memoirs/requests/`

### 6. Stories2Connect

**Location:** `/types/stories2connect-types.ts`

**Template System:**
- Canvas-based layouts with percentage positioning
- Multiple area types: title, story, questions, answers
- Template presets: blank, story-recall, story-connect
- Overflow handling: autoshrink, ellipsis, wrap

**Categories:**
- Memories, Educational, Activities, Therapeutic
- Difficulty levels: easy, medium, hard
- Target audiences: dementia, mild-cognitive-impairment

### 7. AI Chat Assistants

**Location:** `/types/ai-assistant.ts`

**Features:**
- Custom titles and avatars
- Model selection (GPT variants)
- Parameter tuning: top_p, temperature, penalties
- System role configuration
- Folder organization

**Chat System:**
- Real-time messaging via Socket.io
- Conversation history
- Message attachments
- Typing indicators
- Read receipts

### 8. User Chat System

**Location:** `/types/chat.ts` (305 lines)

**Message Features:**
- Text messages with attachments
- Message reactions (like, love, haha, wow, sad, angry)
- Message editing with history
- Reply to messages
- Message pinning

**Conversation Types:**
- Private (1-on-1)
- Group chats
- Permissions management
- Auto-delete settings

**Socket Events (70+ events):**
- Message events
- Presence events
- Typing indicators
- Online status

### 9. Subscription System

**Location:** `/constant/plans.ts` (425 lines)

#### Three Tiers

**1. Free Plan ($0/month)**
- 5 activity categories
- 2 materials per category
- Monthly featured activity
- Max 5 daily downloads, 100 monthly

**2. Plus Plan**
- Monthly: $14/month (was $25)
- Yearly: $149/year (50% savings)
- 10 categories (monthly) / All (yearly)
- 100+ materials (monthly) / Unlimited (yearly)
- Paint by Numbers access
- Unlimited downloads

**3. Premium Plan (Featured)**
- Monthly: $24/month (was $34)
- Yearly: $239/year (60% savings)
- All categories unlocked
- Unlimited materials
- All events (past & future)
- Legacy feature discounts

**Stripe Integration:**
- Webhook handling: `/app/api/webhooks/stripe/`
- Customer portal integration
- Subscription events tracking

### 10. Admin Dashboard (40+ Sections)

**Location:** `/app/(admin)/admin/dashboard/`

#### Content Management
- Activities, Care Prints, Stories2Connect
- Memoirs, Blogs, Changelogs
- Newsletters

#### User Management
- Users (CRUD, role assignment, subscriptions)
- Admin Users
- Roles (permission-based)
- Activity Logs

#### Request Management
- E-book Requests
- Memoir Requests
- Contact Submissions
- Career Applications
- Franchise Submissions

#### Asset Management
- PBN Assets (folder organization)
- Advertisements
- Testimonials

#### Analytics
- General Statistics
- User Activity Logs
- Download Tracking
- Browse Analytics

---

## Database Schema

### Core Collections

#### users
```typescript
{
  _id: ObjectId
  email: String (unique, indexed)
  name: String
  photoURL: String
  password: String (hashed)
  emailVerified: Date | null
  phoneNumber: String | null
  phoneVerified: Date | null
  role: ObjectId (ref: roles)
  status: "invited" | "accepted" | "pending"
  isOnboarded: Boolean
  userType: "Senior" | "Family" | "Caregiver"
  customerId: String (Stripe)
  plan: {
    product: "free" | "plus" | "premium"
    period: "monthly" | "yearly"
    end: Date | null
  }
  createdAt: Date
  updatedAt: Date
}
```

#### roles
```typescript
{
  _id: ObjectId
  name: String
  description: String
  permissions: [String] // Array of permission codes
  image: { url: String, blurHash: String }
  isDefault: Boolean
  createdAt: Date
  updatedAt: Date
}
```

#### familycircles
```typescript
{
  _id: ObjectId
  name: String (max 100)
  dedicatedTo: String
  dedicatedPersonBirthdate: Date
  dedicatedPersonSex: String
  creator: ObjectId (ref: users, indexed)
  inviteToken: String (unique)
  inviteTokenExpires: Date
  createdAt: Date
  updatedAt: Date
}
```

#### circlememberships (Junction Table)
```typescript
{
  _id: ObjectId
  circle: ObjectId (ref: familycircles)
  user: ObjectId (ref: users)
  joinedAt: Date
  // Compound unique index: (circle, user)
}
```

#### circleanswers
```typescript
{
  _id: ObjectId
  circle: ObjectId (ref: familycircles)
  member: ObjectId (ref: users)
  relation: String
  questionnaire: {
    fillerInformation: Mixed
    sections: [Mixed] // Dynamic questionnaire data
  }
  createdAt: Date
  updatedAt: Date
}
```

#### activities
```typescript
{
  _id: ObjectId
  type: String // crossword, word-search, sudoku, etc.
  content: Mixed // Polymorphic based on type
  author: ObjectId (ref: users)
  familyCircleId: ObjectId (ref: familycircles)
  customization: {
    borderColor: String
    backgroundColor: String
    titleFontSize: Number
    // 20+ customization fields
  }
  language: String
  transformationHistory: [Mixed]
  isDraft: Boolean
  createdAt: Date
  updatedAt: Date
}
```

#### products
```typescript
{
  _id: ObjectId
  name: String
  description: String
  slug: String (unique, indexed)
  type: "printable" | "physical"
  price: Number
  shippingFee: Number
  stockAvailable: Number
  group: String
  eventMonth: ObjectId (ref: eventmonths)
  event: ObjectId (ref: events)
  eventCategory: ObjectId (ref: eventcategories)
  images: [{ url: String, blurHash: String }]
  cognitiveSkills: [String]
  conditions: [String]
  conditionStages: [String]
  readingLevels: [String]
  accessTier: "free" | "premium" | "subscriber_gifts"
  sortOrder: Number
  createdAt: Date
  updatedAt: Date
}
```

### Indexes Summary

**Unique Indexes:**
- users.email
- familycircles.inviteToken
- products.slug

**Compound Indexes:**
- circlememberships: (circle, user)

**Single Field Indexes:**
- users.role
- familycircles.creator
- activities.author
- products.slug

---

## API Architecture

### API Route Structure

```
app/api/
├── auth/
│   ├── [...nextauth]/        # NextAuth handler
│   ├── register/              # User registration
│   ├── verify-email/          # Email verification
│   ├── forgot-password/       # Password reset
│   └── reset-password/        # Password reset completion
│
├── family-circles/
│   ├── route.ts               # List/Create circles
│   ├── [id]/
│   │   ├── route.ts           # Get/Update/Delete circle
│   │   ├── activities/        # Circle activities
│   │   ├── answers/           # Circle answers
│   │   ├── invites/           # Send invites
│   │   └── members/           # Member management
│   └── join/                  # Join via token
│
├── activities/
│   ├── route.ts               # List/Create activities
│   └── [id]/                  # Get/Update/Delete activity
│
├── products/
│   ├── route.ts               # List/Create products
│   ├── [id]/                  # Get/Update/Delete product
│   ├── search/                # Search products
│   └── variations/            # Product variations
│
├── ebooks/
│   ├── route.ts               # List ebooks
│   ├── [id]/                  # Get ebook
│   └── requests/              # Ebook requests
│
├── memoirs/
│   ├── route.ts               # List/Create memoirs
│   ├── [id]/                  # Get/Update/Delete memoir
│   └── requests/              # Memoir requests
│
├── ai/
│   ├── activities/            # AI activity generation
│   ├── generate-image/        # Image generation
│   ├── generate-pbn-images/   # Paint by Numbers
│   ├── blog/                  # Blog AI assistance
│   └── playground/            # AI testing
│
├── users/
│   ├── route.ts               # List/Create users
│   └── [id]/                  # Get/Update/Delete user
│
├── roles/
│   ├── route.ts               # List/Create roles
│   └── [id]/                  # Get/Update/Delete role
│
├── checkout/
│   ├── route.ts               # General checkout
│   ├── ebook-request/         # Ebook checkout
│   └── memoir-request/        # Memoir checkout
│
├── webhooks/
│   └── stripe/                # Stripe webhooks
│
├── cart/                      # Shopping cart
├── phone/                     # Phone verification
├── cloudinary/                # Image upload
└── ...                        # 60+ total endpoint groups
```

### API Response Standards

**File:** `/libs/api-response.ts`

```typescript
// Success Responses
success(data, message?)      // 200 OK
created(data, message?)      // 201 Created
noContent()                  // 204 No Content

// Error Responses
badRequest(message, details?) // 400 Bad Request
unauthorized(message?)        // 401 Unauthorized
forbidden(message?)           // 403 Forbidden
notFound(message?)            // 404 Not Found
validation(errors)            // 400 with validation errors
internal(error)               // 500 Internal Server Error
```

### Authentication Flow

```
1. User submits credentials
   ↓
2. POST /api/auth/[...nextauth]
   ↓
3. Validate credentials
   ↓
4. Generate JWT token
   ↓
5. Set secure HTTP-only cookie
   ↓
6. Return session data
```

### Authorization Flow

```
1. Client makes API request
   ↓
2. Middleware extracts JWT from cookie
   ↓
3. Verify token signature
   ↓
4. Check route protection rules
   ↓
5. API route calls requireAuth() or requireAdmin()
   ↓
6. Verify permissions with hasPermission()
   ↓
7. Process request or return 401/403
```

---

## Third-Party Integrations

### Payment & Billing
- **Stripe** (19.2.0)
  - Subscriptions
  - One-time payments
  - Customer portal
  - Webhooks

### AI & ML
- **OpenAI** (5.20.1)
  - GPT-4/3.5 for text generation
  - Content creation
  - Activity generation
- **Google Generative AI** (0.24.1)
  - Image generation
  - Visual content

### Communication
- **Twilio** (5.0.1)
  - Phone verification
  - SMS OTP
- **Resend** (3.2.0)
  - Transactional emails
- **React Email** (2.1.4)
  - Email templates
- **Socket.io** (4.8.1)
  - Real-time chat
  - Presence system

### Storage & Media
- **Cloudinary** (2.0.1)
  - Image hosting
  - Video hosting
  - Transformations
- **MongoDB Atlas**
  - Primary database
  - Automatic backups

### Analytics
- **Vercel Analytics** (1.2.2)
  - Web analytics
- **Plausible** (3.11.3)
  - Privacy-focused analytics

### Developer Tools
- **Sharp** (0.33.5)
  - Image processing
- **Puppeteer** (24.22.0)
  - PDF generation
  - Headless browser

---

## Development Workflow

### Scripts

```json
{
  "dev": "next dev --turbo",
  "build": "NODE_OPTIONS='--max-old-space-size=8192' next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "email:dev": "email dev --dir emails --port 3002",
  "stripe:listen": "stripe listen --forward-to localhost:3000/api/webhooks/stripe",
  "migrate": "tsx seed.ts",
  "backup": "node scripts/mongodb-backup.js",
  "optimize-images": "tsx scripts/optimize-images.ts"
}
```

### Environment Variables

**Required:**
```env
# Database
MONGODB_URI=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# OAuth Providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# OpenAI
OPENAI_API_KEY=

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Resend
RESEND_API_KEY=

# Email
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=
```

### Git Hooks (Husky)

**Pre-commit:**
- ESLint checks
- Prettier formatting
- TypeScript type checking

**Pre-push:**
- Run tests
- Build check

### Testing

**Framework:** Jest + React Testing Library
**Configuration:** `/jest.config.js`

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}
```

### Code Quality

**ESLint Configuration:** `.eslintrc.json`
```json
{
  "extends": [
    "next/core-web-vitals",
    "eslint-config-prettier"
  ]
}
```

**Prettier Configuration:** `.prettierrc`
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "tabWidth": 2
}
```

### Deployment

**Platform:** Vercel
**Configuration:** `vercel.json`

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

**Build Configuration:**
- Node version: >=22.0.0
- Max memory: 8192MB
- Turbo mode for development
- Edge runtime for API routes

---

## Conclusion

The Geriatric Care Solution is a comprehensive, enterprise-grade platform that combines:

- **Modern Architecture:** Next.js 14 App Router with Server Components
- **Type Safety:** TypeScript strict mode with Zod validation
- **Robust Backend:** MongoDB with Mongoose, 77 data models
- **Secure Authentication:** NextAuth.js with multi-provider support and RBAC
- **AI Integration:** OpenAI and Google AI for content generation
- **Real-time Features:** Socket.io for chat and presence
- **E-commerce:** Stripe integration with subscription management
- **Scalability:** Optimized database queries, caching, and CDN integration

The platform specifically targets geriatric care with features designed for dementia support, caregiver assistance, and family engagement, making it a unique and specialized solution in the elder care space.

---

**Document Version:** 1.0
**Last Updated:** November 6, 2025
**Maintainer:** Development Team
