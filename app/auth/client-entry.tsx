import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from "react-native";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

export default function ClientEntry() {
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = () => {
    if (!name || !contact || !email || !otp) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // ⭐ Dummy Role Logic
    if (email.includes("tech")) {
      login("technician");
      router.replace("/(tech-tabs)/tasks");
    } else if (email.includes("paid")) {
      login("client");
      router.replace("/(client-tabs)/home");
    } else {
      login("free");
      router.replace("/(client-tabs)/home");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solar Client Login</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Mobile Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={contact}
        onChangeText={setContact}
      />

      <TextInput
        placeholder="Email Address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Enter OTP"
        style={styles.input}
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F1F5F9"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25
  },
  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15
  }
});