# NeatSeed - Smart Waste Management System

## Overview
NeatSeed is a smart waste management web application that connects Users (households), Drivers (garbage collectors), and Admins through a unified digital platform. This is the frontend authentication module built with React, providing login and signup functionality for both Users and Drivers.

## Project Status
- **Current State**: Development ready
- **Last Updated**: October 9, 2025
- **Framework**: React + Vite
- **Styling**: Tailwind CSS v4

## Recent Changes
- **October 9, 2025**: Initial Replit setup
  - Configured Vite dev server for Replit environment
  - Fixed port configuration (using port 5000)
  - Configured HMR (Hot Module Reload) for WebSocket support
  - Fixed Login.jsx component syntax errors
  - Added .gitignore for Node.js projects

## Tech Stack
- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.14
- **Routing**: React Router DOM 7.9.3
- **Icons**: Lucide React 0.544.0
- **Language**: JavaScript (ES6+)

## Project Structure
```
project/
├── public/           # Static assets
│   ├── logo.jpg     # NeatSeed logo
│   └── vite.svg     # Vite icon
├── src/
│   ├── assets/      # React assets
│   ├── Components/  # React components
│   │   ├── HomePage.jsx  # Landing page
│   │   ├── Login.jsx     # Login/Signup page (combined)
│   │   └── SignUp.jsx    # Standalone signup page
│   ├── config/
│   │   └── api.js   # API configuration
│   ├── App.jsx      # Main app component with routing
│   ├── main.jsx     # React entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
├── vite.config.js   # Vite configuration
└── package.json     # Dependencies
```

## Features
- ✅ Unified Login & Signup interface
- ✅ Role-based authentication (User/Driver)
- ✅ Responsive design (mobile & desktop)
- ✅ Google OAuth integration UI
- ✅ Form validation
- ✅ Backend API integration ready
- ✅ Modern, eco-themed UI design

## Backend Integration
The app connects to an external backend API:
- **Base URL**: https://neatseed-b.onrender.com
- **Endpoints**: `/admin_login`, `/admin_signup`
- **Configuration**: `src/config/api.js`

## Development
- **Dev Server**: Runs on port 5000
- **Host**: 0.0.0.0 (accessible from Replit webview)
- **HMR**: Enabled with WebSocket support
- **Command**: `cd project && npm run dev`

## Routes
- `/` - Homepage (landing page)
- `/login` - Login/Signup page
- `/signup` - Standalone signup page

## User Preferences
None specified yet.

## Notes
- The project uses an external backend API hosted on Render
- Authentication is handled via the external API
- No database required for this frontend module
- The app is ready for production deployment
