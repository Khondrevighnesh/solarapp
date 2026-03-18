import { View, Text, Button } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

export default function ClientLogin() {
  const { login } = useAuth();

  return (
    <View style={{ padding:20 }}>
      <Text>Client Login</Text>

      <Button
        title="Login as FREE Client"
        onPress={() => {
          login("free");
          router.replace("/home");
        }}
      />

      <Button
        title="Login as PAID Client"
        onPress={() => {
          login("client");
          router.replace("/home");
        }}
      />
    </View>
  );
}