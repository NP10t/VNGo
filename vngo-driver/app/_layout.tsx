import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  const { authState } = useAuth();

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
