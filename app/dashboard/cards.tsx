import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

export default function Cards() {
  const { plantId, plantName }: any = useLocalSearchParams();

  return (
    <Screen>
      <ScrollView style={{ flex: 1, backgroundColor: Colors.background }}>

        {/* 🔝 HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {plantName || "Solar Plant"} ☀️
          </Text>
          <Text style={styles.headerSubtitle}>
            Live Performance Dashboard
          </Text>
        </View>

        {/* 🗂 DASHBOARD CARDS */}
        <View style={styles.cardsContainer}>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/dashboard/analytics?plantId=${plantId}`)}
          >
            <Text style={styles.cardTitle}>Analytics</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/dashboard/maintenance?plantId=${plantId}`)}
          >
            <Text style={styles.cardTitle}>Maintenance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/dashboard/reports?plantId=${plantId}`)}
          >
            <Text style={styles.cardTitle}>Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/dashboard/plant-details?plantId=${plantId}`)}
          >
            <Text style={styles.cardTitle}>Plant Details</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: Theme.font.hero,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#DCFCE7",
    marginTop: 6,
    fontSize: Theme.font.heading,
  },
  cardsContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 3,
  },
  cardTitle: {
    fontSize: Theme.font.title,
    fontWeight: "bold",
    color: Colors.primary,
  },
});