import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/colors";

export default function ClientTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#9CA3AF",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="calculators"
        options={{
          title: "Calculators",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="schemes"
        options={{
          title: "Schemes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="document"
        options={{
          title: "Document",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen name="plants/index" options={{ href: null }} />
      <Tabs.Screen name="plants/cards" options={{ href: null }} />
    </Tabs>
  );
}
