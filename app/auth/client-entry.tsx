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
import { GlobalStyles } from "../theme/globalStyles";

export default function ClientEntry() {
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  /* ⭐ SEND OTP */
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

  /* ⭐ LOGIN */
  const handleLogin = () => {
    if (!name || !contact || !email || !otp) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (otp !== generatedOtp) {
      Alert.alert("Invalid OTP");
      return;
    }

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

            {/* ⭐ HERO HEADER */}
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>Welcome 👋</Text>
              <Text style={styles.heroSub}>
                Login to manage your solar journey
              </Text>
            </View>

            {/* ⭐ FORM CARD */}
            <View style={styles.card}>

              <Text style={styles.cardTitle}>Login / Register</Text>

              {/* NAME */}
              <InputField
                label="Full Name"
                value={name}
                onChangeText={setName}
              />

              {/* MOBILE */}
              <InputField
                label="Mobile Number"
                value={contact}
                onChangeText={setContact}
                keyboardType="phone-pad"
              />

              {/* EMAIL + OTP BTN */}
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.row}>
                <TextInput
                  placeholder="Enter email"
                  style={[styles.input, { flex: 1 }]}
                  value={email}
                  onChangeText={setEmail}
                />

                <TouchableOpacity style={styles.otpBtn} onPress={sendOtp}>
                  <Text style={styles.otpText}>
                    {otpSent ? "Resend" : "Send"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* OTP */}
              <InputField
                label="OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
              />

              {/* LOGIN BUTTON */}
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>

            </View>

            {/* ⭐ FOOTER */}
            <Text style={styles.footer}>
              Powered by Sustainfy Energy Pvt Ltd ☀️
            </Text>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

/* ⭐ REUSABLE INPUT */
const InputField = ({ label, ...props }: any) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput {...props} style={styles.input} placeholderTextColor="#94A3B8" />
  </>
);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: Theme.spacing.md,
    justifyContent: "center"
  },

  /* HERO */
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

  /* CARD */
  card: {
    backgroundColor: Colors.card,
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 3
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
  },

  footer: {
    textAlign: "center",
    marginTop: Theme.spacing.lg,
    color: Colors.subText,
    fontSize: 12
  }

});