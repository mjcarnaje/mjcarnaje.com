# Anaya Care Platform - Complete Monorepo Analysis

**Generated**: November 6, 2025
**Monorepo Structure**: Backend (NestJS) + Mobile (React Native/Expo) + Web (Next.js)

---

## Executive Summary

The **Anaya Care Platform** is a comprehensive, enterprise-grade care management ecosystem designed to streamline and enhance elderly care services. The platform connects multiple stakeholders (care providers, care managers, administrators, family members, and medical professionals) through three interconnected applications:

- **Backend API** (NestJS): 30+ feature modules serving RESTful endpoints and WebSocket services
- **Mobile App** (React Native/Expo): 72 screens with role-based navigation and real-time features
- **Web Application** (Next.js 14): 94+ dashboard pages with sophisticated care management workflows

### Key Capabilities

- **Care Management**: End-to-end workflow from initial assessment to service delivery
- **Real-time Communication**: Dual WebSocket architecture for messaging and notifications
- **AI-Powered Services**: 9 specialized OpenAI integrations for care planning and recommendations
- **Shift Scheduling**: Advanced scheduling with recurring patterns and GPS-tracked time clock
- **Health Monitoring**: Comprehensive vital signs tracking and health observations
- **Secure Document Storage**: HIPAA-compliant file management (Lockare)
- **Cross-Platform Sync**: Seamless data synchronization between web and mobile

---

# 1. Backend (anaya-backend/) - NestJS API Server

## Overview

A production-grade, TypeScript-based backend API built with NestJS, serving as the core service layer for the entire Anaya Care ecosystem. The backend handles authentication, care management, real-time communication, AI integrations, and comprehensive business logic.

### Quick Stats

- **Framework**: NestJS 10.x + TypeScript 5.1
- **Modules**: 30+ feature modules
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Dual Socket.IO gateways (chat, notifications)
- **Background Jobs**: BullMQ with Redis queue system
- **External APIs**: OpenAI, Twilio, AWS S3, Google Maps, Expo Push

## Technology Stack

### Core Technologies

| Category     | Technology               | Purpose                           |
| ------------ | ------------------------ | --------------------------------- |
| Framework    | NestJS 10.x              | Progressive Node.js framework     |
| Language     | TypeScript 5.1           | Type-safe development             |
| Database     | MongoDB + Mongoose 8.8   | NoSQL data persistence            |
| Auth         | Passport + JWT           | Multi-method authentication       |
| Real-time    | Socket.IO 3.x            | WebSocket communication           |
| Cache/Queue  | Redis + IORedis + BullMQ | Caching and background processing |
| File Storage | AWS S3 SDK               | Cloud file storage                |
| AI           | OpenAI 5.16              | AI-powered care services          |

### External Integrations

- **AWS S3**: File storage with presigned URLs
- **Twilio**: SMS verification and notifications
- **OpenAI**: 9 specialized AI services for care planning
- **Google Maps**: Address validation, geolocation, timezone detection
- **Resend**: Transactional email delivery
- **Expo Push**: Mobile push notifications

## Architecture

### Module Organization

**Core Modules**:

- `AuthModule` - JWT authentication with multiple login methods
- `UsersModule` - User management with role-based profiles
- `ClientsModule` - Client (patient) management with 13 specialized services
- `ShiftsModule` - Shift scheduling and timesheet management
- `ChatModule` - Real-time messaging system
- `NotificationModule` - Multi-channel notification delivery
- `CareProposalsModule` - Care proposal generation and workflow
- `InitialAssessmentsModule` - Initial client assessments

**Supporting Modules** (22 additional):
FilesModule, OpenAIModule, MealsModule, GoogleMapsModule, HealthMetricsModule, HealthObservationsModule, RatingsModule, SkillsModule, TrainingsModule, ProfileSetupModule, PdfModule, BaseRatesModule, BullBoardConfigModule, and more.

### Design Patterns

1. **Service Layer Pattern**: Controllers delegate to services for business logic
2. **Repository Pattern**: Mongoose models act as data repositories
3. **Event-Driven Architecture**: EventEmitter2 for cross-module communication
4. **Queue-Based Processing**: BullMQ for asynchronous jobs
5. **Gateway Pattern**: Dual WebSocket gateways for chat and notifications
6. **Decorator Pattern**: Custom `@Roles()`, `@Public()`, `@RateLimit()` decorators
7. **Strategy Pattern**: Multiple Passport strategies (JWT, Local)

## Database Models

### Key Collections

**Users Collection** (`users`):

```typescript
{
  id, firstName, lastName, email, username, phone, password
  role: UserRole enum (SuperAdmin, Admin, CareManager, CareProvider, Family, MedicalProfessional)
  image, address, timezone, dateFormat, timeFormat
  emailVerified, phoneVerified, isActive, isOnboarded
  expoPushTokens[] // For mobile push notifications
  References: medicalProfessional, careProvider, family
}
```

**Clients Collection** (`clients`):

```typescript
{
  patientId, firstName, lastName, dateOfBirth, sex
  address (city, state, zip, coordinates)
  mainContacts[] (emergency contacts)
  reasonForSeekingHelp, benefitsInquiry
  References: careProposal, service, careProviders, medicalRecord, assessments
  statusHistory[] // Track status changes
}
```

**CaregiverAssignment Collection** (`caregiver_assignments`):

```typescript
{
  client, caregiver, invitedBy
  currentStatus, statusHistory[]
  notes
  Unique Index: (client, caregiver)
}
```

**ShiftAssignment Collection** (`shift_assignments`):

```typescript
{
  client, caregiver, schedule, tzid, dtstart, durationMinutes
  currentStatus: ShiftStatus enum (GENERATED → ASSIGNED → ACCEPTED → IN_PROGRESS → COMPLETED)
  timesheet (clock-in/clock-out data with GPS)
  reflection (post-shift documentation)
  completionRequirements (tasks, reflection)
  Virtual: temporalStatus (PAST, CURRENT, UPCOMING, FUTURE)
}
```

**Message & Group Collections** (`messages`, `groups`):

```typescript
// Group
{ name, type (PRIVATE, GROUP), participants[], lastMessage, lastMessageAt }

// Message
{ content, sender, conversation, attachments[], reactions[], readBy[], deliveredTo[], isDeleted }
```

### Relationships

- **One-to-One**: User → CareProvider/MedicalProfessional/Family (optional extension)
- **One-to-Many**: Client → CaregiverAssignments, Client → ShiftAssignments
- **Many-to-Many**: Clients ↔ Caregivers (through CaregiverAssignment), Users ↔ Groups

## API Endpoints

### Authentication

- `POST /auth/login` - Password login
- `POST /auth/login/phone` - Phone SMS code login
- `POST /auth/magic-link` - Magic link email
- `POST /auth/verify` - Verify magic link

### Clients (30+ endpoints)

- `GET /clients` - List with filters (role, status, city)
- `POST /clients` - Create client
- `GET /clients/:id` - Get client details
- `PATCH /clients/:id` - Update client
- `POST /clients/:id/caregivers` - Assign caregiver
- `GET /clients/:clientId/schedules` - Client schedules
- `GET /clients/:clientId/care-provider-tasks` - Task management
- `GET /clients/:clientId/health-metrics` - Health tracking

### Shifts

- `GET /shifts` - List shifts with filters
- `POST /shifts/generate` - Generate shifts from schedule
- `PATCH /shifts/:id/accept` - Accept shift
- `POST /shifts/:id/clock-in` - Clock in with GPS
- `POST /shifts/:id/clock-out` - Clock out
- `POST /shifts/:id/reflection` - Submit post-shift reflection

### Care Proposals

- `GET /care-proposals` - List proposals
- `POST /care-proposals` - Create proposal
- `POST /care-proposals/:id/submit` - Submit for review
- `POST /care-proposals/:id/approve` - Approve proposal

### Chat & Communication

- `GET /conversations` - List conversations
- `GET /conversations/:id/messages` - Get messages
- WebSocket events for real-time messaging

### OpenAI Services

- `POST /openai/care-plan` - Generate AI care plan
- `POST /openai/meals` - Generate meal plan
- `POST /openai/tasks` - Generate task recommendations

## Real-time Features

### Dual WebSocket Architecture

**ChatGateway** (`/chat` namespace):

- Real-time messaging with delivery/read receipts
- Typing indicators
- Message reactions (emoji)
- Conversation management
- Online presence tracking

