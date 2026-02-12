# SkillSakhi

A modern, mobile-responsive web application connecting users with skilled women service providers.

## 🚀 Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (Icons)

## 🎨 Design

- **Color Palette**: Orange, White, and Blue
- **Responsive**: Mobile-first design
- **Modern UI**: Clean and professional interface

## 📁 Project Structure

```
app/
├── components/
│   ├── Navbar.tsx      # Navigation bar
│   └── Footer.tsx      # Footer component
├── find-services/
│   └── page.tsx        # Service provider listing page
├── register/
│   └── page.tsx        # Registration form page
├── layout.tsx          # Root layout
├── page.tsx            # Landing page
└── globals.css         # Global styles
```

## 🛠️ Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📄 Pages

1. **Landing Page** (`/`)
   - Hero section
   - How it Works section
   - Features
   - Call-to-action buttons

2. **Find Services** (`/find-services`)
   - List of service providers
   - Search functionality
   - Service provider cards with ratings
   - WhatsApp booking buttons

3. **Register** (`/register`)
   - Registration form for service providers
   - Form validation
   - Success message

## 🎯 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI with gradient effects
- ✅ Service provider cards with ratings
- ✅ Direct WhatsApp integration
- ✅ Registration form with validation
- ✅ Clean navigation

## 📝 Notes

- The app uses dummy data for service providers
- WhatsApp links are functional (opens WhatsApp with pre-filled message)
- Form submission currently logs to console (ready for backend integration)

## 🔧 Customization

- Update service provider data in `app/find-services/page.tsx`
- Modify colors in `app/globals.css`
- Customize components in `app/components/`

---

Made with ❤️ for empowering women through skills
