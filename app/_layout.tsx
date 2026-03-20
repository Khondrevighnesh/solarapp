import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootNavigator() {
  const { role } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!role && <Stack.Screen name="auth/client-entry" />}

      {(role === "free" || role === "client") && (
        <Stack.Screen name="(client-tabs)" />
      )}

      {role === "technician" && (
        <Stack.Screen name="(tech-tabs)" />
      )}

      <Stack.Screen name="auth/technician-login" />
      <Stack.Screen name="dashboard/register-plant" />
      <Stack.Screen name="dashboard/plant-details" />
    </Stack>
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}