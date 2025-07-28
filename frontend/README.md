# MoneyCare Frontend

A modern React frontend for the MoneyCare financial management application, built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- 🔐 **Authentication System** - Secure login with JWT tokens
- 📊 **Dashboard** - Beautiful financial overview with charts and stats
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- 📱 **Responsive Design** - Works on all device sizes
- 🔒 **Protected Routes** - Automatic redirects based on authentication status

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons
- **Context API** for state management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `https://localhost:7001`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── Login.tsx     # Login page component
│   └── Dashboard.tsx # Dashboard component
├── contexts/
│   └── AuthContext.tsx # Authentication context
├── lib/
│   └── utils.ts      # Utility functions
└── App.tsx           # Main app component
```

## Authentication

The app uses JWT tokens for authentication. The authentication flow:

1. User enters credentials on the login page
2. Credentials are sent to the backend API
3. On successful authentication, JWT token is stored in localStorage
4. User is redirected to the dashboard
5. Protected routes check for valid token

## API Integration

The frontend connects to the backend API at `https://localhost:7001`. Make sure your backend server is running and configured to accept requests from the frontend.

### API Endpoints Used

- `POST /api/auth/login` - User authentication

## Styling

The app uses Tailwind CSS with a custom design system based on shadcn/ui. The color scheme and components are consistent throughout the application.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the MoneyCare application.
