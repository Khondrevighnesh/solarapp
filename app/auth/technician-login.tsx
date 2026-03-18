import { View, Text, Button } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

export default function TechnicianLogin() {
  const { login } = useAuth();

  const handleLogin = () => {
    login("technician");

    // ✅ IMPORTANT → open technician tab root
    router.replace("/(tech-tabs)/tasks");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Technician Login</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}