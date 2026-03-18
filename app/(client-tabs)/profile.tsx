import { View, Text, Button } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { role, logout } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <Text>User Role: {role}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}