**NotificationGateway** (`/notification` namespace):

- Push notification delivery
- Real-time alerts
- System events
- Progress updates for long-running operations

### Socket Events (97+ defined)

```typescript
// Message events
SEND_MESSAGE, RECEIVE_MESSAGE, MESSAGE_DELIVERED, MESSAGE_READ;
TYPING_START, TYPING_STOP, REACTION_ADDED, REACTION_REMOVED;

// Conversation events
CREATE_CONVERSATION, JOIN_CONVERSATIONS, LEAVE_CONVERSATIONS;

// Notification events
NOTIFICATION_SENT, NOTIFICATION_CREATED;

// Progress tracking events
SHIFTS_OPERATION_PROGRESS, SHIFTS_OPERATION_COMPLETED;
CARE_PLAN_GENERATION_PROGRESS, CARE_PLAN_GENERATION_COMPLETED;
CLIENT_MEALS_GENERATION_PROGRESS;
```

### Connection Management

1. Client connects with JWT token in auth header
2. WebSocketAuthService validates token
3. User data attached to socket
4. User joins personal room: `user-${userId}`
5. Redis tracks connected users
6. Broadcasts to rooms: `user-${userId}`, `conversation:${id}`

## AI-Powered Services

### 9 Specialized OpenAI Services

1. **AIClientCarePlanService** - Generate personalized care plans
2. **AIClientCareProposalService** - Draft care proposals
3. **AIClientCareProviderTasksGenerationService** - Auto-generate daily tasks
4. **AIClientCareReadinessAssessmentService** - Assess care readiness
5. **AIClientEngagementActivityService** - Suggest activities
6. **AIClientMealsService** - Create meal plans with dietary restrictions
7. **AIClientMedicationService** - Medication recommendations
8. **AIHealthObservationRecommendationService** - Health insights
9. **AITaskPromptBuilderService** - Build task prompts

**Features**:

- Uses GPT-4 models with structured output
- Token counting with tiktoken
- Streaming responses for long operations
- Progress tracking via WebSocket

## Background Job Processing

### BullMQ Queues

- **Notification Queue**: Push notifications and emails
- **Shift Generation Queue**: Bulk shift creation
- **Care Plan Queue**: AI care plan generation
- **Email Queue**: Transactional emails

### Queue Monitoring

- Bull Board dashboard at `/admin/queues`
- Job status tracking
- Retry configuration
- Failed job handling

## Security & Authentication

### Multi-Method Authentication

1. **Password Login** - Username/password with bcrypt hashing
2. **Phone SMS Login** - Twilio verification codes
3. **Magic Link** - Email-based passwordless login

### Role-Based Access Control (RBAC)

```
SuperAdmin → Admin → CareManager → CareProvider / MedicalProfessional / Family
```

**Implementation**:

- `@Roles()` decorator on controllers
- `RolesGuard` checks user role
- Service-level permission checks
- JWT payload includes role

### Security Measures

- Password hashing with bcrypt
- JWT secret from environment
- CORS configuration
- Rate limiting with Redis
- Input validation with class-validator
- Request logging middleware

## Environment Configuration

### Required Environment Variables

```bash
# Database
MONGO_URI=mongodb://localhost:27017/anaya

# Authentication
JWT_SECRET=your-secret-key

# AWS S3
S3_ACCESS_KEY=
S3_SECRET_ACCESS_KEY=
S3_REGION=us-east-1
S3_BUCKET_NAME=

# Redis
REDISHOST=localhost
REDISPORT=6379
REDISPASSWORD=
REDISUSER=

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_VERIFICATION_SERVICE_SID=

# OpenAI
OPENAI_API_KEY=

# Google Maps
GOOGLE_MAPS_API_KEY=

# Email
RESEND_API_KEY=

# Expo Push
EXPO_ACCESS_TOKEN=
EXPO_USE_FCM_V1=true

# Application
FRONTEND_URL=http://localhost:3000
```

## Key Features

### 1. Care Management System

- Multi-step care proposal workflow (Draft → Pending → Approved)
- AI-assisted proposal generation
- PDF export with branding
- Rate computation based on location
- Initial assessments with conversion to proposals

### 2. Shift Scheduling

- Automated shift generation from recurring schedules (RRule)
- Bulk generation with progress tracking
- Clock-in/clock-out with GPS verification
- Auto clock-out after grace period
- Timesheet reconciliation
- Post-shift reflection requirements

### 3. Communication

- Group and private chat
- File attachments with blurhash previews
- Message reactions and read receipts
- Real-time typing indicators
- Multi-channel notifications (WebSocket, Push, Email)

### 4. Health Monitoring

- Health metrics (BP, heart rate, glucose, weight)
- Health observations with AI recommendations
- Medication management
- Engagement activities

### 5. Document Management

- S3 integration with presigned URLs
- File metadata tracking
- Secure access control
- PDF generation for proposals and reports

## File Structure

```
anaya-backend/
├── src/
│   ├── app.module.ts                # Root module
│   ├── main.ts                      # Bootstrap
│   ├── auth/                        # Authentication
│   ├── users/                       # User management
│   ├── clients/                     # Client management (13 services)
│   ├── shifts/                      # Shift scheduling
│   ├── chat/                        # Real-time chat
│   ├── notification/                # Notifications
│   ├── care-proposals/              # Care proposals
│   ├── openai/                      # AI services (9 services)
│   ├── files/                       # File management
│   ├── google-maps/                 # Google Maps integration
│   ├── health-metrics/              # Health tracking
│   ├── meals/                       # Meal planning
│   ├── common/                      # Shared utilities
│   ├── websocket/                   # WebSocket auth
│   └── emails/                      # Email templates (React)
├── public/                          # Static assets
├── package.json
├── .env.example
└── CLAUDE.md
```

## Testing

- **Jest** configured with NestJS testing utilities
- Test commands: `npm test`, `npm run test:cov`, `npm run test:e2e`
- Infrastructure in place but limited test coverage
- Recommended priorities: Auth flows, shift scheduling, care proposals

---

# 2. Mobile App (anaya-mobile/) - React Native + Expo

## Overview

A comprehensive healthcare management mobile application built with React Native and Expo, providing cross-platform access (iOS, Android, Web) to the Anaya Care platform. The app features role-based navigation, real-time communication, care documentation, and offline-capable health tracking.

### Quick Stats

- **Framework**: React Native 0.81.5 + Expo 54
- **Navigation**: Expo Router v6 (file-based routing)
- **Screens**: 72 screens across 6 user roles
- **State Management**: Zustand (3 stores) + React Query
- **UI Framework**: Tamagui with light/dark themes
- **Components**: 122+ reusable components

## Technology Stack

### Core Technologies

| Category     | Technology      | Version | Purpose                   |
| ------------ | --------------- | ------- | ------------------------- |
| Framework    | React Native    | 0.81.5  | Cross-platform mobile     |
| Platform     | Expo            | 54.0.0  | Development & deployment  |
| Language     | TypeScript      | 5.9.2   | Type safety               |
| Navigation   | Expo Router     | 6.0.14  | File-based routing        |
| State        | Zustand         | 5.0.3   | Client state              |
| Server State | React Query     | 5.83.0  | Data fetching & caching   |
| UI           | Tamagui         | 1.136.1 | Cross-platform components |
| Real-time    | Socket.IO       | 4.8.1   | WebSocket communication   |
| Forms        | React Hook Form | 7.62.0  | Form management           |
| Validation   | Zod             | 4.0.17  | Schema validation         |

### Key Expo Modules

- **expo-notifications** (0.32.12): Push notifications
- **expo-secure-store** (15.0.7): Encrypted token storage
- **expo-camera** (17.0.9): Document scanning
- **expo-location** (19.0.7): GPS tracking
- **expo-calendar** (15.0.7): Calendar integration
- **expo-image** (3.0.10): Optimized images with blurhash

### UI & Animation Libraries

- **Tamagui**: Theme-aware component system
- **React Native Reanimated** (4.1.1): High-performance animations
- **@gorhom/bottom-sheet** (5.2.4): Modern bottom sheets
- **@shopify/flash-list** (2.0.2): Optimized lists
- **Lucide React Native** (0.513.0): Icon library

## Architecture

### File-Based Routing (Expo Router v6)

