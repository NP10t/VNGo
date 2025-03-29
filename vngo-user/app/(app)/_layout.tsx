import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ContextProvider } from "@/view-model/context";

export default function TabsLayout() {
  return (
    <ContextProvider>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="(home)"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(activities)"
          options={{
            title: 'Activities',
            tabBarIcon: ({ color }) => (
              <Ionicons name="time" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(voucher)/voucher"
          options={{
            title: 'Vouchers',
            tabBarIcon: ({ color }) => (
              <Ionicons name="gift" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(profile)/profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </ContextProvider>
  );
}