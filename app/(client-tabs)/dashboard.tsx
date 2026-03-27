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

import { useState, useCallback, useEffect } from "react";
import { router, useFocusEffect } from "expo-router";

import Screen from "../components/Screen";
import { useAuth } from "../../context/AuthContext";
import { clients } from "../../data/clients";

import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

export default function Dashboard() {
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");

  const { user, login } = useAuth();

  /* 🚀 REDIRECT FUNCTION */
  const redirectUser = () => {
    if (!user?.plants) return;

    if (user.plants.length === 1) {
      router.replace({
        pathname: "/plants/cards",
        params: { plantId: user.plants[0].id },
      });
    } else {
      router.replace("/plants/plant");
    }
  };

  /* 🔐 LOGIN */
  const handleLogin = async () => {
    const client = clients.find(
      (c) => c.id === clientId && c.password === password,
    );

    if (!client) {
      Alert.alert("Invalid Login");
      return;
    }

    await login({
      name: client.name,
      email: clientId + "@solar.com",
      plants: client.plants,
      role: "client",
    });

    // ✅ redirect immediately after login
    if (client.plants.length === 1) {
      router.replace({
        pathname: "/plants/cards",
        params: { plantId: client.plants[0].id },
      });
    } else {
      router.replace("/plants/plant");
    }
  };

  /* 🔥 CRITICAL FIX: ALWAYS REDIRECT ON TAB FOCUS */
  useFocusEffect(
    useCallback(() => {
      if (user?.role === "client") {
        redirectUser(); // ✅ ALWAYS redirect
      }
    }, [user]),
  );

  /* 🔙 BACK BUTTON */
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Exit App", "Do you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => sub.remove();
    }, []),
  );

  /* ✅ IMPORTANT: SHOW NOTHING FOR CLIENT */
  if (user?.role === "client") {
    return (
      <Screen>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Redirecting...</Text>
        </View>
      </Screen>
    );
  }

  /* 🔓 LOGIN UI (ONLY FOR NOT LOGGED USERS) */
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
        >
          <View style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 28, fontWeight: "bold" }}>
              Welcome Back 👋
            </Text>
            <Text style={{ color: Colors.subText }}>
              Manage your solar plants
            </Text>
          </View>

          <View
            style={{
              backgroundColor: Colors.card,
              padding: 22,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <Text
              style={{
                fontSize: Theme.font.heading,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Client Login
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
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
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
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
};