```
app/
├── index.tsx                    # Initial auth routing logic
├── _layout.tsx                  # Root layout with providers
├── (onboarding)/                # New user onboarding
├── (auth)/                      # Authentication screens
│   ├── sign-in/
│   ├── sign-up/
│   └── verify-phone/
├── (dashboard)/                 # Main app (authenticated)
│   ├── (tabs)/                  # Bottom tab navigation (role-based)
│   │   ├── home/               # Role-specific home screens (6 variants)
│   │   ├── feed/               # Social feed
│   │   ├── chat/               # Messaging
│   │   ├── appointments/       # Appointment management
│   │   ├── medications/        # Medication tracking
│   │   ├── profile/            # User settings
│   │   ├── invitations/        # Invitation management
│   │   └── notifications/      # Notification center
│   ├── client/[id]/            # Client detail screens
│   │   ├── care-plan/
│   │   ├── health/
│   │   ├── lockare/            # Secure documents
│   │   ├── medications/
│   │   └── resident-profile/
│   ├── schedule/[id]/          # Shift scheduling
│   ├── trainings/[id]/         # Training modules
│   └── take-assessment.tsx     # Care assessments
├── setup-profile/              # Profile setup wizards
│   ├── careprovider/
│   └── medicalprofessional/
└── user-profile/[userId].tsx   # Modal user profile
```

### Navigation Features

- **Dynamic tab visibility** based on user role
- **Modal presentations** for user profiles
- **Nested navigation** within client details
- **Typed routes** for type-safe navigation
- **Conditional tab bar hiding** for full-screen experiences

### Initial Flow Logic

1. Initialize auth store from SecureStore
2. Check onboarding status from AsyncStorage
3. Route appropriately:
   - Not onboarded → `/(onboarding)`
   - Not authenticated → `/(auth)/sign-in`
   - Authenticated → `/(dashboard)/(tabs)/home`

## State Management

### 3 Zustand Stores

#### 1. Auth Store (`store/auth-store.ts`)

```typescript
interface AuthState {
  isAuthenticated: boolean;
  user: UserResponseType | null;
  token: string | null;
  login: (userData) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  setNotificationCount: (count: number) => void;
}
```

**Features**:

- SecureStore integration for JWT persistence
- Automatic push token sync on login
- Notification count tracking

#### 2. Chat Store (`store/chat-store.ts`)

```typescript
interface ChatStore {
  messages: Message[];
  conversations: Conversation[];
  groups: Group[];
  selectedConversationId: string | null;
  addMessage;
  updateMessage;
  markAsDeleted;
  updateConversationWithMessage;
}
```

**Features**:

- Conversation sorting by last message
- Unread count management
- Optimistic UI updates
- Real-time synchronization

#### 3. Profile Store (`store/profile-store.ts`)

```typescript
interface ProfileState {
  requiresProfileSetup: boolean;
  profileSetupStatus: ProfileSetupStatus | null;
  careProvider;
  medicalProfessional;
  family;
  fetchProfileSetupStatus;
  completeStep;
  verifyClientConnection;
}
```

**Features**:

- Multi-step profile setup tracking
- Role-specific profile data
- Client verification for family members

### React Query Integration

- Global QueryClient with 5-second stale time
- Query patterns for all API calls
- Automatic cache invalidation on mutations
- Network-aware requests

## UI Framework (Tamagui)

### Theme System

**Dual Theme Support** (Light & Dark):

- Theme Context with AsyncStorage persistence
- System theme detection by default
- 60+ semantic colors

**Light Theme Colors**:

```typescript
{
  primary: "#B70074",       // Brand color
  secondary: "#F743A5",     // Accent
  tertiary: "#3B8223",      // Success
  background: "#F1F7FF",    // Main background
  surface: "#FFFFFF",       // Cards
  textPrimary: "#1A202C",   // Primary text
  textSecondary: "#4A5568", // Secondary text
  // ... 50+ more semantic colors
}
```

**Semantic Color System**:

- Surface colors (no opacity for performance)
- Tinted backgrounds (solid colors)
- Border colors (subtle, consistent)
- Status colors (success, error, warning, info)
- Text hierarchy (primary, secondary, tertiary, muted)

### Styling Architecture

- **Tamagui components** for layout: `YStack`, `XStack`, `Circle`
- **StyleSheet.create** for all styling (performance)
- **No shadows** - use subtle borders instead
- **Consistent border radius**: 16-25px

### Typography

- **Headers**: 18px (Poppins SemiBold)
- **Body**: 14-15px (Inter Regular)
- **Secondary**: 13px (metadata)
- **Small**: 11px (labels)
- **Fonts**: Inter (body), Poppins (headlines) - complete families (100-900)

## API Integration

### Axios Configuration (`lib/axios.ts`)

```typescript
export const BASE_URL = __DEV__
  ? `http://localhost:3001`
  : "https://api.anaya.care";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});
```

**Request Interceptor**:

- Network connectivity check via NetInfo
- Automatic JWT injection from SecureStore
- Throws error if no internet

**Response Interceptor**:

- Global error handling with toasts
- Status code mapping (401, 403, 404, 500)
- User-friendly error messages

### API Service Modules (33 files)

```
lib/
├── axios.ts                          # Base instance
├── user-api.ts                       # User profiles
├── client-api.ts                     # Client operations
├── caregiver-assignment-api.ts       # Assignments
├── care-plan-api.ts                  # Care plans
├── shift-assignment-api.ts           # Shifts
├── conversation-api.ts               # Chat
├── lockare-api.ts                    # Secure documents
├── meals-api.ts                      # Meal planning
├── health-observations-api.ts        # Health tracking
└── [23 more specialized APIs]
```

## Real-time Features

### Dual Socket Architecture (`contexts/socket-context.tsx`)

```typescript
const chatSocket = io(`${BASE_URL}/chat`, {
  auth: { token },
  transports: ["websocket"],
});

