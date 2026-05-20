# ProductExplorer

## Project Overview
ProductExplorer is a production-style React Native app that showcases scalable architecture, robust state management, and performant product browsing with offline-friendly persistence.

## Features
- Product listing with infinite scrolling and pull-to-refresh
- Debounced search to prevent API spamming
- Redux Toolkit state management with async thunks
- Local persistence via AsyncStorage with state restoration on launch
- App lifecycle handling using AppState
- Error, empty, and loading states with retry UX

## Tech Stack
- React Native CLI (0.74.5)
- TypeScript
- Redux Toolkit + React Redux
- React Navigation (native stack + bottom tabs)
- AsyncStorage

## Setup Instructions
1. Install dependencies:
   - `npm install`
2. Start Metro:
   - `npm start`
3. Run the app:
   - `npm run ios` or `npm run android`

> **Note:** The design uses Hanken Grotesk and Inter. Add custom fonts if you want pixel-perfect typography.

## Architecture Decisions
- **Redux Toolkit** chosen for scalable, testable state management.
- **AsyncStorage** used for persistence to support offline-first UX.
- **React Navigation** combines native-stack for core flow with bottom tabs to match the design.
- **Feature-based folder structure** keeps API, storage, navigation, and UI concerns isolated.

## Performance Optimizations
- FlatList virtualization with tuned render config
- Memoized `ProductCard` and memoized callbacks
- Debounced search to reduce API chatter
- Pagination caching with merge-by-id

## Future Improvements
- Unit tests for thunks, selectors, and components
- Dark mode support
- Offline sync + background revalidation
- Image caching
- RTK Query migration
- Accessibility improvements
