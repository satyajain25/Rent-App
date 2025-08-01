import { Stack } from "expo-router";
import "../global.css";

import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
  return (

    <SafeAreaProvider>
      <Stack initialRouteName="(auth)" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
           <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>

  );
}

