import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function HomeLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#27272a', 
          borderTopColor: '#27272a',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          margin: 10,
          marginBottom: 20,
          borderRadius: 30
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => null, 
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: () => null, 
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="email"
        options={{
          tabBarLabel: () => null, 
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "mail-outline" : "mail-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "notifications-outline" : "notifications-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: () => null, 
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
