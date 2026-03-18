import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function PlantDetails() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Plant Details</Text>
      <Button title="Analytics" onPress={() => router.push("/dashboard/analytics")} />
      <Button title="Maintenance" onPress={() => router.push("/dashboard/maintenance")} />
      <Button title="Reports" onPress={() => router.push("/dashboard/reports")} />
    </View>
  );
}