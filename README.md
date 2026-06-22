# Field Capture App

## Tech Stack
- Expo SDK 54 (expo ~54.0.34)
- React Native + TypeScript
- @react-native-async-storage/async-storage for local storage
- expo-camera for camera access

## How to run locally
1. Install dependencies:

```
npm install

OR

npx expo install
```

2. Start Expo:

```
npx expo start
```

Open on device or simulator via the Expo dev tools.

## Which Expo SDK version
This project targets Expo SDK 54 (see `package.json`: `expo: "~54.0.34"`).

## Local storage choice
The app uses `@react-native-async-storage/async-storage` because it is:

- Lightweight and simple to integrate with Expo-managed projects.
- Well-supported and widely used for persisting small sets of JSON data (photo metadata).
- Works offline and doesn't require a native DB for this MVP.

For larger data sets or complex queries I would consider SQLite or Realm.

## What I'd build next
- Image optimization (resize/compress before saving) to reduce storage and upload size.
- Better UI for grid layout, selection, and full-screen image preview.
- Offline sync & background upload with conflict resolution when connectivity returns.
- Search, tags, and filtering for photos.
- Add tests and CI to validate storage and camera flows.

## Notes
- Remember to install `react-native-safe-area-context` and wrap the app with `SafeAreaProvider` when running locally:

```
npm install react-native-safe-area-context
```

Then restart the Metro/Expo server.
