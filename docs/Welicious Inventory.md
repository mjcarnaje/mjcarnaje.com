# Welicious - Open Source Inventory Management System with Analytics Dashboard for Small Businesses

> An open-source inventory management and point of sale (POS) system with real-time analytics for small businesses, bakeries, and food service operations. Built with Python Flask and React TypeScript, featuring sales tracking, stock management, revenue analytics, and customizable dashboards. Self-hosted and free alternative to paid inventory software.

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.1-000000?logo=flask&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourusername/welicious-inventory/pulls)

[Quick Start](#-quick-start) • [Features](#-features) • [API Docs](#-api-endpoints) • [Deployment](#-deployment)

</div>

---

## 📑 Table of Contents

- [Project Purpose](#-project-purpose--problem-statement)
- [Key Features](#-key-features)
- [Tech Stack](#-technology-stack)
- [Architecture Overview](#-architecture-overview)
- [Quick Start](#-quick-start)
  - [Prerequisites](#-prerequisites-checklist)
  - [Installation](#-installation)
  - [First Steps](#-first-steps)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Advanced Features](#-advanced-features)
  - [Authentication System](#authentication-system)
  - [Customer Management](#customer-management)
  - [Product Variants](#product-variants-system)
  - [Add-Ons System](#add-ons-system)
  - [Expense Tracking](#expense-tracking)
  - [Image Processing](#image-processing)
- [Frontend Architecture](#-frontend-architecture)
- [Security Features](#-security-features)
- [Design System](#-design-system)
- [Development Best Practices](#-development-best-practices)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Documentation](#-documentation)
- [License & Support](#-license--support)

---

## 🎯 Project Purpose & Problem Statement

### The Problem

Small food businesses and restaurants face significant operational challenges:

- **Manual inventory tracking** leads to stockouts, overstocking, and waste
- **Spreadsheet-based sales recording** is time-consuming and error-prone
- **Lack of real-time analytics** prevents data-driven business decisions
- **Disconnected systems** for inventory, sales, customers, and expenses create inefficiency
- **High cost of enterprise solutions** puts professional inventory management out of reach

### The Solution

Welicious Inventory & Analytics System is a **full-stack, production-ready inventory management platform** designed specifically for small food businesses. It combines inventory tracking, point-of-sale functionality, customer management, and financial analytics into a single, cohesive system.

### Target Users

- **Small restaurants and cafés** managing daily food inventory and sales
- **Bakery and pastry shops** tracking products with variants (sizes, flavors) and add-ons
- **Food service businesses** needing customer relationship management and payment tracking
- **Small retail food businesses** requiring expense tracking and profit analysis

### Key Use Cases

1. **Real-Time Inventory Management**
   - Track stock levels across multiple product categories
   - Monitor low-stock items with automated alerts
   - Manage product variants (sizes, flavors) and add-ons
   - Upload and optimize product images for visual catalogs

2. **Point of Sale & Sales Analytics**
   - Record sales transactions with automatic stock updates
   - Support multiple payment methods (cash, GCash, bank transfer, cards)
   - Track customer purchases and payment history
   - Generate sales reports with date range filtering

3. **Customer Relationship Management**
   - Maintain customer profiles with contact information
   - Track purchase history and payment records
   - Set and monitor credit limits for business customers
   - Analyze customer lifetime value

4. **Financial Management**
   - Track fixed expenses (rent, salaries, utilities)
   - Record variable expenses (supplies, maintenance, transportation)
   - Calculate profit margins and net income
   - Analyze revenue trends over time

5. **Business Intelligence**
   - Interactive dashboards with revenue metrics
   - Category-wise sales breakdown
   - Top-selling products analysis
   - Hourly sales patterns for demand forecasting

---

## ✨ Key Features

### 📊 Business Intelligence & Analytics Dashboard

<table>
<tr>
<td width="50%">

**Revenue Intelligence**
- 💰 Average monthly, weekly, daily revenue
- 📈 Revenue trends and forecasting
- 💳 Payment method breakdown
- 📊 Real-time sales metrics

</td>
<td width="50%">

**Visual Insights**
- 📊 Interactive charts (Recharts)
- 🎯 Top-selling products
- 🔔 Low stock alerts
- 📅 Custom date range filtering

</td>
</tr>
</table>

### 📦 Inventory & Stock Management System

- **Product Catalog Management**: Organize inventory by categories with cost and selling price tracking
- **Stock Level Monitoring**: Real-time stock quantity updates with low stock alerts
- **Product Variants**: Manage multiple sizes, flavors, and SKUs per product
- **Image Processing**: Automatic image optimization and compression
- **Inventory Analytics**: Track product performance and identify slow-moving items

### 💰 Point of Sale (POS) & Sales Tracking

- **Sales Transaction Recording**: Fast POS interface for recording sales
- **Automatic Stock Updates**: Inventory automatically decrements on sales
- **Customer Management**: Track customer information and purchase history
- **Payment Method Tracking**: Support for cash, GCash, bank transfer, credit/debit cards
- **Add-Ons System**: Optional extras (candles, gift boxes, cards)
- **Sales History**: Complete transaction history with filtering

### 👥 Customer Relationship Management

- Customer profiles with contact details
- Purchase history and analytics
- Credit limit management
- Outstanding balance tracking
- Customer lifetime value calculations

### 💸 Expense Tracking & Financial Management

- **Fixed Expenses**: Rent, salaries, utilities (recurring)
- **Variable Expenses**: Supplies, maintenance, transportation (one-time)
- **Profit Calculations**: Revenue - COGS - Expenses = Net Profit
- **Expense Categories**: Detailed categorization for accurate reporting

---

## 🛠️ Technology Stack

### System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React 19 + TypeScript]
        B[Tailwind CSS]
        C[TanStack Query]
        D[Recharts]
    end

    subgraph "API Layer"
        E[Flask REST API]
        F[Flask-JWT-Extended]
    end

    subgraph "Data Layer"
        G[SQLAlchemy ORM]
        H[Alembic Migrations]
        I[MySQL 8.0]
    end

    A --> E
    C --> E
    D --> A
    E --> G
    G --> I
    H --> I

    style A fill:#61dafb,stroke:#333
    style E fill:#3776ab,stroke:#333
    style I fill:#4479A1,stroke:#333
```

### Backend Technologies

| Technology | Version | Purpose | Why This Choice? |
|------------|---------|---------|------------------|
| **Python** | 3.13 | Core programming language | Latest release with improved performance, better error messages |
| **Flask** | 3.1 | Web framework | Lightweight, flexible, unopinionated - perfect for RESTful APIs |
| **MySQL** | 8.0 | Production database | Better concurrency than SQLite, connection pooling, production-ready |
| **SQLAlchemy** | 2.0 | ORM | Database-agnostic queries, relationship mapping, type safety |
| **Alembic** | Latest | Database migrations | Autogenerate migrations, version control for schema changes |
| **Flask-JWT-Extended** | 4.6 | Authentication | JWT tokens with refresh support, protected routes |
| **bcrypt** | 4.2 | Password hashing | Adaptive cost factor, salted hashing, GPU-resistant |
| **Pillow** | 12.0 | Image processing | Resize, compress, format conversion for product images |
| **Flask-CORS** | 6.0 | CORS support | Enable cross-origin requests from frontend |
| **Gunicorn** | 23.0 | Production server | Production-grade WSGI server with worker management |

### Frontend Technologies

| Technology | Version | Purpose | Why This Choice? |
|------------|---------|---------|------------------|
| **React** | 19.1 | UI framework | Latest features, concurrent rendering, huge ecosystem |
| **TypeScript** | 5.9 | Type safety | Catch errors at compile time, better IDE support |
| **Vite** | 5.4 | Build tool | Lightning-fast HMR, 10x faster than Webpack |
| **Tailwind CSS** | 3.4 | Styling | Utility-first CSS, rapid development, consistent design |
| **TanStack Query** | 5.90 | Data fetching | Automatic caching, background refetching, optimistic updates |
| **Recharts** | 3.3 | Data visualization | Composable React charts built on D3 |
| **Radix UI** | Latest | Component primitives | Unstyled, accessible components with WAI-ARIA compliance |
| **Framer Motion** | 12.23 | Animations | Declarative animations, spring physics, gesture support |
| **React Router** | 7.9 | Client-side routing | Standard routing solution with nested routes |
| **Axios** | 1.12 | HTTP client | Request/response interceptors, automatic JSON transformation |
| **date-fns** | 4.1 | Date utilities | Modern, tree-shakeable date library |
| **Lucide React** | Latest | Icons | Beautiful, consistent icon library |
| **Sonner** | 2.0 | Toast notifications | Accessible, customizable notifications |

---

## 🏗️ Architecture Overview

### Communication Flow

```mermaid
sequenceDiagram
    participant U as User Browser
    participant R as React Dashboard
    participant F as Flask API
    participant D as MySQL DB

    U->>R: Navigate to dashboard
    R->>F: GET /api/overview?period=last_30_days
    F->>D: Query sales data (SQLAlchemy)
    D-->>F: Return aggregated results
    F-->>R: JSON response
    R->>R: TanStack Query caches data
    R->>U: Render charts with Recharts
```

### Authentication Flow

```
1. User Login
   POST /api/auth/login { username, password }
        ↓
   Verify credentials + bcrypt password check
        ↓
   Generate JWT access token (1 hour expiry)
   Generate JWT refresh token (30 day expiry)
        ↓
   Create UserSession record (track active sessions)
        ↓
   Return tokens + user profile

2. Authenticated Request
   GET /api/products [Authorization: Bearer <access_token>]
        ↓
   @jwt_required() decorator validates token
        ↓
   Extract user_id from JWT claims
        ↓
   Execute business logic
        ↓
   Return protected resource

3. Token Refresh
   POST /api/auth/refresh [Authorization: Bearer <refresh_token>]
        ↓
   Validate refresh token
        ↓
   Generate new access token
        ↓
   Return new access token
```

### Key Design Decisions

#### 1. Blueprint-Based Modular Architecture

The backend uses **Flask Blueprints** to organize routes by domain:

```
src/routes/
├── auth.py          # Authentication endpoints
├── products.py      # Product CRUD operations
├── sales.py         # Sales transactions
├── analytics.py     # Dashboard metrics
├── customers.py     # Customer management
├── categories.py    # Category hierarchy
├── variants.py      # Product variants
├── addons.py        # Add-on items
├── payments.py      # Payment tracking
└── expenses.py      # Expense management
```

#### 2. Migration from SQLite to MySQL

**Rationale:** MySQL provides better concurrency, connection pooling, production readiness, and scalability for growing datasets compared to SQLite.

#### 3. Client-Side State Management with TanStack Query

Instead of Redux/MobX, TanStack Query handles all server state with built-in caching, loading states, and automatic refetching.

---

## 🚀 Quick Start

> ⏱️ **Total setup time:** ~5 minutes | **Difficulty:** Beginner-friendly

### ✅ Prerequisites Checklist

<table>
<tr>
<th>Requirement</th>
<th>Version</th>
<th>Installation Guide</th>
</tr>
<tr>
<td>🐍 Python</td>
<td>3.13+</td>
<td><a href="https://www.python.org/downloads/">Download</a></td>
</tr>
<tr>
<td>📦 Pipenv</td>
<td>Latest</td>
<td><code>pip install pipenv</code></td>
</tr>
<tr>
<td>🟢 Node.js</td>
<td>18+</td>
<td><a href="https://nodejs.org/">Download</a></td>
</tr>
<tr>
<td>🗂️ Git</td>
<td>Any</td>
<td><a href="https://git-scm.com/">Download</a></td>
</tr>
<tr>
<td>🗄️ MySQL</td>
<td>8.0+</td>
<td><a href="https://dev.mysql.com/downloads/">Download</a></td>
</tr>
</table>

💡 **Tip:** Check your versions:
```bash
python --version    # Should be 3.13+
node --version      # Should be 18+
mysql --version     # Should be 8.0+
```

### 📥 Installation

<details open>
<summary><b>Step 1: Clone and Navigate</b> 📂</summary>

```bash
git clone <repository-url>
cd welicious-inventory
```
</details>

<details open>
<summary><b>Step 2: Backend Setup</b> 🐍</summary>

```bash
# Install Python dependencies
pipenv install

# Configure database (create .env file)
echo "DATABASE_URL=mysql+pymysql://root@localhost:3306/welicious_inventory" > .env

# Create database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS welicious_inventory;"

# Run database migrations
pipenv run alembic upgrade head

# Start the API server
pipenv run python src/api.py
```

✅ **Success indicator:** You should see `Running on http://localhost:5000`

⚠️ **Having issues?** See [Backend Troubleshooting](#backend-wont-start)

</details>

<details open>
<summary><b>Step 3: Frontend Setup</b> ⚛️</summary>

```bash
cd dashboard
npm install
npm run dev
```

✅ **Success indicator:** You should see `Local: http://localhost:5173`

⚠️ **Having issues?** See [Frontend Troubleshooting](#frontend-wont-start)

</details>

### 🎯 First Steps

1. **Open the dashboard:** Navigate to `http://localhost:5173`
2. **Login:** Use default credentials or create an account
3. **Add sample data:** See [Adding Sample Data](#-adding-sample-data)
4. **Explore the analytics:** Check out revenue trends and top products
5. **Test the API:** Visit `http://localhost:5000/api/health` to verify backend

### 🏃‍♂️ Running in Development Mode

You'll need **two terminal windows** running simultaneously:

```bash
# Terminal 1: Backend (Flask API)
pipenv run python src/api.py
# → http://localhost:5000

# Terminal 2: Frontend (React Dashboard)
cd dashboard && npm run dev
# → http://localhost:5173
```

💡 **Pro Tip:** Use a terminal multiplexer like `tmux` or tools like `concurrently` to run both in one window.

---

## 📁 Project Structure

```
welicious-inventory/
├── src/
│   ├── api.py                    # Application factory and startup
│   ├── config.py                 # Environment-based configuration
│   ├── database.py               # SQLAlchemy engine and session management
│   ├── models.py                 # All SQLAlchemy models
│   ├── routes/                   # Blueprint modules
│   │   ├── auth.py               # Authentication endpoints
│   │   ├── products.py           # Product CRUD
│   │   ├── sales.py              # Sales transactions
│   │   ├── analytics.py          # Dashboard metrics
│   │   ├── customers.py          # Customer management
│   │   ├── categories.py         # Category hierarchy
│   │   ├── variants.py           # Product variants
│   │   ├── addons.py             # Add-ons management
│   │   ├── payments.py           # Payment tracking
│   │   └── expenses.py           # Expense management
│   └── utils/                    # Shared utilities
│       ├── auth.py               # Password hashing and validation
│       ├── validators.py         # Input validation functions
│       ├── responses.py          # Standardized JSON responses
│       ├── errors.py             # Error handling decorators
│       └── image_processing.py   # Image optimization
├── dashboard/
│   ├── src/
│   │   ├── routes/              # Page-level components
│   │   ├── components/
│   │   │   ├── ui/             # Radix UI + Tailwind primitives
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── layout/         # Layout components
│   │   │   └── common/         # Shared components
│   │   ├── contexts/           # React Context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── queries/keys/       # TanStack Query key factories
│   │   ├── lib/                # Utility functions
│   │   ├── types/              # TypeScript type definitions
│   │   └── api.ts              # Axios instance + API client
│   ├── package.json            # Frontend dependencies
│   └── vite.config.ts          # Vite configuration
├── alembic/
│   ├── versions/               # Database migration files
│   └── env.py                  # Alembic configuration
├── alembic.ini                 # Alembic settings
├── Pipfile                     # Python dependencies
└── requirements.txt            # Python dependencies (frozen)
```

---

## 📊 Database Schema

### Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ USER_SESSIONS : has
    CUSTOMERS ||--o{ SALES : places
    CUSTOMERS ||--o{ PAYMENTS : makes
    CATEGORIES ||--o{ PRODUCTS : contains
    PRODUCTS ||--o{ PRODUCT_VARIANTS : has
    PRODUCTS ||--o{ PRODUCT_ADDONS : supports
    ADDONS ||--o{ PRODUCT_ADDONS : available_for
    SALES ||--|{ SALE_ITEMS : includes
    SALE_ITEMS ||--o{ SALE_ITEM_ADDONS : has
    PRODUCTS ||--o{ SALE_ITEMS : sold_in
    PRODUCT_VARIANTS ||--o{ SALE_ITEMS : variant_of
    SALES ||--o{ PAYMENTS : paid_by

    USERS {
        int id PK
        string username UK
        string email UK
        string password_hash
        boolean is_active
        datetime last_login
    }

    PRODUCTS {
        int id PK
        string name
        int category_id FK
        decimal cost_price
        decimal selling_price
        int stock_quantity
        string unit
        boolean has_variants
        string image_url
    }

    SALES {
        int id PK
        string sale_number UK
        datetime sale_date
        int customer_id FK
        decimal total_amount
        string payment_method
        string payment_status
    }

    SALE_ITEMS {
        int id PK
        int sale_id FK
        int product_id FK
        int variant_id FK
        int quantity
        decimal unit_price
        decimal total_price
    }
```

### Core Tables

**users** - User authentication
- id, username, email, password_hash, is_active, last_login, created_at

**products** - Inventory items
- id, name, category_id, cost_price, selling_price, stock_quantity, unit, has_variants, image_url, description

**product_variants** - Product size/flavor variations
- id, product_id, variant_name, size, flavor, price, cost_price, sku, stock_quantity

**sales** - Sales transactions
- id, sale_number, sale_date, customer_id, total_amount, payment_method, payment_status

**sale_items** - Line items for each sale
- id, sale_id, product_id, variant_id, quantity, unit_price, total_price

**customers** - Customer profiles
- id, name, contact_number, email, address, credit_limit, notes

**addons** - Optional product add-ons
- id, name, price, cost, description

**payments** - Payment records
- id, sale_id, customer_id, amount, payment_method, payment_date

**fixed_expenses** - Recurring monthly expenses
- id, name, amount, category, frequency

**variable_expenses** - One-time expenses
- id, transaction_date, expense_month, category, amount, description

### Managing Migrations

**Run migrations:**
```bash
pipenv run alembic upgrade head
```

**Create a new migration:**
```bash
pipenv run alembic revision --autogenerate -m "description of changes"
```

**Rollback migrations:**
```bash
pipenv run alembic downgrade -1  # Go back one migration
```

> ⚠️ **Important:** Always review autogenerated migrations before applying them to production.

---

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login and get JWT tokens
POST   /api/auth/refresh         # Refresh access token
POST   /api/auth/logout          # Invalidate session
GET    /api/auth/me              # Get current user profile
```

### Analytics

```
GET    /api/overview             # Dashboard statistics with date filtering
GET    /api/revenue-over-time    # Revenue data by time period
GET    /api/top-products         # Best selling products
GET    /api/category-breakdown   # Revenue by category
GET    /api/today-sales          # Real-time today's sales
GET    /api/payment-methods      # Sales by payment method
```

### Products

```
GET    /api/products             # Get all products (paginated)
GET    /api/products/:id         # Get single product
POST   /api/products             # Create product
PUT    /api/products/:id         # Update product
DELETE /api/products/:id         # Delete product
POST   /api/products/:id/image   # Upload product image
```

### Sales

```
GET    /api/sales                # Get all sales (paginated)
GET    /api/sales/:id            # Get single sale with items
POST   /api/sales                # Create new sale
GET    /api/sale-number/generate # Generate unique sale number
```

### Customers

```
GET    /api/customers            # Get all customers
GET    /api/customers/:id        # Get customer with purchase history
POST   /api/customers            # Create customer
PUT    /api/customers/:id        # Update customer
DELETE /api/customers/:id        # Soft delete customer
```

### Categories, Variants, Add-ons, Payments, Expenses

Full endpoint documentation available in the codebase.

### Health Check

```
GET    /api/health               # API health check
```

---

## 🔐 Advanced Features

### Authentication System

**Security Features:**
- JWT-based stateless authentication
- Access tokens (1 hour expiry) + Refresh tokens (30 day expiry)
- bcrypt password hashing with adaptive cost factor
- Account lockout after 5 failed login attempts
- Session tracking for device management
- Password strength validation (8+ chars, uppercase, lowercase, number, special char)

### Customer Management

**Features:**
- Customer profiles with contact details
- Credit limit management
- Purchase history tracking
- Outstanding balance monitoring
- Customer lifetime value calculations

### Product Variants System

Manage multiple size/flavor combinations per product:

```
Product: Birthday Cake
├── Small Chocolate - ₱500 (10 in stock)
├── Medium Chocolate - ₱800 (5 in stock)
├── Large Chocolate - ₱1200 (3 in stock)
└── Small Ube - ₱550 (8 in stock)
```

### Add-Ons System

Optional extras that can be added to products:
- Birthday candles
- Gift boxes
- Greeting cards
- Gift wrapping

### Expense Tracking

**Fixed Expenses:** Rent, salaries, utilities (recurring monthly)
**Variable Expenses:** Supplies, maintenance, transportation (one-time)

**Profit Calculation:**
```
Revenue (from sales)
- Cost of Goods Sold (product cost_price × quantity sold)
- Fixed Expenses
- Variable Expenses
= Net Profit
```

### Image Processing

Automated optimization pipeline:
1. Upload product image (PNG, JPG, JPEG, WebP)
2. Validate file type and size (max 5MB)
3. Resize to 100x100 pixels (LANCZOS resampling)
4. Compress to JPEG (quality=85, optimize=True)
5. Store in uploads/products/ directory

---

## ⚛️ Frontend Architecture

### React 19 + TypeScript

- **Strict TypeScript:** Full type safety with strict mode enabled
- **Functional Components:** All components use hooks (no class components)
- **Custom Hooks:** Reusable logic extracted into hooks (useAuth, useMobile, useStockStatus)

### State Management

**Server State (TanStack Query):**
- Automatic caching with 5-minute stale time
- Background refetching for fresh data
- Optimistic updates for instant UI feedback
- Request deduplication

**Client State (React Context):**
- Authentication state via AuthContext
- UI state (modals, dialogs) uses local component state
- No global state library needed

### Component Architecture

**Radix UI Primitives:**
All interactive components built on accessible Radix UI primitives:
- Dialog, Select, Checkbox, Tabs
- Tooltip, ScrollArea, Separator
- WAI-ARIA compliant, keyboard navigation

**Tailwind CSS + CVA:**
- Utility-first styling
- Component variants with class-variance-authority
- Responsive design with mobile-first approach

### Performance Optimizations

- **Code Splitting:** Route-based automatic splitting with Vite
- **Lazy Loading:** Images load with `loading="lazy"`
- **Query Caching:** 5-minute cache reduces network requests
- **React 19 Features:** Automatic batching, concurrent rendering

---

## 🔒 Security Features

### JWT Authentication

**Token Structure:**
- Access token (1 hour) - API authentication
- Refresh token (30 days) - Get new access tokens
- Stateless validation with signature verification

### bcrypt Password Hashing

```
Password → bcrypt.gensalt() → Hash with salt
Stored: "$2b$12$salt...hash..." (53 characters)
```

**Why bcrypt?**
- Salted (prevents rainbow table attacks)
- Adaptive cost factor (future-proof)
- Slow by design (resistant to brute-force)
- GPU-resistant (memory-hard algorithm)

### Input Validation

**Defense in Depth:**
1. Frontend validation (UX, immediate feedback)
2. Backend validation (security, data integrity)
3. Database constraints (last line of defense)

### CORS Configuration

**Development:** Allow all origins (`*`)
**Production:** Whitelist specific domains

### Additional Security

- SQL injection prevention (SQLAlchemy parameterized queries)
- XSS prevention (React auto-escaping)
- Secure file uploads (extension whitelist, size limits)
- Environment variables for secrets (never commit to git)

---

## 🎨 Design System

### Duolingo-Inspired Visual Language

**Color Palette:**
```typescript
primary: '#58cc02'    // Duolingo Green - Main brand color
secondary: '#1cb0f6'  // Sky Blue - Analytics/info
accent: '#ff9600'     // Orange - Warnings/highlights
danger: '#ff4b4b'     // Red - Errors/destructive
purple: '#a855f7'     // Purple - Special features
```

**Typography:**
- Font: Nunito (rounded, friendly sans-serif)
- Weights: 300-900 (extrabold for headings)

**Elevation & Shadows:**
```css
box-shadow: 0 4px 0 0 rgba(0, 0, 0, 0.1);  /* Duolingo-style bottom shadow */
```

**Border Radius:**
```css
border-radius: 1.5rem;  /* 24px - generous, friendly borders */
```

### Animations

**Framer Motion:**
- Page transitions
- Hover effects (lift cards on hover)
- Stagger animations for lists
- Spring physics for natural motion

**Micro-interactions:**
```tsx
<motion.div whileHover={{ scale: 1.02, y: -4 }}>
  <Card />
</motion.div>
```

---

## 💻 Development Best Practices

### Code Organization

**Backend:**
- Blueprint-based modular routing
- Single models file for relationship management
- Utility modules for reusable functions
- Domain-driven organization

**Frontend:**
- Component co-location by feature
- Custom hooks for reusable logic
- Centralized TypeScript types
- Path aliases for cleaner imports

### Database Migration Workflow

1. Modify models in `src/models.py`
2. Generate migration: `alembic revision --autogenerate -m "description"`
3. Review generated migration
4. Apply migration: `alembic upgrade head`
5. Test rollback: `alembic downgrade -1`

> ⚠️ **Never modify existing migrations** after deployment. Create new migrations to fix issues.

### Error Handling

**Backend:**
- Centralized error handlers
- Standardized JSON responses
- Route-level try/catch blocks
- Proper HTTP status codes

**Frontend:**
- React error boundaries
- TanStack Query error handling
- Toast notifications for user feedback
- Form validation with error messages

---

## 🚢 Deployment

### Platform Comparison

| Platform | Backend | Frontend | Database | Free Tier | Best For |
|----------|---------|----------|----------|-----------|----------|
| **Render.com** | ✅ Flask | ✅ Static | ✅ PostgreSQL | ✅ Yes | Full-stack, beginners |
| **Railway.app** | ✅ Flask | ✅ Static | ✅ MySQL/PostgreSQL | 💳 $5 credit | Professional projects |
| **Vercel** | ⚠️ Serverless | ✅ React | ❌ No | ✅ Yes | Frontend only |
| **PythonAnywhere** | ✅ Flask | ❌ No | ✅ MySQL | ✅ Limited | Backend only |

### 🏆 Recommended Setup

**For simplest deployment:**
```
Frontend: Vercel (Free)
Backend: Render.com (Free)
Database: Render PostgreSQL (Free)
```

**For best performance:**
```
Frontend: Vercel (Free)
Backend: Railway ($5 credit)
Database: Railway MySQL ($5 credit)
```

> 💡 **Migration Tip:** The codebase uses MySQL, but SQLAlchemy makes it easy to switch to PostgreSQL by changing the connection string.

---

## 🐛 Troubleshooting

### Backend won't start

**Symptoms:**
- `Error: No module named 'flask'`
- `Connection refused on port 5000`
- `MySQL connection error`

**Solutions:**

1. **Verify Python environment:**
   ```bash
   pipenv --venv  # Should show virtual env path
   pipenv run python --version  # Should be 3.13+
   ```

2. **Reinstall dependencies:**
   ```bash
   pipenv install
   ```

3. **Check MySQL connection:**
   ```bash
   mysql -u root -p  # Test MySQL access
   ```

   Update `.env` file:
   ```env
   DATABASE_URL=mysql+pymysql://root:password@localhost:3306/welicious_inventory
   ```

4. **Verify migrations:**
   ```bash
   pipenv run alembic current
   pipenv run alembic upgrade head
   ```

### Frontend won't start

**Symptoms:**
- `npm ERR! code ELIFECYCLE`
- `Error: Cannot find module`
- Port 5173 already in use

**Solutions:**

1. **Clear cache and reinstall:**
   ```bash
   cd dashboard
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node version:**
   ```bash
   node --version  # Should be 18+
   ```

3. **Kill process on port 5173:**
   ```bash
   # macOS/Linux
   lsof -ti:5173 | xargs kill -9
   ```

### Database errors

**Solutions:**

1. **Recreate database:**
   ```bash
   mysql -u root -p -e "DROP DATABASE IF EXISTS welicious_inventory; CREATE DATABASE welicious_inventory;"
   pipenv run alembic upgrade head
   ```

### CORS errors

**Solutions:**

1. **Verify ports:**
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:5173`

2. **Restart both servers**

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📚 Documentation

- **[TECH_STACK.md](TECH_STACK.md)** - Detailed technical documentation
- **[STYLING.md](STYLING.md)** - Design system and styling guide
- **[NEXT_STEPS.md](NEXT_STEPS.md)** - Development roadmap and future features

---

## 📝 License & Support

### License

This project is open source and available under the MIT License.

### Support

For questions or issues, please open an issue on GitHub.

---

**Made with 💚 for Welicious**

_A free, self-hosted alternative to expensive inventory management software like QuickBooks, Shopify POS, and Square._
