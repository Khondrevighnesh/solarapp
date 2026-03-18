import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { plants } from "../../data/plants";
import { router } from "expo-router";

export default function Plants() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Plants</Text>

      {plants.map((plant) => (
        <TouchableOpacity
          key={plant.id}
          style={styles.card}
          onPress={() =>
            router.push(`/dashboard/plant-details?id=${plant.id}`)
          }
        >
          <Text style={styles.title}>{plant.name}</Text>
          <Text>{plant.capacity}</Text>
          <Text>{plant.location}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F1F5F9" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: { fontWeight: "bold", fontSize: 16 },
});