const notificationSocket = io(`${BASE_URL}/notification`, {
  auth: { token },
});
```

### Socket Events

**Chat Events**:

- `MESSAGE_SENT`, `MESSAGE_UPDATED`, `MESSAGE_DELETED`
- `MESSAGE_REACTION_ADDED`, `MESSAGE_REACTION_REMOVED`
- `UPDATE_USERS_LIST` (online presence)
- `READ_RECEIPT`
- `TYPING_START`, `TYPING_END`

**Notification Events**:

- `NOTIFICATION_SENT` with unread count
- `CARE_READINESS_ASSESSMENT_GENERATION_PROGRESS`
- `CARE_READINESS_ASSESSMENT_GENERATION_COMPLETED`

### Real-time Flow

1. User sends message → API call
2. Server broadcasts via socket
3. `MESSAGE_SENT` event → Updates chat store
4. Zustand triggers re-render → Immediate UI update

## Key Features

### A. Role-Based Home Screens (6 Variants)

- **AdminHome**: User statistics, growth charts
- **CareManagerHome**: Care provider overview
- **CareProviderHome**: Shift schedule, tasks, time tracking
- **FamilyHome**: Client health overview, medications
- **MedicalProfessionalHome**: Appointment schedule
- **DefaultHome**: Basic dashboard

### B. Client Management

**35+ screens** (`app/(dashboard)/client/[id]/`):

- Resident Profile (demographics, contacts)
- Care Plan (goals, interventions)
- Health Observations (vitals, symptoms)
- Medications (prescriptions, schedules)
- **Lockare** (secure documents - 5 categories):
  - Medical Documents
  - Legal Documents
  - Insurance/Financial
  - Identification
  - Other Documents
- Meals (meal plans, dietary restrictions)
- Engagement Activities
- Daily Tasks

**Document Management Features**:

- Camera integration for scanning
- Photo library selection
- Blurhash previews
- PDF viewing with expo-web-browser
- S3 upload with presigned URLs
- Role-based access control

### C. Shift Management & Time Tracking

**Features**:

- Calendar view of scheduled shifts
- Shift types: Day, Evening, Night, Overnight (color-coded)
- Status tracking: Pending, Confirmed, Declined, Completed
- **Clock-in/Clock-out** with GPS verification
- Shift completion workflow (reflection form, task summary)
- Time clock window enforcement (15 min before/after)
- GPS location validation
- Timesheet generation

### D. Care Provider Tasks

**Dynamic Task System**:

- Medication administration with photo verification
- Meal preparation documentation
- Personal care tasks
- Health observations
- Activity engagement
- Documentation notes

**Workflow**:

1. Task assigned by care manager
2. Notification received
3. Complete with documentation (photos, notes, forms)
4. Submit for approval
5. Care manager reviews

**Features**:

- Photo capture
- Document upload
- Dynamic forms by task type
- Progress indicators
- Time-based task lists (Morning, Afternoon, Evening)

### E. Messaging & Communication

**Chat Features**:

- Group conversations with multiple participants
- Private messaging
- File attachments (images, videos, documents, audio)
- Message reactions with emoji picker
- Read receipts and delivery status
- Message search
- Media gallery view
- Typing indicators
- Online presence indicators
- Message deletion

**UI/UX**:

- Inverted FlatList (newest at bottom)
- Date dividers
- Blurhash placeholders
- Quick reaction bar
- Long-press menu (react, delete, copy)
- Swipe actions

### F. Lockare - Secure Document Management

**5 Main Categories**:

1. Medical Documents
2. Legal Documents
3. Insurance & Financial
4. Identification
5. Other Documents

**Features**:

- Folder-based organization
- Camera integration for scanning
- Document preview with PDF support
- Download & share
- Delete confirmation with bottom sheets
- Blurhash loading
- File type validation
- Role-based access
- Audit logging

### G. Health Observations

**Observation Types**:

- Blood Pressure, Heart Rate, Temperature
- Blood Sugar, Oxygen Saturation
- Weight, Pain Level, Mood/Behavior

**Features**:

- Quick entry forms with validation
- Historical trends with charts
- Alerts for abnormal values
- Photo attachments (wounds, rashes)
- Timeline view

### H. Social Feed

**Features**:

- Text, image, and video posts
- Like and comment
- Nested comments (replies)
- Post reactions (emoji)
- User mentions (@username)
- Post deletion (own posts)
- Skeleton loading
- Infinite scroll

### I. Medications Management

**Family Role**:

- Medication list for linked client
- Dosage and schedule information
- Administration logs
- Refill reminders
- Prescription documents

**Care Provider Role**:

- Administer medication with photo verification
- Mark as given with timestamp
- Missed dose tracking
- PRN medications with reason
- Refusal documentation

### J. Appointments

**Features**:

- Upcoming appointments calendar
- Appointment details (doctor, location, time)
- Reminders before appointment
- Add to device calendar
- Appointment notes post-visit
- Telehealth integration

### K. Trainings & Assessments

**Care Provider Trainings**:

- Training modules with video/document content
- Quizzes for verification
- Completion tracking
- Certificates upon completion
- Mandatory trainings flagged

**Care Readiness Assessments**:

- Simplified Routine Task Inventory
- Routine Task Inventory
- Allen Cognitive Level
- Home Safety
- Multi-step questionnaires
- Progress tracking with save/resume
- AI-powered report generation
- Real-time progress via WebSocket
- PDF report export

### L. Invitations System

**Features**:

- Pending invitations list
- Invitation details (client, role, sender)
- Accept/Decline with bottom sheet confirmations
- Email status tracking
- Invitation expiration
- Resend capability

## Component Patterns

### 1. Bottom Sheet Pattern (Primary UI Pattern)

**Usage**: ALWAYS use bottom sheets for action confirmations (NOT Alert dialogs)

```typescript
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

<BottomSheet
  ref={bottomSheetRef}
  snapPoints={["30%"]}
  enablePanDownToClose
  backgroundStyle={{ backgroundColor: colors.surface }}
  backdropComponent={renderBackdrop}
>
  <BottomSheetView style={{ paddingBottom: insets.bottom }}>
    {/* Content */}
  </BottomSheetView>
</BottomSheet>;
```

**Critical**: Always add `paddingBottom: insets.bottom`

### 2. Skeleton Loading Pattern

**Reusable Components**:

- PostSkeleton, CommentSkeleton, ShiftAssignmentSkeleton
- CareProviderTasksSkeleton, ObservationSkeleton
- Animated shimmer effect with Reanimated

### 3. Markdown Rendering

**ALWAYS use StyledMarkdown**:

```typescript
import { StyledMarkdown } from "@/components/ui/styled-markdown";
<StyledMarkdown>{content}</StyledMarkdown>;
```

### 4. Form Fields

- DatePickerField, SelectField, MultiSelectField
- SkillsField, TextAreaField, FilePickerField
- All integrate with react-hook-form + Zod

## File Structure

```
anaya-mobile/
├── app/                          # Expo Router screens (72)
├── components/                   # Reusable components (122)
│   ├── ui/                      # Generic UI components
│   ├── auth/                    # Auth forms
│   ├── chat/                    # Chat UI
│   ├── home/                    # Role-based homes
│   ├── lockare/                 # Document management
│   ├── skeleton/                # Loading states
│   ├── care-provider-tasks/     # Task management
│   └── [feature components]/
├── store/                        # Zustand stores (3)
├── contexts/                     # React contexts (5)
├── lib/                          # Utilities (33)
├── types/                        # TypeScript types (19)
├── hooks/                        # Custom hooks (11)
├── constants/                    # Colors, Fonts, Options
├── services/                     # Notification service
├── assets/                       # Images
├── data/                         # Static data
├── app.json                      # Expo configuration
├── tamagui.config.ts            # Tamagui setup
└── CLAUDE.md                     # Development guide (593 lines)
```

## Configuration

### App Configuration

- **Name**: Anaya Care
- **Bundle ID**: `com.anayacare.app`
- **Version**: 1.1.0
- **New Architecture**: Enabled
- **Typed Routes**: Enabled (Expo Router experiment)

### Platform-Specific

**iOS**:

- Supports tablet
- Background modes: remote notifications
- Google Maps API configured
- WiFi info access entitlement

**Android**:

- Min SDK: 24, Target SDK: 35
- Google Maps API key
- Permissions: boot completed, vibrate, wake lock
- Software keyboard mode: pan

### Development

```typescript
// lib/axios.ts
const USE_LOCAL_API = __DEV__;
const BASE_URL = USE_LOCAL_API
  ? `http://localhost:3001`
  : "https://api.anaya.care";
