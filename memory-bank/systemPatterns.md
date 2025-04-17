# System Patterns

## Architecture Overview

```
├── src/
│   ├── app/             # Next.js App Router
│   ├── components/      # React components
│   ├── lib/            # Shared utilities
│   ├── store/          # Redux store
│   └── types/          # TypeScript types
```

## Design Patterns

1. Component Architecture

   - Atomic Design methodology
   - Container/Presenter pattern
   - Custom hooks for logic separation

2. State Management

   - Redux for global state
   - React Context for theme/auth
   - Local state for component-specific data

3. Data Flow

   - Unidirectional data flow
   - Action/reducer pattern
   - Event-driven architecture

4. API Integration
   - Repository pattern
   - Service layer abstraction
   - Error boundary implementation

## Key Implementation Paths

1. Authentication Flow

   ```
   User -> NextAuth -> Supabase Auth -> Protected Routes
   ```

2. Link Shortening

   ```
   Input -> Validation -> Generation -> Storage -> Redirect
   ```

3. Analytics Collection
   ```
   Click -> Edge Function -> Queue -> Processing -> Storage
   ```

## Code Organization

1. Components

   - Atomic structure (atoms, molecules, organisms)
   - Feature-based organization
   - Shared components library

2. State Management

   - Feature-based slices
   - Normalized state shape
   - Memoized selectors

3. API Layer
   - RESTful endpoints
   - Type-safe API routes
   - Error handling middleware

## Testing Strategy

1. Unit Tests

   - Component testing
   - Hook testing
   - Utility function testing

2. Integration Tests

   - API route testing
   - State management testing
   - Authentication flow testing

3. E2E Tests
   - Critical user paths
   - Cross-browser testing
   - Performance testing

## Security Patterns

1. Authentication

   - JWT-based auth
   - Role-based access control
   - Session management

2. Data Protection

   - Input sanitization
   - XSS prevention
   - CSRF protection

3. API Security
   - Rate limiting
   - Request validation
   - Error handling
