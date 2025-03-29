import { AuthProvider, useAuth } from "@/view-model/AuthContext";
import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  const { authState } = useAuth();

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
