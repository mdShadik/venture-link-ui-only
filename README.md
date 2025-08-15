# VentureLink - Business Acquisition Platform Prototype

A Next.js prototype for a business acquisition platform that connects buyers and sellers. This is a demo application showcasing the UI/UX design and user flows for both buyer and seller experiences.

## What This Is

This is a **frontend prototype** built to demonstrate:
- User interface design for a business acquisition platform
- Onboarding flows for buyers and sellers
- Dashboard experiences for both user types
- Deal management and analytics interfaces

**Note**: This is a demo with mock data - no real backend or database integration.

## Features Implemented

### 🏠 **Landing Page**
- Professional marketing site with hero section
- Feature highlights and testimonials
- Responsive design

### 🔐 **Authentication**
- Login page with demo credentials
- User type selection (buyer/seller)

### 📝 **Onboarding Flows**
- **Buyer Flow**: Investment preferences, budget, industries
- **Seller Flow**: Business information, financials, selling details (6 steps)

### 👤 **User Profiles**
- Personal profile management
- Public profile view
- Investment/business preferences

### 📊 **Dashboards**
- Role-specific navigation and content
- **Buyer Dashboard**: Discover, matches, deals tracking
- **Seller Dashboard**: Listing management, buyer interest, analytics

### 🔍 **Discovery**
- Swipe-based interface for browsing opportunities
- Match system with compatibility scoring

### 💼 **Deal Management**
- Deal pipeline tracking
- Milestone and document management
- Timeline visualization

### 📈 **Analytics** (Seller)
- Performance charts and metrics
- Audience insights
- Geographic and device analytics

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/venturelink.git
cd venturelink

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

- **Buyer**: `buyer@example.com` / `demo123`
- **Seller**: `seller@example.com` / `demo123`

## Project Structure

```
app/
├── (auth)/                 # Authentication pages
├── dashboard/              # Main dashboard
├── discover/               # Business discovery
├── matches/                # Match management
├── deals/                  # Deal tracking
├── my-listing/             # Seller listing management
├── interested-buyers/      # Buyer pipeline
├── analytics/              # Performance analytics
├── profile/                # User profiles
└── settings/               # User settings

components/
├── ui/                     # Reusable UI components
└── onboarding/             # Onboarding flow components
```

## What's NOT Included

- No backend/API integration
- No real database
- No authentication system
- No file uploads
- No real messaging system
- No payment processing

This is purely a frontend prototype with mock data for demonstration purposes.

## Purpose

This prototype demonstrates:
1. **UI/UX Design** - Clean, professional interface
2. **User Flows** - Complete buyer and seller journeys
3. **Component Architecture** - Reusable React components
4. **Responsive Design** - Works on desktop and mobile
5. **Modern Development** - TypeScript, Next.js best practices

Perfect for showcasing frontend development skills and design capabilities for a business acquisition platform concept.

## License

MIT License

***

**A frontend prototype showcasing modern web development practices** 💻