```

## Development Guidelines (Mandatory)

1. **ALWAYS use React Query** for data fetching
2. **ALWAYS use axios instance** from `@/lib/axios`
3. **ALWAYS use dayjs** for date/time
4. **ALWAYS use toast functions** from `@/lib/toast`
5. **ALWAYS use icons** from `lucide-react-native`
6. **ALWAYS use bottom sheets** for actions (not Alert dialogs)
7. **ALWAYS add paddingBottom: insets.bottom** to bottom sheets
8. **ALWAYS use StyledMarkdown** for markdown
9. **NEVER use shadows** - use borders instead
10. **ALWAYS use theme colors** - never hardcoded values
11. **ALWAYS use dash-separated filenames**

## Testing

- **Jest** with Expo preset
- Test command: `npm test`
- Limited coverage currently
- Timezone utility tests implemented

---

# 3. Web Application (anaya/) - Next.js 14

## Overview

A comprehensive web-based care management platform built with Next.js 14, serving as the primary administrative and management interface for the Anaya Care ecosystem. Features sophisticated care workflows, real-time communication, and role-based access across 94+ dashboard pages.

### Quick Stats

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict typing
- **Pages**: 94+ dashboard pages
- **Components**: 174 React components (60+ shadcn/ui)
- **Authentication**: NextAuth.js v5
- **State Management**: React Query + Zustand
- **Real-time**: Dual Socket.IO connections

## Technology Stack

### Core Technologies

| Category  | Technology            | Purpose                         |
| --------- | --------------------- | ------------------------------- |
| Framework | Next.js 14            | React framework with App Router |
| Language  | TypeScript 5.2        | Type safety                     |
| Auth      | NextAuth.js 5.0-beta  | Authentication                  |
| UI        | shadcn/ui + Radix UI  | Component library               |
| Styling   | Tailwind CSS          | Utility-first CSS               |
| State     | React Query + Zustand | Server & client state           |
| Forms     | React Hook Form + Zod | Form management                 |
| Real-time | Socket.IO             | WebSocket connections           |

### UI & Styling

- **shadcn/ui**: 60+ custom components built on Radix UI
- **Radix UI**: 20+ primitive components (Dialog, Dropdown, Popover)
- **Tailwind CSS**: Custom theme with HSL colors
- **Framer Motion**: Smooth animations
- **Lucide React**: Icon library (v0.432.0)
- **Recharts**: Data visualizations

### Rich Text & Documents

- **BlockNote**: Modern block-based editor
- **Tiptap**: Rich text editor with extensions
- **@react-pdf/renderer**: Server-side PDF generation
- **React PDF**: PDF rendering

### Utilities

- **date-fns**: Date manipulation
- **Luxon**: Advanced timezone handling
- **Lodash**: Utility functions
- **clsx / cn**: Conditional className utilities

## Architecture

### App Router Structure (Next.js 14)

```
app/
├── (app)/                          # Application wrapper
│   ├── layout.tsx                  # Root layout with ClientLayout
│   ├── (admin)/                    # Protected admin routes
│   │   ├── dashboard/              # Main dashboard (94 pages)
│   │   │   ├── clients/            # Client management (35+ pages)
│   │   │   │   ├── [id]/edit/      # Edit sections
│   │   │   │   │   ├── personal-details
│   │   │   │   │   ├── main-contacts
│   │   │   │   │   ├── medical-record
│   │   │   │   │   ├── medications
│   │   │   │   │   ├── assessments/
│   │   │   │   │   ├── care-plan/
│   │   │   │   │   ├── schedules/
│   │   │   │   │   ├── shifts/
│   │   │   │   │   ├── caregivers/
│   │   │   │   │   ├── meals/
│   │   │   │   │   ├── health-metrics/
│   │   │   │   │   ├── lock-care/
│   │   │   │   │   └── [25+ more sections]
│   │   │   ├── care-proposals/     # Care proposal workflow
│   │   │   ├── chat/               # Messaging
│   │   │   ├── calendar/           # Scheduling
│   │   │   ├── users/              # User management
│   │   │   ├── statistics/         # Analytics
│   │   │   ├── time-clock/         # Time tracking
│   │   │   ├── assessments/        # Assessment management
│   │   │   ├── trainings/          # Training modules
│   │   │   └── [60+ more pages]
│   │   ├── onboarding/             # User onboarding
│   │   └── care-provider/          # Care provider views
│   ├── (auth)/                     # Authentication
│   │   └── signin/                 # Multi-method sign-in
│   ├── (public)/                   # Marketing pages
│   │   ├── page.tsx                # Landing page
│   │   ├── about-us, features, pricing, privacy
│   └── (view)/                     # External viewing routes
├── (print)/                        # Print-optimized layouts
└── api/                            # API routes
    ├── auth/[...nextauth]/         # NextAuth handlers
    ├── pdf/                        # PDF generation
    └── debug/                      # Debug utilities
```

### Route Groups

- **Parentheses** for logical grouping without affecting URLs
- **Dynamic Routes**: `[id]` patterns for resource-specific pages
- **Nested Layouts**: Hierarchical layout system

## Authentication

### NextAuth.js v5 Implementation

#### Authentication Methods

1. **Password Sign-In** - Username/password
2. **Phone Sign-In** - OTP via Twilio
3. **Magic Link** - Email verification tokens

#### Authentication Flow

```
1. User selects authentication method
2. Backend validates credentials at /auth/{method}
3. Backend returns JWT access token
4. Token stored in httpOnly cookie (access_token)
5. NextAuth creates session with user data + tokens
```

#### Middleware Protection (`middleware.ts`)

- Token validation on every protected route
- Onboarding check (redirects incomplete profiles)
- Role-based access enforcement
- Callback URL preservation

#### Session Structure

```typescript
{
  user: UserResponseType,
  tokens: {
    accessToken: string,
    expiresIn: number,
    maxAge: number
  }
}
```

## State Management

### Server State (React Query)

```typescript
// Configuration
QueryClient({
  defaultOptions: {
    queries: { staleTime: 5000 },
  },
});

// Usage
useQuery({
  queryKey: ["clients", searchParams],
  queryFn: async () => await apiClient.get("/clients"),
});
```

**Features**:

- Hierarchical query keys
- 5-second stale time
- Automatic cache invalidation on mutations
- Optimistic updates

### Client State (Zustand)

#### Chat Store (`store/chat-store.ts`)

```typescript
interface ChatStore {
  messages: Message[];
  conversations: Conversation[];
  groups: Group[];
  isLoading: boolean;
  addMessage;
  setMessages;
  setConversations;
  updateConversation;
}
```

### Context Providers

- **SocketContext**: WebSocket connections and online users
- **FileViewerContext**: Global file preview state
- **UserProfileSheetContext**: User profile drawer
- **SessionProvider**: NextAuth session

## API Integration

### Backend Connection (`lib/api.ts`)

```typescript
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL // http://localhost:3001
})

// Request Interceptor
- Auto-adds Bearer token from NextAuth session
- Error handling with status codes

// Response Interceptor
- Standardized error messages
- Automatic retry on 401
```

### RESTful Patterns

```typescript
GET    /clients              // List with pagination
GET    /clients/:id          // Single resource
POST   /clients              // Create
PATCH  /clients/:id          // Update
DELETE /clients/:id          // Delete

// Nested resources
GET    /clients/:id/schedules
POST   /clients/:id/care-plans
```

## Real-time Features

### Dual WebSocket Architecture

```typescript
// Chat Socket
const chatSocket = io(`${BACKEND_URL}/chat`, {
  auth: { token: accessToken },
});

// Notification Socket
const notificationSocket = io(`${BACKEND_URL}/notification`, {
  auth: { token: accessToken },
});
```

### Socket Events

```typescript
// Chat Events
JOIN_CONVERSATION, LEAVE_CONVERSATION;
SEND_MESSAGE, RECEIVE_MESSAGE;
GET_MESSAGES, MESSAGES_RECEIVED;
UPDATE_USERS_LIST;

