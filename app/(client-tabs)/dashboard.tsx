import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";

export default function Dashboard() {
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [plants, setPlants] = useState<any[]>([]);
  const [userName, setUserName] = useState("");

  const demoUsers: any = {
    solar123: {
      pass: "1234",
      name: "Demo Client",
      plants: [
        { id: 1, name: "Pune Plant", generation: "18 kWh" },
        { id: 2, name: "Mumbai Plant", generation: "25 kWh" }
      ]
    },
    plant456: {
      pass: "4567",
      name: "Single Plant Owner",
      plants: [
        { id: 3, name: "Nagpur Plant", generation: "12 kWh" }
      ]
    }
  };

  const handleLogin = () => {
    const user = demoUsers[clientId];

    if (user && user.pass === password) {
      setUserName(user.name);
      setPlants(user.plants);
      setLogged(true);
    } else {
      Alert.alert("Invalid Login");
    }
  };

  // ⭐ SINGLE PLANT → DIRECT NAVIGATE TO CARDS PAGE
  useEffect(() => {
    if (logged && plants.length === 1) {
      router.replace(`/dashboard/cards?plantId=${plants[0].id}`);
    }
  }, [logged]);

  // ⭐ MULTIPLE PLANTS LIST
  if (logged && plants.length > 1) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Welcome {userName}</Text>
        <Text>Select Plant</Text>

        {plants.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={styles.plantCard}
            onPress={() =>
              router.push(`/dashboard/cards?plantId=${p.id}`)
            }
          >
            <Text style={styles.plantTitle}>{p.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  // ⭐ LOGIN SCREEN
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Client Login</Text>

      <TextInput
        placeholder="Client ID"
        style={styles.input}
        value={clientId}
        onChangeText={setClientId}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity
          onPress={() => router.push("/dashboard/register")}
      >
        <Text style={{ color: "blue", marginTop: 15 }}>
         Don't have Client ID? Register Solar Plant
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F1F5F9" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15
  },
  plantCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    marginTop: 10
  },
  plantTitle: { fontSize: 18, fontWeight: "bold" }
});