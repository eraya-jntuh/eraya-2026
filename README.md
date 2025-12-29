# 🎉 Eraya 2026 Website

<p align="center">
  <img src="https://img.shields.io/badge/Fest-Eraya%202026-purple?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript">
  <img src="https://img.shields.io/badge/Tests-Passing-success?style=for-the-badge">
</p>

A modern, responsive website for **Eraya 2026**, JNTUH's Cultural and Club Fest. Built with Next.js 16, TypeScript, and Supabase for a seamless user experience.

---

## ✨ Features

### 🎭 Event Management
- **Event Showcase**: Beautiful event cards with detailed information
- **Event Details Modal**: Comprehensive event information including rules, dates, venues, and prize pools
- **Event Registration**: Seamless registration flow with form validation
- **Multiple Events**: Support for multiple events with unique details

### 📝 Registration System
- **Online Registration**: User-friendly registration form with validation
- **Payment Integration**: Secure Razorpay payment processing
- **Server-Side Pricing**: All entry fees calculated server-side from events table
- **Duplicate Prevention**: Automatic detection and prevention of duplicate registrations
- **Data Collection**: Comprehensive participant information (name, email, phone, college, year, branch)
- **Database Integration**: Secure storage in Supabase with Row Level Security (RLS)
- **Payment Status Tracking**: Real-time payment status updates via webhooks

### 📧 Contact System
- **Contact Form**: Quick contact form with validation
- **Team Leads Display**: Contact information for festival coordinators
- **Message Storage**: All contact messages stored securely in database
- **Social Media Links**: Integration with social media platforms

### 👨‍💼 Admin Dashboard
- **Admin Authentication**: Secure admin login with role-based access
- **Registration Management**: View all event registrations with detailed information
- **Contact Messages**: View and manage all contact form submissions
- **Data Export**: CSV export functionality for registrations and messages
- **Statistics Dashboard**: Real-time statistics for registrations and messages
- **Role-Based Access**: Admin-only access with profile-based permissions

### 🎨 User Interface
- **Responsive Design**: Mobile-first, fully responsive layout
- **Modern UI**: Beautiful maroon and gold theme with elegant animations
- **Dark Theme**: Sophisticated dark theme with gold accents
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Floating Register Button**: Quick access to registration from anywhere
- **Navigation**: Smooth scrolling navigation with side panel menu
- **Hero Section**: Eye-catching hero section with countdown timer
- **Golden Particles**: Animated particle effects for visual appeal

### 🔐 Authentication & Security
- **Supabase Auth**: Secure authentication system
- **Row Level Security**: Database-level security with RLS policies
- **Input Validation**: Zod schema validation for all forms
- **Error Handling**: Comprehensive error handling and user feedback
- **Audit Trail**: IP address and user agent tracking for security

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0.10** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Framer Motion 12.23.26** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Real-time capabilities
- **Razorpay** - Payment gateway integration
- **Upstash Redis** - Distributed rate limiting

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Node.js** - Runtime environment

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eraya-2026
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your credentials:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Razorpay (for payments)
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_public_key_id
   
   # Upstash Redis (for rate limiting)
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Admin Setup

1. **Sign up for an admin account**
   - Navigate to `/admin/login`
   - Click "Sign up" and create an account

2. **Promote to admin**
   - Go to Supabase SQL Editor
   - Run: `SELECT promote_to_admin('your-email@example.com');`

3. **Access admin dashboard**
   - Log in at `/admin/login`
   - Access the dashboard at `/admin`

---

## 🧪 Testing

### Test Scripts

The project includes comprehensive test suites:

```bash
# Run all feature tests
npm run test

# Run integration tests
npm run test:integration

# Run all tests
npm run test:all
```

### Test Coverage

**Feature Tests** (7 tests - 100% passing ✅)
- ✅ Environment Variables Check
- ✅ Registration API (Valid)
- ✅ Registration API (Validation)
- ✅ Contact API (Valid)
- ✅ Contact API (Validation)
- ✅ Auth Page Accessibility
- ✅ Home Page Accessibility

