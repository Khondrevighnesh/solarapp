import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootNavigator() {
  const { role } = useAuth(); // ✅ No need for isLoading or router here

  // 👉 Decide the entry screen *without* calling router.replace
  const getInitialRoute = () => {
    if (!role) return "auth/client-entry"; // no role → auth entry
    if (role === "technician") return "(tech-tabs)"; // technician
    return "(client-tabs)"; // free or client
  };

  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName={getInitialRoute()} // ✅ Navigator handles the jump internally
    >
      {/* ✅ ALWAYS list every screen – no conditionals */}
      <Stack.Screen name="auth/client-entry" />
      <Stack.Screen name="auth/technician-login" />
      <Stack.Screen name="(client-tabs)" />
      <Stack.Screen name="(tech-tabs)" />
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