// Notification Events
NOTIFICATION_SENT;
```

### Real-time Features

1. **Online Presence**: Real-time user tracking
2. **Message Delivery**: Instant synchronization
3. **Push Notifications**: Desktop alerts with sound
4. **Read Receipts**: Message delivery status
5. **Cross-Platform Sync**: Web ↔ Mobile synchronization

## UI Components

### shadcn/ui Integration

- **60+ Custom Components** in `/components/ui/`
- **Component Registry**: Managed via `components.json`
- **Base Components**: Button, Input, Card, Dialog, Dropdown

### Component Categories

#### Layout

- `AdminSidebar` - Responsive navigation with role-based menu
- `UserDropdown` - Profile and settings
- `NotificationDropdown` - Real-time notifications
- `Breadcrumbs` - Navigation context

#### Data Display

- `ClientsTable` - Paginated, sortable, filterable
- `DataTable` (Tanstack Table) - Complex data grids
- `Calendar` - Scheduling with RRule support
- `Charts` (Recharts) - Analytics visualizations

#### Forms

- Form components with React Hook Form
- `DatePicker` with range selection
- `Select`, `Checkbox`, `Radio` with Radix UI
- `AutoComplete` with debouncing

#### Feedback

- `Toast` (Sonner) - Notification system
- `Alert` - Contextual messages
- `Skeleton` - Loading states
- `Progress` - Task completion

#### Specialized

- `FileViewer` - Multi-format file preview
- `UserHoverCard` - Quick user info
- `CareProposal` - Proposal workflow UI
- `BlockNote` - Rich document editor

### Tailwind Configuration

```javascript
colors: {
  ayana: { secondary, tertiary, green, darkGrey },
  gcsTheme: { violet, green, pink, beige, yellow, blue },
  primary, secondary, tertiary, success, destructive
}
fonts: {
  sans: Inter,
  poppins: Poppins,
  dmSans: DM Sans
}
```

## Key Features

### 1. Client Management (35+ pages)

**Route**: `/dashboard/clients`

**Core Sections**:

- **Client List**: Paginated table with filters
- **Personal Details**: Demographics, contacts
- **Medical Records**: Medications, allergies, equipment
- **Assessments**: RTI, ACL, Home Safety, Individualized
- **Care Plans**: AI-generated recommendations
- **Schedules**: Shift planning with RRule
- **Caregivers**: Assignment management
- **Health Metrics**: Vital signs tracking
- **Lock Care**: Secure document storage

**Edit Sections** (`/clients/[id]/edit/`):

```
personal-details, main-contacts, medical-record, medications,
medical-professionals, doctors-appointments,
assessments/ (rti, acl, home-safety, initial, individualized),
care-plan/, care-readiness-assessment/, schedules/, shifts/,
caregivers/, meals/, engagement-activities/, health-metrics/,
lock-care/, task-submissions/, change-of-conditions/
```

### 2. Care Proposal System

**Route**: `/dashboard/care-proposals`

**Workflow Stages**:

1. **Draft** → Initial creation
2. **Pending Review** → Care Manager submission
3. **Revisions Required** → Admin feedback
4. **Approved** → Ready for client
5. **Accepted** → Client agreement
6. **Service Started** → Active care

**Components**:

- Client Information (demographics, guardian, address)
- Assessment (Simplified RTI)
- Care Plan (AI-generated across 9 domains):
  1. Memory Care
  2. Physical Health & Safety
  3. Nutritional Needs
  4. Personal Care Assistance
  5. Cognitive & Mental Health
  6. Emotional Support & Companionship
  7. Mobility & Physical Activity
  8. Social Engagement
  9. End of Life Planning
- Service Schedule (weekly hour allocation)
- Rate Computation (automated pricing)
- PDF Generation
- Digital Signatures
- Email Tracking

### 3. Chat & Messaging

**Route**: `/dashboard/chat`

**Features**:

- Group conversations (multi-participant)
- Private messages
- File attachments (images, documents, videos)
- Message reactions (emoji)
- Read receipts
- Online indicators (real-time presence)
- Message history (persistent)
- Search functionality

**Technical Implementation**:

- WebSocket connection on mount
- Real-time message updates
- Conversation synchronization
- Zustand state management

### 4. Calendar & Scheduling

**Route**: `/dashboard/calendar`

**Capabilities**:

- Multi-client view (all schedules in one calendar)
- RRule support (recurring shift patterns)
- Timezone handling (Luxon-based)
- Multi-day shifts (spanning midnight)
- Client filtering (show/hide)
- Color coding (visual differentiation)
- Shift details (times, notes, assignments)

**Schedule Types**:

- One-time shifts
- Recurring patterns (daily, weekly, custom)
- Excluded dates (exceptions)
- Multi-day spans (overnight, extended)

### 5. User Management

**Route**: `/dashboard/users`

**User Roles** (Hierarchical):

1. Super Admin - Full system access
2. Admin - Administrative functions
3. Care Manager - Care planning
4. Care Provider - Shift execution
5. Family - Client information access
6. Medical Professional - Medical records

**Features**:

- Invite system with email tracking
- Role management (change roles)
- User profiles (comprehensive info)
- Activity logs (login history)
- Status management (active/inactive)
- Bulk operations (multi-user actions)

**Role-Based Views**:

```typescript
hasAdminPrivileges(role); // Super Admin, Admin
hasManagementAccess(role); // + Care Manager
hasCareProviderAccess(role); // + Care Provider
```

### 6. Statistics & Analytics

**Route**: `/dashboard/statistics`

**Metrics**:

- User growth charts
- Role distribution breakdown
- Client statistics (active, pending)
- Care provider performance (ratings, completion)
- System usage (login frequency, engagement)

### 7. Time Clock

**Route**: `/dashboard/time-clock`

**Features**:

- Clock in/out functionality
- GPS location tracking
- Shift verification
- Timesheet generation
- Payroll integration support

### 8. Training Management

**Route**: `/dashboard/trainings`

**Capabilities**:

- Training module creation
- Role-based assignments
- Progress tracking
- Completion certificates
- Mandatory training enforcement

### Additional Features

- **Settings**: User preferences, timezone, date/time formats
- **Skills Management**: Care provider skill tracking
- **Base Rates**: Pricing configuration
- **AI Prompts**: Customizable AI templates
- **Meals Planning**: Dietary requirements
- **Assessments**: RTI, ACL, Home Safety

## File Structure

```
anaya/
├── app/                    # Next.js 14 App Router
│   ├── (app)/
│   │   ├── (admin)/dashboard/  # 94 pages
│   │   ├── (auth)/
│   │   ├── (public)/
│   │   └── (view)/
│   ├── (print)/
│   └── api/
├── components/            # 174 components
│   ├── ui/               # 60+ shadcn/ui
│   ├── layout/           # Navigation
│   ├── care-proposal/    # Proposals
│   ├── clients/          # Client mgmt
│   └── [feature]/        # Feature-specific
├── lib/                  # Utilities
│   ├── api/             # API utils
│   ├── api.ts           # Axios client
│   ├── roles.ts         # RBAC
│   └── utils.ts         # Common utils
├── types/               # 51 TypeScript types
├── hooks/               # Custom hooks
├── store/               # Zustand stores
├── contexts/            # React contexts
├── auth.ts              # NextAuth config
├── middleware.ts        # Route protection
└── [config files]
```

## Configuration

### Environment Variables

```bash
# Authentication
NEXTAUTH_SECRET=                    # Production secret
NEXTAUTH_URL=http://localhost:3000

# Backend API
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Database
MONGODB_URI=                        # MongoDB connection

# OAuth
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# External Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

### Next.js Configuration

```javascript
{
  reactStrictMode: true,
  transpilePackages: ['lucide-react', 'shiki'],
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer']
  },
  images: {
    remotePatterns: [
      'lh3.googleusercontent.com',      // Google profiles
      'gcs-anaya.s3.amazonaws.com',     // S3 CDN
      'res.cloudinary.com'              // Cloudinary
    ]
  }
}
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] } // Absolute imports
  }
}
```

## Testing

- **No formal test suite** currently implemented
- **Manual testing** during development
- **Recommended**: Jest + React Testing Library, Playwright/Cypress for E2E

---

# Cross-Platform Integration

## Shared Architecture Patterns

### 1. Dual WebSocket Architecture (All Platforms)

```
Backend: NestJS Socket.IO Server
├── /chat namespace
│   ├── Connected to: Web, Mobile
│   ├── Events: Messages, Reactions, Read Receipts, Typing
│   └── Room-based broadcasting
└── /notification namespace
    ├── Connected to: Web, Mobile
    ├── Events: Notifications, Online Presence, Progress Updates
    └── User-specific rooms
```

### 2. Authentication Flow (Unified)

```
1. User signs in (Web or Mobile)
2. Backend validates credentials → Returns JWT
3. Frontend stores token:
   - Web: httpOnly cookie + NextAuth session
   - Mobile: SecureStore (encrypted)
4. Token auto-injected in all API requests:
   - Web: Axios interceptor reads from session
   - Mobile: Axios interceptor reads from SecureStore
5. WebSocket connections authenticate with same JWT
```

### 3. Real-time Synchronization

```
Scenario: Care provider sends message from mobile

Mobile App                Backend                 Web App
---------                 -------                 -------
1. User types message
2. POST /messages ────────>
3.                        Store in MongoDB
4.                        Emit MESSAGE_SENT ────> 5. Receive event
6. Receive event          to all sockets         6. Update chat UI
7. Update chat UI                                7. Play notification sound
```

### 4. Role-Based Access Control (Consistent)

```typescript
// Hierarchical roles (same across all platforms)
SuperAdmin → Admin → CareManager → CareProvider / MedicalProfessional / Family

// Backend enforcement
@Roles(UserRole.Admin, UserRole.CareManager)
@UseGuards(AuthGuard, RolesGuard)

// Web enforcement
if (!hasAdminPrivileges(session.user.role)) redirect('/unauthorized');

// Mobile enforcement
if (!hasAdminPrivileges(user.role)) return null; // Hide UI
```

## API Contract

### Standardized Response Format

```typescript
// Success response
{
  data: T,
  message?: string,
  statusCode: 200
}

// Error response
{
  error: true,
  message: string,
  statusCode: 400 | 401 | 403 | 404 | 500
}
```

### Common Endpoints (Used by Web & Mobile)

```
Authentication:
POST   /auth/login                      # Password login
POST   /auth/login/phone                # Phone OTP
POST   /auth/magic-link                 # Email magic link
POST   /auth/verify                     # Verify magic link
GET    /users/me                        # Current user

Clients:
GET    /clients                         # List (with filters)
GET    /clients/:id                     # Single client
POST   /clients                         # Create
PATCH  /clients/:id                     # Update
GET    /clients/:id/schedules           # Client schedules
GET    /clients/:id/care-provider-tasks # Tasks
GET    /clients/:id/health-metrics      # Vitals

Shifts:
GET    /shifts                          # List shifts
POST   /shifts/:id/clock-in             # Clock in (mobile primarily)
POST   /shifts/:id/clock-out            # Clock out
POST   /shifts/:id/reflection           # Post-shift reflection

Chat:
GET    /conversations                   # List conversations
GET    /conversations/:id/messages      # Get messages
POST   /messages                        # Send message (also via WebSocket)

Notifications:
GET    /notification                    # Get notifications
PATCH  /notification/:id/read           # Mark as read

Files:
POST   /files/generate-presigned-url    # Get S3 upload URL
GET    /files/:id                       # File metadata
```

