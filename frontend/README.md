# MoneyCare Frontend

A modern React TypeScript frontend for the MoneyCare financial management application.

## Features

- **Authentication System**
  - Email/Password login and registration
  - OAuth integration (Google, Microsoft, Facebook)
  - Password reset with OTP verification
  - JWT token management with refresh tokens

- **User Interface**
  - Modern, responsive design with Tailwind CSS
  - Beautiful dashboard with financial overview
  - Protected routes and authentication state management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `https://localhost:7222`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Backend Integration

This frontend is designed to work with the MoneyCare backend API. Make sure the backend is running on `https://localhost:7222` before using the frontend.

### API Endpoints

The frontend communicates with the following backend endpoints:

- **Authentication**
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/forgot-password` - Request password reset
  - `POST /api/auth/verify-otp` - Verify OTP for password reset
  - `POST /api/auth/reset-password` - Reset password
  - `POST /api/auth/refresh-token` - Refresh JWT token
  - `POST /api/auth/logout` - User logout
  - `GET /api/auth/profile` - Get user profile

- **OAuth**
  - `GET /api/auth/google` - Google OAuth login
  - `GET /api/auth/microsoft` - Microsoft OAuth login
  - `GET /api/auth/facebook` - Facebook OAuth login

- **User Management**
  - `GET /api/user` - Get all users (admin)
  - `GET /api/user/{id}` - Get user by ID
  - `PUT /api/user/{id}` - Update user
  - `DELETE /api/user/{id}` - Delete user

## Authentication Flow

1. **Email/Password Login**
   - User enters email and password
   - Backend validates credentials and returns JWT token
   - Frontend stores token and user data in localStorage
   - User is redirected to dashboard

2. **Registration**
   - User fills out registration form
   - Backend creates new user account
   - User is automatically logged in and redirected to dashboard

3. **OAuth Login**
   - User clicks OAuth provider button
   - Frontend redirects to backend OAuth endpoint
   - Backend handles OAuth flow and redirects back to frontend
   - Frontend processes the callback and stores authentication data

4. **Password Reset**
   - User requests password reset
   - Backend sends OTP to user's email
   - User enters OTP and new password
   - Password is updated and user can login

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.tsx       # Authentication component
│   ├── Dashboard.tsx   # Main dashboard
│   ├── OAuthCallback.tsx # OAuth callback handler
│   └── ui/             # Reusable UI components
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── services/           # API services
│   └── api.ts         # API service functions
└── App.tsx            # Main application component
```

## Environment Configuration

The frontend is configured to connect to the backend at `https://localhost:7222`. If you need to change this, update the `API_BASE_URL` in `src/services/api.ts`.

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Dependencies

- React 18
- TypeScript
- React Router DOM
- Tailwind CSS
- Lucide React (icons)
- Custom UI components

## Browser Support

The application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
