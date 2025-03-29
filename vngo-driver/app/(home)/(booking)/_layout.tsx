import { Stack, Tabs } from "expo-router";

export default function BookingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="pickup" options={{ headerShown: false }} />
      <Stack.Screen name="go" options={{ headerShown: false }} />
    </Stack>
  );
}