## Data Synchronization Strategies

### 1. Optimistic Updates (Mobile & Web)

```typescript
// Example: React Query mutation with optimistic update
const mutation = useMutation({
  mutationFn: (data) => api.post("/messages", data),
  onMutate: async (newMessage) => {
    // Cancel outgoing queries
    await queryClient.cancelQueries({ queryKey: ["messages", conversationId] });

    // Snapshot previous value
    const previousMessages = queryClient.getQueryData([
      "messages",
      conversationId,
    ]);

    // Optimistically update
    queryClient.setQueryData(["messages", conversationId], (old) => [
      ...old,
      newMessage,
    ]);

    return { previousMessages };
  },
  onError: (err, newMessage, context) => {
    // Rollback on error
    queryClient.setQueryData(
      ["messages", conversationId],
      context.previousMessages
    );
  },
  onSettled: () => {
    // Refetch regardless of success/error
    queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
  },
});
```

### 2. Cache Invalidation (Consistent)

```typescript
// Web & Mobile use same query keys
['clients']                          # All clients
['clients', clientId]                # Single client
['clients', clientId, 'schedules']   # Client schedules
['conversations']                    # All conversations
['conversations', conversationId, 'messages']  # Messages
```

### 3. Real-time Event Handling (Parallel)

```typescript
// Both platforms listen to same events
socket.on("MESSAGE_SENT", (message) => {
  // Web: Update Zustand chat store
  chatStore.addMessage(message);

  // Mobile: Update Zustand chat store (same interface)
  chatStore.addMessage(message);

  // Both: Invalidate React Query cache
  queryClient.invalidateQueries({ queryKey: ["conversations"] });
});
```

## Technology Comparison Matrix

| Feature                | Backend            | Mobile                   | Web                         |
| ---------------------- | ------------------ | ------------------------ | --------------------------- |
| **Language**           | TypeScript         | TypeScript               | TypeScript                  |
| **Framework**          | NestJS             | React Native + Expo      | Next.js 14                  |
| **Routing**            | Controllers        | Expo Router (file-based) | App Router (file-based)     |
| **State Management**   | N/A                | Zustand (3 stores)       | Zustand (1 store)           |
| **Server State**       | N/A                | React Query              | React Query                 |
| **Forms**              | class-validator    | React Hook Form + Zod    | React Hook Form + Zod       |
| **Database**           | MongoDB + Mongoose | N/A (API consumer)       | N/A (API consumer)          |
| **Auth**               | Passport + JWT     | Expo SecureStore         | NextAuth.js v5              |
| **Real-time**          | Socket.IO Server   | Socket.IO Client         | Socket.IO Client            |
| **UI Library**         | N/A                | Tamagui                  | shadcn/ui (Radix)           |
| **Styling**            | N/A                | StyleSheet + Tamagui     | Tailwind CSS                |
| **Date/Time**          | dayjs, luxon       | dayjs                    | date-fns, luxon             |
| **HTTP Client**        | axios              | axios                    | axios                       |
| **File Storage**       | AWS S3 SDK         | API + presigned URLs     | API + presigned URLs        |
| **Push Notifications** | Expo SDK           | expo-notifications       | N/A (Web Notifications API) |
| **Testing**            | Jest               | Jest + jest-expo         | Jest (not implemented)      |
| **Build System**       | Node.js            | EAS Build                | Next.js Build               |
| **Deployment**         | Docker / PM2       | App Store / Play Store   | Vercel / Docker             |

## Development Workflow

### Local Development Setup

```bash
# 1. Start MongoDB (local or Docker)
docker run -d -p 27017:27017 mongo

# 2. Start Redis (local or Docker)
docker run -d -p 6379:6379 redis

# 3. Start Backend
cd anaya-backend/
npm install
cp .env.example .env  # Configure environment
npm run start:dev     # Runs on http://localhost:3001

# 4. Start Web App
cd ../anaya/
npm install
cp .env.example .env  # Set NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
npm run dev           # Runs on http://localhost:3000

# 5. Start Mobile App
cd ../anaya-mobile/
npm install
# Update lib/axios.ts → LOCAL_IP to your machine's IP
npm start             # Opens Expo DevTools
```

### Testing Cross-Platform Features

```bash
# Example: Test messaging across platforms

1. Sign in on Web (http://localhost:3000)
2. Sign in on Mobile (Expo Go or dev build) with different user
3. Create a group conversation on Web → Verify appears on Mobile
4. Send message from Mobile → Verify appears on Web in real-time
5. React to message on Web → Verify reaction appears on Mobile
6. Clock in to shift on Mobile → Verify shift status updates on Web calendar
```

---

# Development Best Practices

## Code Style & Conventions

### File Naming

```
✅ Correct:
user-profile.tsx
care-provider-tasks.ts
client-api.ts

❌ Incorrect:
UserProfile.tsx
careProviderTasks.ts
clientAPI.ts
```

### Import Order (All Projects)

```typescript
// 1. React imports
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native"; // Mobile
import { redirect } from "next/navigation"; // Web

// 2. Third-party libraries
import { useQuery } from "@tanstack/react-query";
import { io } from "socket.io-client";

// 3. Local imports (components, hooks, utils)
import { api } from "@/lib/axios";
import { useThemeColors } from "@/hooks/use-theme-colors";

// 4. Type imports
import type { UserResponseType } from "@/types/user";

// 5. Styles (Mobile only)
import { StyleSheet } from "react-native";
```

### Component Structure

```typescript
// Standard component template
interface ComponentProps {
  // Props with JSDoc comments
}

export function Component({ prop }: ComponentProps) {
  // 1. Hooks
  const [state, setState] = useState();
  const { data } = useQuery(...);

  // 2. Computed values
  const derivedValue = useMemo(() => ..., [dep]);

  // 3. Event handlers
  const handleClick = useCallback(() => {
    // Handler logic
  }, [deps]);

  // 4. Effects
  useEffect(() => {
    // Side effects
  }, [deps]);

  // 5. Render helpers
  const renderSection = () => { ... };

  // 6. Return JSX
  return (
    <div>...</div>
  );
}
```

## State Management Guidelines

### When to Use What

```typescript
// React Query: ALL server data fetching
useQuery(["clients"], fetchClients); // ✅ Correct
const [clients, setClients] = useState([]); // ❌ Wrong

// Zustand: Cross-component client state (chat, auth)
const { user, login } = useAuthStore(); // ✅ Correct

// React Context: Dependency injection, theme, providers
const { theme } = useThemeContext(); // ✅ Correct

// useState: Local component state
const [isOpen, setIsOpen] = useState(false); // ✅ Correct
```

### Query Key Patterns

```typescript
// Hierarchical query keys for automatic invalidation
['clients']                              # All clients
['clients', clientId]                    # Single client
['clients', clientId, 'schedules']       # Client schedules
['clients', clientId, 'schedules', scheduleId]  # Single schedule

// Invalidation example
queryClient.invalidateQueries({ queryKey: ['clients', clientId] });
// ^ Also invalidates ['clients', clientId, 'schedules'] automatically
```

## Security Best Practices

### Backend

```typescript
// ✅ Always validate input with DTOs
export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;
}

// ✅ Always use guards for protected routes
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.Admin, UserRole.CareManager)
@Get('clients')
async findAll() { ... }

// ✅ Never expose sensitive data in responses
// Remove password before returning user
delete user.password;

// ✅ Use environment variables for secrets
const JWT_SECRET = process.env.JWT_SECRET;
```

### Web & Mobile

```typescript
// ✅ Never store sensitive data in localStorage
// Web: Use httpOnly cookies
// Mobile: Use SecureStore (encrypted)

// ✅ Always validate user roles on backend
// Frontend role checks are for UX only (hiding UI)
if (hasAdminPrivileges(user.role)) {
  // Show admin UI
}
// Backend MUST also check role in API endpoint

// ✅ Sanitize user input before displaying
import DOMPurify from "dompurify";
<div>{DOMPurify.sanitize(userInput)}</div>;
```

