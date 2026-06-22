import React from 'react';
import { FieldCapture } from './src/screens/FieldCapture';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <FieldCapture />
    </SafeAreaProvider>
  );
}
