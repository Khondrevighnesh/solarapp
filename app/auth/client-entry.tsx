import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

export default function ClientEntry() {

  const { login } = useAuth();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  /* 📧 SEND OTP */
  const sendOtp = () => {
    if (!email) {
      Alert.alert("Error", "Enter email first");
      return;
    }

    const dummyOtp = "1234";
    setGeneratedOtp(dummyOtp);
    setOtpSent(true);

    Alert.alert("OTP Sent 📧", `Use OTP: ${dummyOtp}`);
  };

  /* 🔐 LOGIN */
  const handleLogin = async () => {

    if (!name || !contact || !email || !otp) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (otp !== generatedOtp) {
      Alert.alert("Invalid OTP");
      return;
    }

    /* 🎯 ROLE LOGIC */
    const role = email.includes("tech")
      ? "technician"
      : email.includes("paid")
      ? "client"
      : "free";

    /* 💾 SAVE USER */
    await login({
      name,
      email,
      contact,
      role
    });

    /* 🚀 NAVIGATION */
    if (role === "technician") {
      router.replace("/(tech-tabs)/tasks");
    } else {
      router.replace("/(client-tabs)/home");
    }
  };

  return (
    <Screen>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.container}>

            {/* 👋 HEADER */}
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>Welcome 👋</Text>
              <Text style={styles.heroSub}>
                Login to manage your solar journey
              </Text>
            </View>

            {/* 💎 CARD */}
            <View style={styles.card}>

              <Text style={styles.cardTitle}>Login / Register</Text>

              {/* NAME */}
              <Input label="Full Name" value={name} onChangeText={setName} />

              {/* MOBILE */}
              <Input
                label="Mobile Number"
                value={contact}
                onChangeText={setContact}
                keyboardType="phone-pad"
              />

              {/* EMAIL */}
              <Text style={styles.label}>Email</Text>
              <View style={styles.row}>
                <TextInput
                  placeholder="Enter email"
                  value={email}
                  onChangeText={setEmail}
                  style={[styles.input, { flex: 1 }]}
                  placeholderTextColor="#94A3B8"
                />

                <TouchableOpacity style={styles.otpBtn} onPress={sendOtp}>
                  <Text style={styles.otpText}>
                    {otpSent ? "Resend" : "Send"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* OTP */}
              <Input
                label="OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
              />

              {/* BUTTON */}
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>

            </View>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

    </Screen>
  );
}

/* 🔹 INPUT */
const Input = ({ label, ...props }: any) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor="#94A3B8"
    />
  </>
);

/* 🎨 STYLES */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: Theme.spacing.md,
    justifyContent: "center"
  },

  hero: {
    marginBottom: Theme.spacing.lg
  },

  heroTitle: {
    fontSize: Theme.font.hero,
    fontWeight: "bold",
    color: Colors.text
  },

  heroSub: {
    color: Colors.subText,
    marginTop: 5
  },

  card: {
    backgroundColor: Colors.card,
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    borderWidth: 1,
    borderColor: Colors.border
  },

  cardTitle: {
    fontSize: Theme.font.heading,
    fontWeight: "bold",
    marginBottom: Theme.spacing.md,
    color: Colors.text
  },

  label: {
    fontSize: Theme.font.small,
    color: Colors.subText,
    marginTop: 12
  },

  input: {
    backgroundColor: "#F8FAFC",
    padding: 14,
    borderRadius: Theme.radius.md,
    marginTop: 6,
    borderWidth: 1,
    borderColor: Colors.border
  },

  row: {
    flexDirection: "row",
    alignItems: "center"
  },

  otpBtn: {
    marginLeft: 8,
    backgroundColor: Colors.blue,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: Theme.radius.md
  },

  otpText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: Theme.radius.md,
    alignItems: "center",
    marginTop: Theme.spacing.lg
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: Theme.font.body
  }

});