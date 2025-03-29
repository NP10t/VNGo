import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import React from "react";

const HomeLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="(booking)"
        options={{
          tabBarLabel: "Chuyến đi",
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarLabel: "Ví tiền",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Thông tin cá nhân",
        }}
      />
      <Tabs.Screen
        name="route_to_user"
        options={{
          tabBarLabel: "route_to_user",
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