## Performance Optimization

### Backend

```typescript
// ✅ Use indexes on frequently queried fields
@Schema()
export class User {
  @Prop({ index: true })
  email: string;

  @Prop({ index: true })
  role: UserRole;
}

// ✅ Use pagination for large datasets
@Get('clients')
async findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
  return this.clientsService.findAll({ page, limit });
}

// ✅ Use Redis caching for expensive queries
@Cacheable('clients', 300) // 5 minutes
async findAll() { ... }

// ✅ Use background jobs for heavy operations
@InjectQueue('care-plan')
private carePlanQueue: Queue;

await this.carePlanQueue.add('generate', { clientId });
```

### Mobile

```typescript
// ✅ Use FlashList instead of FlatList
import { FlashList } from "@shopify/flash-list";
<FlashList data={items} renderItem={renderItem} estimatedItemSize={100} />;

// ✅ Memoize expensive computations
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.date - b.date);
}, [items]);

// ✅ Use Reanimated for animations (not Animated API)
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

// ✅ Optimize images with blurhash placeholders
<Image source={{ uri }} placeholder={{ blurhash }} />;
```

### Web

```typescript
// ✅ Use Server Components for data fetching (Next.js 14)
// app/dashboard/clients/page.tsx
async function ClientsPage() {
  const clients = await fetchClients(); // Server-side
  return <ClientsList clients={clients} />;
}

// ✅ Use dynamic imports for large components
const HeavyChart = dynamic(() => import("./heavy-chart"), {
  loading: () => <Skeleton />,
  ssr: false,
});

// ✅ Optimize images with next/image
import Image from "next/image";
<Image src="/avatar.jpg" width={100} height={100} alt="Avatar" />;
```

## Error Handling

### Backend

```typescript
// ✅ Use custom exceptions
throw new NotFoundException(`Client with ID ${id} not found`);
throw new BadRequestException("Invalid email format");
throw new UnauthorizedException("Invalid credentials");

// ✅ Global exception filter (already implemented)
// Converts all exceptions to standardized format:
// { error: true, message: string, statusCode: number }
```

### Web & Mobile

```typescript
// ✅ Handle errors in React Query
const { data, error, isLoading } = useQuery({
  queryKey: ["clients"],
  queryFn: fetchClients,
  onError: (error) => {
    toast({ variant: "destructive", title: error.message });
  },
});

// ✅ Try-catch for async operations
try {
  await api.post("/clients", data);
  toast({ title: "Client created successfully" });
} catch (error) {
  // Axios interceptor already shows toast for API errors
  // Only handle non-API errors here
  if (!error.isAxiosError) {
    toast({ variant: "destructive", title: "Unexpected error" });
  }
}
```

## Testing Strategies

### Backend

```bash
# Unit tests for services
npm test -- users.service.spec.ts

# Integration tests for controllers
npm test -- users.controller.spec.ts

# E2E tests for complete flows
npm run test:e2e
```

### Mobile & Web

```bash
# Unit tests for utilities
npm test -- utils.test.ts

# Component tests
npm test -- user-card.test.tsx

# Integration tests for hooks
npm test -- use-auth.test.ts
```

---

# Deployment

## Backend Deployment

### Environment Setup (Production)

```bash
# .env.production
NODE_ENV=production
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/anaya
JWT_SECRET=<strong-secret-64-chars>
REDIS_URL=redis://:<password>@<host>:6379
S3_BUCKET_NAME=anaya-production
FRONTEND_URL=https://anaya.care
# ... all other env vars
```

### Docker Deployment

```dockerfile
# Dockerfile (already exists in anaya-backend/)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/main.js"]
```

```bash
# Build and run
docker build -t anaya-backend .
docker run -p 3001:3001 --env-file .env.production anaya-backend
```

### PM2 Deployment (Alternative)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start dist/main.js --name anaya-backend

# Monitor
pm2 monit

# Logs
pm2 logs anaya-backend
```

## Mobile Deployment

### EAS Build Configuration (already configured)

```json
// eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

### Build & Submit

```bash
# iOS build
eas build --platform ios --profile production

# Android build
eas build --platform android --profile production

# Submit to App Store
eas submit --platform ios

# Submit to Play Store
eas submit --platform android
```

## Web Deployment

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd anaya/
vercel --prod
```

### Environment Variables (Vercel Dashboard)

```bash
NEXTAUTH_SECRET=<production-secret>
NEXTAUTH_URL=https://anaya.care
NEXT_PUBLIC_BACKEND_URL=https://api.anaya.care
MONGODB_URI=<production-mongodb>
AUTH_GOOGLE_ID=<google-oauth-id>
AUTH_GOOGLE_SECRET=<google-oauth-secret>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<maps-api-key>
```

### Docker Deployment (Alternative)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

# Maintenance & Monitoring

## Backend Monitoring

### Bull Board Queue Dashboard

```
Access: http://localhost:3001/admin/queues
- View all queues (notification, shifts, care-plan, email)
- Monitor job status (waiting, active, completed, failed)
- Retry failed jobs
- View job details and logs
```

### Logging

```typescript
// NestJS built-in logger
this.logger.log("Client created", { clientId });
this.logger.error("Failed to send notification", error);
this.logger.warn("Rate limit exceeded", { userId });
```

### Health Checks

```bash
# Endpoint: /health (if implemented)
curl http://localhost:3001/health

# Expected response
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "redis": { "status": "up" },
    "s3": { "status": "up" }
  }
}
```

## Application Monitoring

### Error Tracking (Recommended: Sentry)

```typescript
// Install Sentry
npm install @sentry/node @sentry/nestjs  # Backend
npm install @sentry/nextjs              # Web
npm install @sentry/react-native        # Mobile

// Initialize
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

### Analytics (Recommended: Mixpanel or Amplitude)

```typescript
// Track user events
analytics.track("Client Created", { clientId, role: user.role });
analytics.track("Shift Completed", { shiftId, duration });
analytics.track("Message Sent", { conversationId });
```

---

# Conclusion

The **Anaya Care Platform** is a comprehensive, production-grade care management ecosystem with:

## Technical Achievements

- **Full-Stack TypeScript**: Type safety across 3 applications
- **Real-time Architecture**: Dual WebSocket system for seamless communication
- **AI Integration**: 9 specialized OpenAI services for intelligent care recommendations
- **Mobile-First Design**: Native iOS/Android/Web mobile app with 72 screens
- **Scalable Backend**: 30+ NestJS modules with event-driven architecture
- **Sophisticated Web UI**: 94+ Next.js pages with role-based access
- **Cross-Platform Sync**: Seamless data synchronization between web and mobile

## Scale & Complexity

- **Backend**: 30+ modules, 97+ socket events, 9 AI services
- **Mobile**: 72 screens, 122 components, 6 role-based experiences
- **Web**: 94+ pages, 174 components, 35+ client management sections
- **Shared**: 6 user roles, dual socket architecture, unified authentication

## Key Differentiators

1. **Comprehensive Care Management**: End-to-end workflow from assessment to service delivery
2. **AI-Powered Intelligence**: Automated care planning, meal generation, task recommendations
3. **Real-time Collaboration**: Instant messaging, notifications, and presence tracking
4. **Mobile-Web Parity**: Feature-complete experiences on both platforms
5. **Secure Document Storage**: HIPAA-compliant Lockare system with role-based access
6. **Advanced Scheduling**: RRule-based recurring shifts with GPS-tracked time clock
7. **Health Monitoring**: Comprehensive vital signs and observation tracking

## Production Readiness

- ✅ TypeScript type safety across all applications
- ✅ Authentication with multiple methods (password, phone OTP, magic link)
- ✅ Role-based access control with hierarchical permissions
- ✅ Error handling with global interceptors and exception filters
- ✅ Background job processing with BullMQ
- ✅ Real-time synchronization with Socket.IO
- ✅ Optimistic UI updates for responsive UX
- ✅ Caching strategies with Redis and React Query
- ✅ Secure file storage with AWS S3
- ✅ Push notifications for mobile devices
- ✅ PDF generation for proposals and reports
- ✅ Email delivery with React-based templates

---

**Generated with AI Analysis** - November 6, 2025
**Monorepo Path**: `/Users/mjcarnaje/Documents/codes/anaya-codebase`
