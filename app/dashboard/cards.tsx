import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function Cards() {
  const { plantId }: any = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Plant Dashboard</Text>
      <Text>Plant ID: {plantId}</Text>

      <Button
        title="Analytics"
        onPress={() =>
          router.push(`/dashboard/analytics?plantId=${plantId}`)
        }
      />

      <Button
        title="Maintenance"
        onPress={() =>
          router.push(`/dashboard/maintenance?plantId=${plantId}`)
        }
      />

      <Button
        title="Reports"
        onPress={() =>
          router.push(`/dashboard/reports?plantId=${plantId}`)
        }
      />

      <Button
        title="Plant Details"
        onPress={() =>
          router.push(`/dashboard/plant-details?plantId=${plantId}`)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 }
});