**Integration Tests** (5 tests - 100% passing ✅)
- ✅ Registration API (Valid Data)
- ✅ Registration API (Invalid Data - Validation)
- ✅ Contact API (Valid Data)
- ✅ Contact API (Invalid Data - Validation)
- ✅ Duplicate Registration (Conflict)

**Test Results**: All tests passing with 100% success rate! 🎉

---

## 📁 Project Structure

```
eraya-2026/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin dashboard pages
│   ├── api/                # API routes
│   │   ├── admin/          # Admin API endpoints
│   │   ├── contact/        # Contact form API
│   │   ├── payments/       # Payment API endpoints
│   │   └── registrations/  # Registration API
│   ├── auth/               # Authentication pages
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   ├── contact-section.tsx
│   ├── events-section.tsx
│   ├── hero-section.tsx
│   ├── navbar.tsx
│   └── ...
├── lib/                    # Utility libraries
│   └── supabase/          # Supabase client setup
├── public/                 # Static assets
├── test-all-features.js    # Feature test suite
├── test-integration.js     # Integration test suite
└── package.json
```

---

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run feature tests
- `npm run test:integration` - Run integration tests
- `npm run test:all` - Run all tests

---

## 📊 Database Schema

### Event Registrations
- `id` - Unique identifier
- `event_name` - Event name
- `entry_fee` - Entry fee (optional)
- `full_name` - Participant name
- `email` - Email address
- `phone` - Phone number
- `college` - College name
- `year` - Academic year
- `branch` - Branch/Department
- `transaction_id` - Payment transaction ID
- `user_agent` - Browser information
- `ip` - IP address
- `created_at` - Timestamp

### Contact Messages
- `id` - Unique identifier
- `name` - Sender name
- `email` - Email address
- `phone` - Phone number (optional)
- `message` - Message content
- `user_agent` - Browser information
- `ip` - IP address
- `created_at` - Timestamp

### Profiles
- `id` - User ID (linked to auth.users)
- `role` - User role (admin/user)
- `created_at` - Timestamp

---

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Input Validation**: Zod schema validation on all inputs
- **SQL Injection Prevention**: Parameterized queries via Supabase
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection
- **Environment Variables**: Sensitive data stored in `.env.local`

---

## 🎨 Design Features

- **Color Scheme**: Maroon and gold theme
- **Typography**: Custom font families (Display, Serif, Sans)
- **Animations**: Smooth Framer Motion animations
- **Responsive**: Mobile-first responsive design
- **Accessibility**: ARIA labels and keyboard navigation
- **Dark Theme**: Elegant dark theme with gold accents

---

## 📝 API Endpoints

### Public APIs
- `POST /api/registrations` - Submit event registration
- `POST /api/contact` - Submit contact form
- `POST /api/payments/create-order` - Create Razorpay payment order

### Payment APIs
- `POST /api/payments/webhook` - Razorpay webhook handler (verifies payment status)

### Admin APIs (Protected)
- `GET /api/admin/registrations` - Get all registrations
- `GET /api/admin/messages` - Get all contact messages
- `POST /api/admin/logout` - Admin logout

---

## 🐛 Known Issues

None! All tests are passing and the application is fully functional.

---

## 🤝 Contributing

This is the official fork of the Eraya 2026 website. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

---

## 📄 License

This project is maintained for Eraya 2026, JNTU Hyderabad.

---

## 👥 Team

For questions or support, contact the festival coordinators through the contact form on the website.

---

## 🎯 Roadmap

- [x] Event registration system
- [x] Contact form
- [x] Admin dashboard
- [x] Authentication system
- [x] Database integration
- [x] Test suites
- [x] Payment gateway integration (Razorpay)
- [x] Server-side pricing validation
- [x] Webhook-based payment verification
- [x] Distributed rate limiting
- [ ] Email notifications
- [ ] Real-time updates
- [ ] Analytics dashboard

---

**Last Updated**: January 2025  
**Status**: ✅ All systems operational  
**Test Status**: ✅ 100% passing (12/12 tests)
