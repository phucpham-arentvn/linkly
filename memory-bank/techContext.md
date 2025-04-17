# Technical Context

## Technology Stack

1. Frontend

   - Next.js 15.2.4 (React 19)
   - TypeScript
   - TailwindCSS with DaisyUI
   - Redux Toolkit with Redux Persist
   - Next Auth for authentication

2. Backend Services

   - Supabase for database and authentication
   - Firebase for real-time features
   - Next.js API routes

3. Development Tools
   - ESLint for code quality
   - Turbopack for fast development
   - TypeScript for type safety

## Dependencies

### Core

- next: ^15.2.4
- react: ^19.0.0
- react-dom: ^19.0.0
- @supabase/supabase-js: ^2.49.4
- firebase: ^11.6.0
- next-auth: ^4.24.11

### State Management

- @reduxjs/toolkit: ^2.6.1
- react-redux: ^9.2.0
- redux-persist: ^6.0.0

### UI Components

- @heroicons/react: 2.1.1
- daisyui: ^5.0.16
- lucide-react: ^0.488.0
- react-hot-toast: ^2.5.2

## Development Setup

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linting
yarn lint
```

## Technical Constraints

1. Performance

   - Client-side bundle size optimization
   - Server-side rendering where appropriate
   - Edge function compatibility

2. Security

   - Authentication flow
   - API rate limiting
   - Data encryption
   - CORS policies

3. Scalability
   - Horizontal scaling capability
   - Caching strategies
   - Database indexing

## Environment Variables

Required environment variables in `.env`:

- Database connection strings
- Authentication secrets
- API keys
- Feature flags
