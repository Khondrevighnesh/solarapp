import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from "react-native";

import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import Screen from "../components/Screen";
import { useAuth } from "../../context/AuthContext";

import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

export default function Dashboard() {
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");

  /* 🔥 DEMO USERS */
  const demoUsers: any = {
    solar123: {
      pass: "1234",
      name: "Demo Client",
      plants: [
        { id: 1, name: "Pune Plant", generation: "18 kWh" },
        { id: 2, name: "Mumbai Plant", generation: "25 kWh" },
      ],
    },
    plant456: {
      pass: "4567",
      name: "Single Plant Owner",
      plants: [{ id: 3, name: "Nagpur Plant", generation: "12 kWh" }],
    },
  };

  const { login } = useAuth();

  /* 🔐 LOGIN */
  const handleLogin = async () => {
    const user = demoUsers[clientId];

    if (user && user.pass === password) {
      await login({
        name: user.name,
        email: clientId + "@solar.com",
        plants: user.plants,
      });

      if (user.plants.length === 1) {
        router.replace(
          `/plants/cards?plantId=${user.plants[0].id}&name=${user.plants[0].name}`,
        );
      } else {
        router.replace("/plants");
      }
    } else {
      Alert.alert("Invalid Login");
    }
  };

  /* 🔙 ANDROID BACK FIX */
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Exit App", "Do you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* 🟢 Header */}
          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: Colors.text,
              }}
            >
              Welcome Back 👋
            </Text>

            <Text
              style={{
                color: Colors.subText,
                marginTop: 6,
              }}
            >
              Manage your solar plants easily
            </Text>
          </View>

          {/* 🧾 Login Card */}
          <View
            style={{
              backgroundColor: Colors.card,
              padding: 22,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: Colors.border,

              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 10,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: Theme.font.heading,
                fontWeight: "bold",
                marginBottom: 10,
                color: Colors.text,
              }}
            >
              Client Login
            </Text>

            <Text
              style={{
                color: Colors.subText,
                marginBottom: 16,
              }}
            >
              Enter your credentials
            </Text>

            <TextInput
              placeholder="Client ID"
              placeholderTextColor={Colors.subText}
              style={styles.input}
              value={clientId}
              onChangeText={setClientId}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor={Colors.subText}
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            {/* 🔗 Register Link */}
            <TouchableOpacity
              onPress={() => router.push("/dashboard/register")}
              style={{ marginTop: 18, alignItems: "center" }}
            >
              <Text
                style={{
                  color: Colors.primary,
                  fontWeight: "600",
                }}
              >
                Don't have a plant? Register your plant →
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = {
  input: {
    backgroundColor: Colors.background,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
};
